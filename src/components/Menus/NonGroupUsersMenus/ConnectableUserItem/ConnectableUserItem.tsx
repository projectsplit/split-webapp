import React from 'react';
import { StyledConnectableUserItem } from './ConnectableUserItem.styled';
import { ConnectionStatus } from '../../../../types';
import MyButton from '../../../MyButton/MyButton';

type ConnectableUserItemProps = {
  name: string;
  status: ConnectionStatus | undefined;
  isAcceptPending: boolean;
  isRevokePending: boolean;
  onSelect: (e: React.MouseEvent) => void;
  onRequest: (e: React.MouseEvent) => void;
  onAccept: (e: React.MouseEvent) => void;
  onRevoke: (e: React.MouseEvent) => void;
};

/**
 * A user row in the non-group pickers. Users you have never split with cannot be picked directly:
 * their row offers a connection request instead, and only turns into a normal selectable row once
 * the other side accepts. A request you sent stays revocable from the same row — the picker is
 * where you notice you asked the wrong person, so it is where taking it back has to live.
 *
 * An unknown status means the statuses have not arrived yet or the call for them failed. The row
 * stays selectable in that case rather than going inert: the server rejects a split with someone
 * you are not connected with anyway, so guessing wrong here costs an error message, while a dead
 * row would leave the picker unusable with nothing on screen explaining why.
 */
export default React.memo(function ConnectableUserItem({
  name,
  status,
  isAcceptPending,
  isRevokePending,
  onSelect,
  onRequest,
  onAccept,
  onRevoke,
}: ConnectableUserItemProps) {
  const handleRowClick = (e: React.MouseEvent) => {
    if (status === undefined || status === 'connected') onSelect(e);
    else if (status === 'none') onRequest(e);
    else if (status === 'pending_received') onAccept(e);
    else if (status === 'pending_sent') onRevoke(e);
  };

  return (
    <StyledConnectableUserItem>
      <div className="top-row" onClick={handleRowClick}>
        <div className="name">{name}</div>
        {status === 'none' && <MyButton onClick={onRequest}>Request</MyButton>}
        {status === 'pending_sent' && (
          <MyButton
            variant="secondary"
            onClick={onRevoke}
            isLoading={isRevokePending}
          >
            Revoke
          </MyButton>
        )}
        {status === 'pending_received' && (
          <MyButton onClick={onAccept} isLoading={isAcceptPending}>
            Accept
          </MyButton>
        )}
      </div>
    </StyledConnectableUserItem>
  );
});
