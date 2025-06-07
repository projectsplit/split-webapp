import { useState } from "react";
import { StyledSearchUsersToInvite } from "./SearchUsersToInvite.styled";
import { useSearchUsersToInvite } from "../../api/services/useSearchUsersToInvite";
import useSentinel from "../../hooks/useSentinel";
import Input from "../../components/Input/Input";
import useDebounce from "../../hooks/useDebounce";
import { useSendInvitation } from "../../api/services/useSendInvitation";
import MyButton from "../../components/MyButton/MyButton";
import { useRevokeInvitation } from "../../api/services/useRevokeInvitation";
import { useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { SearchUsersToInviteProps } from "../../interfaces";
import Spinner from "../../components/Spinner/Spinner";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { useSignal } from "@preact/signals-react";
import { useCreateGuest } from "../../api/services/useCreateGuest";
import { useQueryClient } from "@tanstack/react-query";
import useGroup from "../../api/services/useGroup";
import MemberItem from "../../components/Menus/RemoveUserFromGroupMenu/MemberItem/MemberItem";
import RemoveGuestWarningAnimation from "../../components/Menus/MenuAnimations/RemoveGuestWarningAnimation";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";

const SearchUsersToInvite = ({ menu }: SearchUsersToInviteProps) => {
  const params = useParams();
  const groupId = params.groupid!;
  const pageSize = 10;
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState("");
  const category = useSignal<string>("Invite User");
  const cannotBeRemovedClickedWarning = useSignal<string>("");
  const [guestName, setGuestName] = useState<string>("");
 
  const noGroupError = useSignal<string>("");
  const noMemberError = useSignal<string>("");
  const [debouncedKeyword, _isDebouncing] = useDebounce<string>(
    keyword.length > 1 ? keyword : "",
    500
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    updateUserInvitationStatus,
  } = useSearchUsersToInvite(groupId, debouncedKeyword, pageSize);

  const sentinelRef = useSentinel(
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  );
  const {
    mutate: createGuestExpenseMutation,
    isPending: isPendingCreateGuest,
  } = useCreateGuest(groupId, noGroupError, guestName, setGuestName);

  const { data: group } = useGroup(groupId);
  const groupGuests = group?.guests ?? [];

  const handleCannotRemoveClick = () => {
    cannotBeRemovedClickedWarning.value = "cannotRemoveGuest";
  };
  return (
    <StyledSearchUsersToInvite>
      <div className="fixed-header-container">
        <div className="header">
          <div className="gap"></div>
          <div className="title">
            <CategorySelector
              activeCat={"Invite User"}
              categories={{
                cat1: "Invite User",
                cat2: "Create Guest",
              }}
              navLinkUse={false}
              activeCatAsState={category}
            />
          </div>
          <div
            className="closeButtonContainer"
            onClick={async () => {
              try {
                await queryClient.invalidateQueries({
                  queryKey: [groupId],
                  exact: false,
                });
                menu.value = null;
              } catch (error) {
                console.error("Failed to invalidate queries:", error);
              }
            }}
          >
            <IoClose className="closeButton" />
          </div>
        </div>
      </div>
      {category.value === "Invite User" ? (
        <div className="scrollable-content">
          <div className="input">
            <Input
              className="search-input"
              placeholder="Search"
              backgroundcolor="#2d2d2d"
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          {data?.pages.flatMap((x) =>
            x.users.map((user) => (
              <SearchResultItem
                key={user.userId}
                userId={user.userId}
                username={user.username}
                isAlreadyInvited={user.isAlreadyInvited}
                isGroupMember={user.isGroupMember}
                groupId={groupId}
                onInviteSuccess={() =>
                  updateUserInvitationStatus(
                    user.userId,
                    !user.isAlreadyInvited
                  )
                }
              />
            ))
          )}
          <div
            ref={sentinelRef}
            className="sentinel"
            style={{ height: "1px" }}
          ></div>
          {isFetchingNextPage && <Spinner />}
        </div>
      ) : (
        <div className="scrollable-content">
          <div className="input">
            <Input
              className="search-input"
              placeholder="guest's name"
              backgroundcolor="#2d2d2d"
              onChange={(e) => setGuestName(e.target.value)}
              value={guestName}
            />
            <div className="createButton">
              <MyButton
                isLoading={isPendingCreateGuest}
                disabled={!guestName}
                onClick={() => createGuestExpenseMutation()}
              >
                Create
              </MyButton>
            </div>
          </div>
          <div className="members">
            {groupGuests.map((member) => (
              <MemberItem
                key={member.id}
                groupId={group?.id}
                member={member}
                noGroupError={noGroupError}
                noMemberError={noMemberError}
                isGuest={true}
                canBeRemoved={
                  "canBeRemoved" in member ? member.canBeRemoved : true
                }
                onCannotRemoveClick={handleCannotRemoveClick}
              />
            ))}
          </div>
        </div>
      )}
      <MenuAnimationBackground menu={cannotBeRemovedClickedWarning} />
      <RemoveGuestWarningAnimation menu={cannotBeRemovedClickedWarning} />
    </StyledSearchUsersToInvite>
  );
};

export default SearchUsersToInvite;

const SearchResultItem: React.FC<{
  userId: string;
  username: string;
  isAlreadyInvited: boolean;
  isGroupMember: boolean;
  groupId: string;
  onInviteSuccess: () => void;
}> = ({
  userId,
  username,
  isAlreadyInvited,
  isGroupMember,
  groupId,
  onInviteSuccess,
}) => {
  const { mutate, isPending, isError } = isAlreadyInvited
    ? useRevokeInvitation()
    : useSendInvitation();

  if (isGroupMember) {
    return (
      <div className="search-result">
        <div className="top-row">
          <div>{username}</div>
        </div>
        <div className="bottom-row">already a member</div>
      </div>
    );
  }

  const onClick = () =>
    mutate({
      groupId,
      guestId: null,
      receiverId: userId,
      onSuccess: onInviteSuccess,
    });

  return (
    <div className="search-result">
      <div className="top-row">
        <div>{username}</div>
        <MyButton
          isLoading={isPending}
          variant={isAlreadyInvited ? "secondary" : "primary"}
          onClick={isPending ? undefined : onClick}
          hasFailed={isError}
        >
          {isAlreadyInvited ? "Uninvite" : "Invite"}
        </MyButton>
      </div>
    </div>
  );
};
