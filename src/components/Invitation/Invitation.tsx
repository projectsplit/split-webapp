import React from "react";
import { StyledInvitation } from "./StyledInvitation";
import { useAcceptInvitation } from "../../api/services/useAcceptInvitation";
import { useDeclineInvitation } from "../../api/services/useDeclineInvitation";
import MyButton from "../MyButton/MyButton";

const Invitation: React.FC<InvitationProps> = ({ invitation }) => {

  const accept = useAcceptInvitation();
  const decline = useDeclineInvitation();

  return (
    <StyledInvitation>
      <div className="message">
        <span>You have been invited to join </span>
        <span className="highlighted">{invitation.groupName}</span>
        {!!invitation.guestId && <span> to replace</span>}
        {!!invitation.guestId && <span className="highlighted"> {invitation.guestId}</span>}
      </div>
      <div className="actions">
        <MyButton onClick={() => decline.mutate(invitation.id)} isLoading={decline.isPending} hasFailed={decline.isError}>Decline</MyButton>
        <MyButton onClick={() => accept.mutate(invitation.id)} isLoading={accept.isPending} hasFailed={accept.isError} variant="secondary">Accept</MyButton>
      </div>
    </StyledInvitation>
  );
};

export default Invitation;

type InvitationProps = {
  invitation: {
    id: string;
    created: string;
    senderId: string;
    receiverId: string;
    groupId: string;
    groupName: string;
    guestId: string | null;
  };
  timeZoneId: string;
};