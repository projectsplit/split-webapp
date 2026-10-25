import React from 'react';
import { TransferProps } from '../../interfaces';
import { StyledTransfer } from './Transfer.styled';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import { useLongPress } from '../../hooks/useLongPress';
import { FormatDateTime, TimeOnly } from '../../helpers/timeHelpers';
import { transferTitle } from '../../helpers/transferTitle';
import { MdErrorOutline, MdSchedule } from 'react-icons/md';

const Transfer: React.FC<TransferProps> = ({
  transfer,
  timeZoneId,
  onClick,
  onLongPress,
  pendingState,
}) => {
  const longPressHandlers = useLongPress(onLongPress ?? (() => {}));

  const isSent = transfer.senderName === 'You';
  const isReceived = transfer.receiverName === 'You';

  const title = transferTitle(transfer.senderName, transfer.receiverName);

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
        {/* Pending rows sit together above the dated list, so they carry their own date. */}
        {pendingState === 'rejected' ? (
          <span className="pendingState rejected">
            <MdErrorOutline className="pendingIcon" />
            Couldn't sync
          </span>
        ) : pendingState === 'waiting' ? (
          <span className="pendingState">
            <MdSchedule className="pendingIcon" />
            <span className="time">
              {FormatDateTime(transfer.date, timeZoneId)}
            </span>
          </span>
        ) : (
          <span className="time">{TimeOnly(transfer.date, timeZoneId)}</span>
        )}
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
