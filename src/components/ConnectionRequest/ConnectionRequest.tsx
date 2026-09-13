import React from 'react';
import { StyledNotificationCard } from '../NotificationCard/NotificationCard.styled';
import { useAcceptConnectionRequest } from '../../api/auth/CommandHooks/useAcceptConnectionRequest';
import { useDeclineConnectionRequest } from '../../api/auth/CommandHooks/useDeclineConnectionRequest';
import MyButton from '../MyButton/MyButton';
import { getInitials } from '../../helpers/getInitials';
import { ConnectionRequestItem } from '../../types';

type ConnectionRequestProps = {
  connectionRequest: ConnectionRequestItem;
};

const ConnectionRequest: React.FC<ConnectionRequestProps> = ({
  connectionRequest,
}) => {
  const accept = useAcceptConnectionRequest();
  const decline = useDeclineConnectionRequest();

  return (
    <StyledNotificationCard>
      <div className="mainMsg">
        <span className="avatar">
          {getInitials(connectionRequest.senderUsername)}
        </span>
        <div className="msgText">
          <div className="message">
          <strong>{connectionRequest.senderUsername}</strong> wants to split
          expenses with you
        </div>
        </div>
      </div>
      <div className="actions">
        <MyButton
          onClick={() => accept.mutate(connectionRequest.id)}
          isLoading={accept.isPending}
          hasFailed={accept.isError}
        >
          Accept
        </MyButton>
        <MyButton
          onClick={() => decline.mutate(connectionRequest.id)}
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

export default ConnectionRequest;
