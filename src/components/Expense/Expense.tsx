import React from "react";
import { DateTime } from "luxon";
import { ExpenseProps } from "../../interfaces";
import { StyledExpense } from "./Expense.styled";
import { MdLocationOn } from "react-icons/md";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";

const Expense: React.FC<ExpenseProps> = ({ expense, timeZoneId,onClick }) => {

  return (
    <StyledExpense onClick={onClick}>
      <div className="topRow">
        {/* <div className="locationIcon">{expense.location &&<IoLocationOutline />}</div> */}
        {expense.location ? <MdLocationOn className="locationIcon" /> : <div />}
        <strong className="time">{TimeOnly(expense.date, timeZoneId)}</strong>
      </div>
      <div className="wrapper">
        <div className="descrAndLabels">
          <div className="descr">{expense.description}</div>
          <div className="labels">
            <div className="label"/>
          </div>
        </div>
        <div className="amounts">
          <div className="userShare">
            {expense.amount === 0 ? "" : <div className="legendGroup" />}
            <div className="amount">
              {displayCurrencyAndAmount(
                Math.abs(expense.amount).toString(),
                expense.currency
              )}
            </div>
          </div>

          <div className="groupTotal">
            {expense.shareAmount === 0 ? "" : <div className="legendUser" />}
            <div className="amount">
              {expense.shareAmount === 0
                ? ""
                : displayCurrencyAndAmount(
                    Math.abs(expense.shareAmount).toString(),
                    expense.currency
                  )}
            </div>
          </div>
        </div>
      </div>
    </StyledExpense>
  );
};

export default Expense;

const TimeOnly = (eventTimeUtc: string, timeZone: string): string => {
  const eventDateTime = DateTime.fromISO(eventTimeUtc, { zone: "utc" }).setZone(
    timeZone
  );
  return eventDateTime.setZone(timeZone).toFormat("HH:mm");
};
