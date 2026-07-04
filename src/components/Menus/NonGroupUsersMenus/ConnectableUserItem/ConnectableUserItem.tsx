import React from 'react';
import { StyledConnectableUserItem } from './ConnectableUserItem.styled';
import { ConnectionStatus } from '../../../../types';

type ConnectableUserItemProps = {
  name: string;
  status: ConnectionStatus | undefined;
  onSelect: (e: React.MouseEvent) => void;
  onRequest: (e: React.MouseEvent) => void;
  onAccept: (e: React.MouseEvent) => void;
};

/**
 * A user row in the non-group pickers. Users you are not connected with
 * cannot be selected directly: they show a Request / Requested / Accept chip.
 */
export default React.memo(function ConnectableUserItem({
  name,
  status,
  onSelect,
  onRequest,
  onAccept,
}: ConnectableUserItemProps) {
  const handleRowClick = (e: React.MouseEvent) => {
    if (status === 'connected') onSelect(e);
    else if (status === 'none') onRequest(e);
    else if (status === 'pending_received') onAccept(e);
  };

  return (
    <StyledConnectableUserItem>
      <div className="top-row" onClick={handleRowClick}>
        <div className="name">{name}</div>
        {status === 'none' && <div className="chip request">Request</div>}
        {status === 'pending_sent' && (
          <div className="chip pending">Requested</div>
        )}
        {status === 'pending_received' && (
          <div className="chip accept">Accept</div>
        )}
      </div>
    </StyledConnectableUserItem>
  );
});
