import { useState } from "react";
import { StyledSearchUsersToInvite } from "./SearchUsersToInvite.styled";
import { useSearchUsersToInvite } from "../../api/services/useSearchUsersToInvite";
import useSentinel from "../../hooks/useSentinel";
import Input from "../../components/Input/Input";
import useDebounce from "../../hooks/useDebounce";
import { useSendInvitation } from "../../api/services/useSendInvitation";
import MyButton from "../../components/MyButton/MyButton";
import { useRevokeInvitation } from "../../api/services/useRevokeInvitation";

const SearchUsersToInvite: React.FC = () => {

  const groupId = "79e52188-1783-4c95-a5c4-0daa3316061f"
  // const groupId = "c1cd2e95-0d1e-4cc7-ba23-9340a5e8e9ea"
  const pageSize = 3

  const [keyword, setKeyword] = useState("")
  const [debouncedKeyword, _isDebouncing] = useDebounce<string>(keyword.length > 1 ? keyword : "", 500);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, updateUserInvitationStatus } = useSearchUsersToInvite(groupId, debouncedKeyword, pageSize)
  const sentinelRef = useSentinel(fetchNextPage, hasNextPage, isFetchingNextPage)

  return (
    <StyledSearchUsersToInvite>
      <Input
        className="search-input"
        placeholder="Search"
        onChange={e => setKeyword(e.target.value)}
      />
      {data?.pages.flatMap((x) =>
        x.users.map((user) => (
          <SearchResultItem
            key={user.userId}
            userId={user.userId}
            username={user.username}
            isAlreadyInvited={user.isAlreadyInvited}
            isGroupMember={user.isGroupMember}
            groupId={groupId}
            onInviteSuccess={() => updateUserInvitationStatus(user.userId, !user.isAlreadyInvited)}
          />
        ))
      )}
      <div ref={sentinelRef} className="sentinel" style={{ height: "1px" }}></div>
      {isFetchingNextPage && <div>Loading more...</div>}
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
  onInviteSuccess: () => void
}> = ({ userId, username, isAlreadyInvited, isGroupMember, groupId, onInviteSuccess }) => {

  const { mutate, isPending, isError } = isAlreadyInvited ? useRevokeInvitation() : useSendInvitation();

  if (isGroupMember) {
    return (
      <div className="search-result">
        <div className="top-row">
          <div>{username}</div>
        </div>
        <div className="bottom-row">already a group member</div>
      </div>
    );
  }

  const onClick = () => mutate({ groupId, guestId: null, receiverId: userId, onSuccess: onInviteSuccess });

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
          {isAlreadyInvited ? "Invited" : "Invite"}
        </MyButton>
      </div>
    </div>
  );
};