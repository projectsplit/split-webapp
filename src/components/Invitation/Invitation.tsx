import React from 'react';
import { TiGroup } from 'react-icons/ti';
import { StyledNotificationCard } from '../NotificationCard/NotificationCard.styled';
import { useAcceptInvitation } from '../../api/auth/CommandHooks/useAcceptInvitation';
import { useDeclineInvitation } from '../../api/auth/CommandHooks/useDeclineInvitation';
import MyButton from '../MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
import { Signal } from '@preact/signals-react';

const Invitation: React.FC<InvitationProps> = ({
  invitation,
  menu,
  timeZoneId,
}) => {
  const navigate = useNavigate();
  const accept = useAcceptInvitation(navigate, invitation, menu);
  const decline = useDeclineInvitation();

  return (
    <StyledNotificationCard>
      <div className="mainMsg">
        <span className="avatar">
          <TiGroup />
        </span>
        <div className="msgText">
        <div className="message">
          You have been invited to join <strong>{invitation.groupName}</strong>{' '}
          {!!invitation.guestId && (
            <span> to replace "{invitation.guestName}"</span>
          )}
        </div>
          <div className="itemDate">
            {new Date(invitation.created)
              .toLocaleString('en-GB', {
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
                hour12: false,
                timeZone: timeZoneId,
              })
              .replace(/,\s*/, ', ')}
          </div>
        </div>
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
    </StyledNotificationCard>
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
  menu: Signal<string | null>;
  timeZoneId: string | undefined;
};
