import React, { useEffect, useRef } from "react";
import { StyledUserInvitations } from "./UserInvitations.styled";
import { useGetUserInvitations } from "../../api/services/useGetUserInvitations";
import Invitation from "../../components/Invitation";
import Button from "../../components/Button";
import { useSendInvitation } from "../../api/services/useSendInvitation";

const UserInvitations: React.FC<UserInvitationsProps> = ({ timeZoneId }) => {

  const pageSize = 10

  const { mutate: sendInvitation } = useSendInvitation()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetUserInvitations(pageSize)

  const userInvitations = data?.pages.flatMap(p => p.invitations)
  console.log(userInvitations)

  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!sentinelRef.current || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        fetchNextPage();
      }
    });

    observer.observe(sentinelRef.current);

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (!userInvitations) {
    return <div>No ivitations !!!</div>
  }

  return (
    <StyledUserInvitations>
      <Button onClick={() => sendInvitation({
        receiverId: "1724632e-c1e2-4032-923b-0e91ba6df417",
        groupId: "79e52188-1783-4c95-a5c4-0daa3316061f",
        guestId: "2b83cc85-9998-4354-a7f5-92a3f79e18bd"
      })}>
        Send test invitation
      </Button>
      <div className="invitations">
        {userInvitations.map(x => (
          <Invitation
            key={x.id}
            invitation={{
              id: x.id,
              created: x.created,
              updated: x.updated,
              groupId: x.groupId,
              guestId: x.guestId,
              receiverId: x.receiverId,
              senderId: x.senderId
            }}
            timeZoneId={timeZoneId}
          />
        ))}
      </div>
      <div ref={sentinelRef} className="sentinel" style={{ height: "1px" }}></div>
      {isFetchingNextPage && <div>Loading more...</div>}
    </StyledUserInvitations>
  );
};

export default UserInvitations;

interface UserInvitationsProps {
  timeZoneId: string;
}
