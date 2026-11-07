import React from 'react';
import { TiGroup } from 'react-icons/ti';
import { DateTime } from 'luxon';
import { StyledNotificationCard } from '../NotificationCard/NotificationCard.styled';
import { useAcceptInvitation } from '../../api/auth/CommandHooks/useAcceptInvitation';
import { useDeclineInvitation } from '../../api/auth/CommandHooks/useDeclineInvitation';
import MyButton from '../MyButton/MyButton';
import { useNavigate } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
import { Invitation as InvitationItem } from '../../types';
import { joinAmounts } from '../../helpers/joinAmounts';

const Invitation: React.FC<InvitationProps> = ({
  invitation,
  menu,
  timeZoneId,
}) => {
  const navigate = useNavigate();
  const accept = useAcceptInvitation(navigate, invitation, menu);
  const decline = useDeclineInvitation();

  const guestName = invitation.guestName ?? 'a guest';
  const balance = Object.entries(invitation.guestBalance ?? {});
  const owes = balance.filter(([, amount]) => amount > 0);
  const isOwed = balance.filter(([, amount]) => amount < 0);

  return (
    <StyledNotificationCard>
      <div className="mainMsg">
        <span className="avatar">
          <TiGroup />
        </span>
        <div className="msgText">
          <div className="message">
            {invitation.isMerge ? (
              <>
                You have been invited to take over the guest{' '}
                <strong>{guestName}</strong> in{' '}
                <strong>{invitation.groupName}</strong>
              </>
            ) : (
              <>
                You have been invited to join{' '}
                <strong>{invitation.groupName}</strong>
                {!!invitation.guestId && <span> to replace "{guestName}"</span>}
              </>
            )}
          </div>
          {/* A guest's slot comes with their balance, and a merge can't be undone, so the
              person sees both before they tap. */}
          {!!invitation.guestId && (
            <div className="detail">
              <div>
                {guestName}{' '}
                {balance.length === 0 ? (
                  'is settled up'
                ) : (
                  <>
                    {owes.length > 0 && <>owes {joinAmounts(owes)}</>}
                    {owes.length > 0 && isOwed.length > 0 && ' and '}
                    {isOwed.length > 0 && <>is owed {joinAmounts(isOwed)}</>}
                  </>
                )}
                .
              </div>
              <div className="consequence">
                {invitation.isMerge
                  ? `You are already in this group. Accepting merges ${guestName} into you: their expenses and balance become yours. This cannot be undone.`
                  : `Accepting makes ${guestName}'s expenses and balance yours.`}
              </div>
            </div>
          )}
          <div className="itemDate">
            {DateTime.fromISO(invitation.created, {
              zone: timeZoneId,
            }).toFormat('d LLL, HH:mm')}
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
  invitation: InvitationItem;
  menu: Signal<string | null>;
  timeZoneId: string | undefined;
};
