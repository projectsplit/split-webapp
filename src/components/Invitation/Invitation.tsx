import React from "react";
import { StyledInvitation } from "./Invitation.styled";
import { useAcceptInvitation } from "../../api/auth/CommandHooks/useAcceptInvitation";
import { useDeclineInvitation } from "../../api/auth/CommandHooks/useDeclineInvitation";
import MyButton from "../MyButton/MyButton";
import { useNavigate } from "react-router-dom";
import { Signal } from "@preact/signals-react";

const Invitation: React.FC<InvitationProps> = ({ invitation, menu }) => {
  const navigate = useNavigate();
  const accept = useAcceptInvitation(navigate, invitation, menu);
  const decline = useDeclineInvitation();

  return (
    <StyledInvitation>
      {/* <div className="message">
        <span>You have been invited to join </span>
        <span className="highlighted">{invitation.groupName}</span>
        {!!invitation.guestId && <span> to replace</span>}
        {!!invitation.guestId && <span className="highlighted"> {invitation.guestId}</span>}
      </div>
      <div className="actions">
      <MyButton onClick={() => accept.mutate(invitation.id)} isLoading={accept.isPending} hasFailed={accept.isError} >Accept</MyButton>
      <MyButton onClick={() => decline.mutate(invitation.id)} isLoading={decline.isPending} hasFailed={decline.isError} variant="secondary">Decline</MyButton>
      </div> */}
      <div className="mainMsg">
        <div className="message">
          You have been invited to join <strong>{invitation.groupName}</strong>{" "}
          {!!invitation.guestId && (
            <span> to replace "{invitation.guestName}"</span>
          )}
        </div>
        &nbsp;
        {/* {!!invitation.guestId && (
          <span className="highlighted"> {invitation.guestId}</span>
        )} */}
      </div>
      <div className="actions">
        <MyButton
          onClick={() => {
            accept.mutate(invitation.id);
          }}
          isLoading={accept.isPending}
          hasFailed={accept.isError}
        >
          Accept
        </MyButton>
        <MyButton
          onClick={() => decline.mutate(invitation.id)}
          isLoading={decline.isPending}
          hasFailed={decline.isError}
          variant="secondary"
        >
          Decline
        </MyButton>
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
    guestName: string | null;
  };
  menu: Signal<string | null>
  timeZoneId: string | undefined;
};
