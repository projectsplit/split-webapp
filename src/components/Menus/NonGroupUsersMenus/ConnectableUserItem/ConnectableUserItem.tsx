import React from 'react';
import { StyledConnectableUserItem } from './ConnectableUserItem.styled';
import { ConnectionStatus } from '../../../../types';
import MyButton from '../../../MyButton/MyButton';
import { getInitials } from '../../../../helpers/getInitials';

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
        <span className="avatar">{getInitials(name)}</span>
        <div className="name">{name}</div>
        {status === 'none' && (
          <MyButton size="compact" variant="secondary" onClick={onRequest}>
            Request
          </MyButton>
        )}
        {status === 'pending_sent' && (
          <MyButton
            size="compact"
            variant="secondary"
            onClick={onRevoke}
            isLoading={isRevokePending}
          >
            Revoke
          </MyButton>
        )}
        {status === 'pending_received' && (
          <MyButton
            size="compact"
            onClick={onAccept}
            isLoading={isAcceptPending}
          >
            Accept
          </MyButton>
        )}
      </div>
    </StyledConnectableUserItem>
  );
});
