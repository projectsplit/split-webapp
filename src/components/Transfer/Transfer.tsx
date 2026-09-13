import React from 'react';
import { TransferProps } from '../../interfaces';
import { StyledTransfer } from './Transfer.styled';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import { useLongPress } from '../../hooks/useLongPress';
import { TimeOnly } from '../../helpers/timeHelpers';

const Transfer: React.FC<TransferProps> = ({
  transfer,
  timeZoneId,
  onClick,
  onLongPress,
}) => {
  const longPressHandlers = useLongPress(onLongPress ?? (() => {}));

  const isSent = transfer.senderName === 'You';
  const isReceived = transfer.receiverName === 'You';

  const title = isSent
    ? `Sent to ${transfer.receiverName}`
    : isReceived
      ? `Received from ${transfer.senderName}`
      : `${transfer.senderName} sent to ${transfer.receiverName}`;

  const direction = isSent ? 'sent' : isReceived ? 'received' : 'other';

  return (
    <StyledTransfer onClick={onClick} {...longPressHandlers}>
      <div className="head">
        {isSent || isReceived ? (
          <span className="emoji">{isSent ? '💸' : '🤑'}</span>
        ) : null}
        <span className="title">{title}</span>
      </div>

      <span className={`amount ${direction}`}>
        {displayCurrencyAndAmount(
          Math.abs(transfer.amount).toString(),
          transfer.currency
        )}
      </span>

      <div className="meta">
        <span className="time">{TimeOnly(transfer.date, timeZoneId)}</span>
        {transfer.description ? (
          <>
            <span className="dot">&middot;</span>
            <span className="descr">{transfer.description}</span>
          </>
        ) : null}
      </div>
    </StyledTransfer>
  );
};

export default Transfer;
