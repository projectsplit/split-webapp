import { StyledRemoveUserFromGroup } from "./RemoveUserFromGroup.styled";
import { RemoveUserFromGroupMenuProps } from "../../../interfaces";
import Separator from "../../Separator/Separator";
import Input from "../../Input/Input";
import { FaAngleLeft } from "react-icons/fa";
import { useSignal } from "@preact/signals-react";
import MemberItem from "./MemberItem/MemberItem";
import MenuAnimationBackground from "../MenuAnimations/MenuAnimationBackground";
import RemoveGuestWarningAnimation from "../MenuAnimations/RemoveGuestWarningAnimation";
import useGroup from "../../../api/services/useGroup";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { GroupMember } from "../../../types";

export default function RemoveUserFromGroupMenu({
  openRemoveUserMenu,
  groupId,
  userInfo,
}: RemoveUserFromGroupMenuProps) {
  const queryClient = useQueryClient();

  const noGroupError = useSignal<string>("");
  const noMemberError = useSignal<string>("");
  const cannotBeRemovedClickedWarning = useSignal<string>("");
  const [searchItem, setSearchItem] = useState<string>("");

  const { data: group } = useGroup(groupId);
  
  const groupUsers = group?.members.filter((m) => m.userId !== userInfo.userId)?? [];
  const groupGuests = group?.guests?? [];
  const combinedMembers: GroupMember[] = [...groupUsers, ...groupGuests];

  const filteredMembers = combinedMembers.filter((member) =>
    member.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
  };

  const handleCannotRemoveClick = () => {
    cannotBeRemovedClickedWarning.value = "cannotRemoveGuest";
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

 return (
    <StyledRemoveUserFromGroup>
      <div className="fixed-header-container">
        <div className="header">
          <div className="closeButtonContainer" onClick={handleCloseButton}>
            <FaAngleLeft className="closeButton" />
          </div>
          <div className="title">members</div>
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
              isGuest={"canBeRemoved" in member}// effectively checks if it is a guest
              canBeRemoved={"canBeRemoved" in member ? member.canBeRemoved : true}
              onCannotRemoveClick={handleCannotRemoveClick}
            />
          ))}
        </div>
      </div>
      <MenuAnimationBackground menu={cannotBeRemovedClickedWarning} />
      <RemoveGuestWarningAnimation menu={cannotBeRemovedClickedWarning} />
    </StyledRemoveUserFromGroup>
  );
}
