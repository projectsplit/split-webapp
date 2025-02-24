import React from "react";
import { StyledInvitation } from "./StyledInvitation";
import Button from "../Button";
import { useAcceptInvitation } from "../../api/services/useAcceptInvitation";
import { useDeclineInvitation } from "../../api/services/useDeclineInvitation";

const Invitation: React.FC<InvitationProps> = ({ invitation }) => {

  const { mutate: acceptInvitation } = useAcceptInvitation();
  const { mutate: declineInvitation } = useDeclineInvitation();

  return (
    <StyledInvitation>
      <div className="message">
        <span>You have been invited to join </span>
        <span className="highlighted">{invitation.groupId}</span>
        {!!invitation.guestId && <span> to replace</span>}
        {!!invitation.guestId && <span className="highlighted"> {invitation.guestId}</span>}
      </div>
      <div className="actions">
        <Button onClick={() => declineInvitation(invitation.id)} className="decline">Decline</Button>
        <Button onClick={() => acceptInvitation(invitation.id)} className="accept">Accept</Button>
      </div>
    </StyledInvitation>
  );
};

export default Invitation;

type InvitationProps = {
  invitation: InvitationItem;
  timeZoneId: string;
};

type InvitationItem = {
  id: string;
  created: string;
  updated: string;
  senderId: string;
  receiverId: string;
  groupId: string;
  guestId: string;
};