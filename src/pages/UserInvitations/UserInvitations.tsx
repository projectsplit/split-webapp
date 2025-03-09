import React from "react";
import { StyledUserInvitations } from "./UserInvitations.styled";
import { useGetUserInvitations } from "../../api/services/useGetUserInvitations";
import Invitation from "../../components/Invitation";
import Sentinel from "../../components/Sentinel";
import { TbMoodSadSquint } from "react-icons/tb";
import Spinner from "../../components/Spinner/Spinner";

const UserInvitations: React.FC<UserInvitationsProps> = ({ timeZoneId }) => {

  const pageSize = 10

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage,isFetching } = useGetUserInvitations(pageSize)

  const userInvitations = data?.pages.flatMap(p => p.invitations)

  if (!userInvitations ||isFetching) {
    return <Spinner/>
  }

  if (userInvitations?.length === 0) {
    return (
      <StyledUserInvitations>
        <div className="noData">
          <div className="msg">There are currently no invitations</div>
          <TbMoodSadSquint className="icon" />
        </div>
      </StyledUserInvitations>
    )
  }

  return (
    <StyledUserInvitations>
      <div className="invitations">
        {userInvitations.map(x => (
          <Invitation
            key={x.id}
            invitation={{
              id: x.id,
              created: x.created,
              groupId: x.groupId,
              guestId: x.guestId,
              groupName: x.groupName,
              receiverId: x.receiverId,
              senderId: x.senderId
            }}
            timeZoneId={timeZoneId}
          />
        ))}
      </div>
      <Sentinel fetchNextPage={fetchNextPage} hasNextPage={hasNextPage} isFetchingNextPage={isFetchingNextPage} />
    </StyledUserInvitations>
  );
};

export default UserInvitations;

interface UserInvitationsProps {
  timeZoneId: string;
}
