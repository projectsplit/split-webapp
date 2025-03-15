import { ExpenseProps } from "../../interfaces";
import { StyledExpense } from "./Expense.styled";
import { MdLocationOn } from "react-icons/md";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";
import { TimeOnly } from "../../helpers/timeHelpers";

const Expense = ({
  timeZoneId,
  onClick,
  amount,
  currency,
  description,
  location,
  occurred,
  userAmount,
}: ExpenseProps) => {


  return (
    <StyledExpense onClick={onClick}>
      <div className="topRow">
        {/* <div className="locationIcon">{expense.location &&<IoLocationOutline />}</div> */}
        {location ? <MdLocationOn className="locationIcon" /> : <div />}
        <strong className="time">{TimeOnly(occurred, timeZoneId)}</strong>
      </div>
      <div className="wrapper">
        <div className="descrAndLabels">
          <div className="descr">{description}</div>
          <div className="labels">
            <div className="label" />
          </div>
        </div>
        <div className="amounts">
          <div className="userShare">
            {amount === 0 ? "" : <div className="legendGroup" />}
            <div className="amount">
              {displayCurrencyAndAmount(Math.abs(amount).toString(), currency)}
            </div>
          </div>

          <div className="groupTotal">
            {userAmount === 0 ? "" : <div className="legendUser" />}
            <div className="amount">
              {userAmount === 0
                ? ""
                : displayCurrencyAndAmount(
                    Math.abs(userAmount).toString(),
                    currency
                  )}
            </div>
          </div>
        </div>
      </div>
    </StyledExpense>
  );
};

export default Expense;


