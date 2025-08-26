import { useState } from "react";
import { StyledSearchUsersToInvite } from "./SearchUsersToInvite.styled";
import { useSearchUsersToInvite } from "../../api/services/useSearchUsersToInvite";
import Input from "../../components/Input/Input";
import useDebounce from "../../hooks/useDebounce";
import MyButton from "../../components/MyButton/MyButton";
import { useParams } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { SearchUsersToInviteProps } from "../../interfaces";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { useSignal } from "@preact/signals-react";
import { useCreateGuest } from "../../api/services/useCreateGuest";
import { useQueryClient } from "@tanstack/react-query";
import useGroup from "../../api/services/useGroup";
import MemberItem from "../../components/Menus/RemoveUserFromGroupMenu/MemberItem/MemberItem";
import RemoveGuestWarningAnimation from "../../components/Menus/MenuAnimations/RemoveGuestWarningAnimation";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import Sentinel from "../../components/Sentinel";
import { SearchResultItem } from "./SearchResultItem/SearchResultItem";

const SearchUsersToInvite = ({
  menu,
  guestToBeReplaced,
}: SearchUsersToInviteProps) => {
  const params = useParams();
  const groupId = params.groupid!;
  const pageSize = 10;
  const queryClient = useQueryClient();
  const [keyword, setKeyword] = useState("");
  const category = useSignal<string>("Invite User");
  const cannotBeRemovedClickedWarning = useSignal<string>("");
  const [guestName, setGuestName] = useState<string>("");
  const userInvitationSent = useSignal<boolean>(false);
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
  } = useSearchUsersToInvite(groupId, debouncedKeyword, pageSize, guestToBeReplaced?.guestId);
console.log(data)
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
          {guestToBeReplaced?.guestId && guestToBeReplaced?.guestId != "" ? (
            ""
          ) : (
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
          )}
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
                guestId={guestToBeReplaced?.guestId}
                guestName={guestToBeReplaced?.guestName}
                onInviteSuccess={() => {
                  updateUserInvitationStatus(
                    user.userId,
                    !user.isAlreadyInvited
                  );
                }}
                userInvitationSent={userInvitationSent}
              />
            ))
          )}
          <Sentinel
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
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
