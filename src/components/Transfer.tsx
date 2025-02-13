import React from "react";
import { styled } from "styled-components";

import { DateTime } from "luxon";
import { TransferProps } from "../interfaces";

const Transfer: React.FC<TransferProps> = ({ transfer, timeZoneId }) => {
  const currency = transfer.currency === "EUR" ? "€" : transfer.currency;
  
  return (
    <StyledTransfer>
      <div className="top-row">
        <div className="time">{TimeOnly(transfer.date, timeZoneId)}</div>
      </div>
      <div className="middle-row">
        <div className="description">{transfer.description}</div>
      </div>
      <div className="bottom-row">
        <div>{transfer.senderName} sent {currency} {transfer.amount} to {transfer.receiverName}</div>
      </div>
    </StyledTransfer>
  );
};

export default Transfer;

const TimeOnly = (eventTimeUtc: string, timeZone: string): string => {
  const eventDateTime = DateTime.fromISO(eventTimeUtc, { zone: 'utc' }).setZone(timeZone);
  return eventDateTime.setZone(timeZone).toFormat('HH:mm');
};

const StyledTransfer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.lineColor};
  gap: 10px;
  border-radius: 10px;
  width: 100%;
  padding: 10px;
  
  .top-row {
    color: ${({ theme }) => theme.secondaryTextColor};
    display: flex;
    justify-content: space-between;
    width: 100%;
    align-items: center;
    font-size: 14px;
    
    .time {
      flex: 1;
      font-weight: 800;
    }
  }
  
  .middle-row {
    color: ${({ theme }) => theme.primaryTextColor};
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1em;
  
    .description {
      font-style: italic;
      align-items: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  
  .bottom-row {
    color: ${({ theme }) => theme.secondaryTextColor};
    width: 100%;
    justify-content: space-between;
    display: flex;
    align-items: center;
    gap: 1em;
  }
  
  .amount {
    display: flex;
    align-items: center;
  }
`;