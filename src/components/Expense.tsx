import React from "react";
import { styled } from "styled-components";
import { ExpenseProps } from "../types";
import { DateTime } from "luxon";
import { HiMapPin } from "react-icons/hi2";

const Expense: React.FC<ExpenseProps> = ({ expense, timeZoneId }) => {
  const currency = expense.currency === "EUR" ? "€" : expense.currency;
  
  return (
    <StyledExpense>
      <div className="top-row">
        <div className="time">{TimeOnly(expense.date, timeZoneId)}</div>
        {expense.location &&
          <div className="location-container">
            <div className='location-text'>{expense.location.google?.name ?? ''}</div>
            <HiMapPin className='location-icon' />
          </div>}
      </div>
      <div className="middle-row">
        <div className="description">{expense.description}</div>
        <div className="amount">{currency}{expense.shareAmount}</div>
      </div>
      <div className="bottom-row">
        <div className='labels'>{expense.labels.map(x => <div key={x} className='label'>{x}</div>)}</div>
        <div>{currency}{expense.amount}&nbsp;(Group)</div>
      </div>
    </StyledExpense>
  );
};

export default Expense;

const TimeOnly = (eventTimeUtc: string, timeZone: string): string => {
  const eventDateTime = DateTime.fromISO(eventTimeUtc, { zone: 'utc' }).setZone(timeZone);
  return eventDateTime.setZone(timeZone).toFormat('HH:mm');
};

const StyledExpense = styled.div`
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
  
    .location-container {
      display: flex;
      overflow: hidden;
      gap: 4px;
      flex: 2;
      justify-content: flex-end;

      .location-text {
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      
      .location-icon {
        flex-shrink: 0;
      }
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
    
    .labels {
      display: flex;
      gap: 4px;
      overflow: auto;
      
      .label {
        color: ${({theme}) => theme.backgroundColor};
        background-color: ${({theme}) => theme.inactiveTabButtonTextColor};
        display: flex;
        gap: 8px;
        align-items: center;
        border-radius: 2px;
        padding: 2px 8px;
        cursor: pointer;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  
  .amount {
    display: flex;
    align-items: center;
  }
`;