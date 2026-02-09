import { StyledRemoveUserFromGroup } from "./RemoveUserFromGroup.styled";
import { RemoveUserFromGroupMenuProps } from "../../../interfaces";
import Separator from "../../Separator/Separator";
import Input from "../../Input/Input";
import { FaAngleLeft } from "react-icons/fa";
import { useSignal } from "@preact/signals-react";
import MemberItem from "./MemberItem/MemberItem";
import MenuAnimationBackground from "../../Animations/MenuAnimationBackground";
import useGroup from "../../../api/auth/QueryHooks/useGroup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GroupMember } from "../../../types";
import RemoveWarningAnimation from "../../Animations/RemoveWarningAnimation";
import { useRemoveMemberFromGroup } from "../../../api/auth/CommandHooks/useRemoveMemberFromGroup";

export default function RemoveUserFromGroupMenu({
  openRemoveUserMenu,
  groupId,
  userInfo,
}: RemoveUserFromGroupMenuProps) {
  const queryClient = useQueryClient();

  const noGroupError = useSignal<string>("");
  const noMemberError = useSignal<string>("");
  const cannotBeRemovedClickedWarning = useSignal<string | null>(null);
  const cannotRemoveMemberWarning = useSignal<string | null>(null);
  const [searchItem, setSearchItem] = useState<string>("");
  const [memberClicked, setMemberClicked] = useState<{ name: string; id: string }>({ name: "", id: "" })
  const { data: group } = useGroup(groupId);

  const groupUsers =
    group?.members.filter((m) => m.userId !== userInfo?.userId) ?? [];
  const groupGuests = group?.guests ?? [];
  const combinedMembers: GroupMember[] = [...groupUsers, ...groupGuests];

  const filteredMembers = combinedMembers.filter((member) =>
    member.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  const handleCannotRemoveGuest = () => {
    cannotBeRemovedClickedWarning.value = "cannotRemoveGuest";
  };

  const handleCannotRemoveMember = (member: GroupMember) => {
    setMemberClicked({ name: member.name, id: member.id })
    cannotRemoveMemberWarning.value = "userWarning";


  };

  const refetchGroupData = async () => {
    try {
      await queryClient.invalidateQueries({
        queryKey: [groupId],
        exact: false,
      });
    } catch (error) {
      console.error("Error refetching queries:", error);
    }
  };

  const handleCloseButton = async () => {
    openRemoveUserMenu.value = false;
    await refetchGroupData();
  };

  useEffect(() => {
    return () => {
      if (openRemoveUserMenu.value) {
        refetchGroupData();
      }
    };
  }, [openRemoveUserMenu, groupId, queryClient]);

  const { mutate: removeUser, isPending: isPendingMember } =
    useRemoveMemberFromGroup(groupId, noGroupError, noMemberError, cannotRemoveMemberWarning);

  return (
    <StyledRemoveUserFromGroup>
      <div className="fixed-header-container">
        <div className="header">
          <div className="closeButtonContainer" onClick={handleCloseButton}>
            <FaAngleLeft className="closeButton" />
          </div>
          <div className="title">Select members to remove</div>
          <div className="gap"></div>
        </div>
        <Separator />
      </div>
      <div className="scrollable-content">
        <div className="input">
          <Input
            className="search-input"
            placeholder="Search"
            backgroundcolor="#2d2d2d"
            onChange={handleInputChange}
          />
        </div>
        <div className="members">
          {filteredMembers.map((member) => (
            <MemberItem
              key={member.id}
              groupId={group?.id}
              member={member}
              noGroupError={noGroupError}
              noMemberError={noMemberError}
              isGuest={"canBeRemoved" in member} // effectively checks if it is a guest
              canBeRemoved={
                "canBeRemoved" in member ? member.canBeRemoved : false
              }
              onCannotRemoveClick={
                "canBeRemoved" in member
                  ? handleCannotRemoveGuest
                  : () => handleCannotRemoveMember(member)
              }
            />
          ))}
        </div>
      </div>
      <MenuAnimationBackground menu={cannotBeRemovedClickedWarning} />
      <MenuAnimationBackground menu={cannotRemoveMemberWarning} />

      <RemoveWarningAnimation
        menu={cannotBeRemovedClickedWarning}
        message={
          "This guest cannot be removed because they are involved in expenses or transfers. Removing them will disrupt the group's financial history."
        }
        menuValue="cannotRemoveGuest"
        header='Info'
      />
      <RemoveWarningAnimation
        menu={cannotRemoveMemberWarning}
        message={
          `Are you sure you want to remove ${memberClicked.name}? ${memberClicked.name} will be replaced by guest`
        }
        menuValue="userWarning"
        header='Warning!'
        onConfirm={() => removeUser(memberClicked.id)}
        isLoading={isPendingMember}
      />
    </StyledRemoveUserFromGroup>
  );
}
