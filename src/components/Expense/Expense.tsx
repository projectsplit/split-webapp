import { ExpenseProps } from "../../interfaces";
import { StyledExpense } from "./Expense.styled";
import { MdLocationOn } from "react-icons/md";
import { displayCurrencyAndAmount } from "../../helpers/displayCurrencyAndAmount";
import { TimeOnly } from "../../helpers/timeHelpers";
import Pill from "../Pill/Pill";
import labelColors from "../../labelColors";

const Expense = ({
  timeZoneId,
  onClick,
  amount,
  currency,
  description,
  location,
  occurred,
  userAmount,
  labels,
}: ExpenseProps) => {
  
  return (
    <StyledExpense onClick={onClick} userAmount={userAmount}>
      <div className="topRow">
        {/* <div className="locationIcon">{expense.location &&<IoLocationOutline />}</div> */}
        {location ? <MdLocationOn className="locationIcon" /> : <div />}
        <strong className="time">{TimeOnly(occurred, timeZoneId)}</strong>
      </div>

      <div className="descrAndAmounts">
        <div className="descr">
          {description ? (
            <span>{description}</span>
          ) : location ? (
            <span>{location.google?.name}</span>
          ) : (
            ""
          )}
        </div>
        <div className="amounts">
          <div className="groupTotal">
            {amount === 0 ? "" : <div className="legendGroup" />}
            <div className="amount">
              {displayCurrencyAndAmount(Math.abs(amount).toString(), currency)}
            </div>
          </div>

          <div className="userShare">
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

      {labels.length > 0 ? (
        <div className="labels">
          {labels.map((l, index) => {
            return (
              <Pill
                textColor={"#000000c8"}
                key={index}
                title={l.text}
                color={labelColors[l.color]}
                closeButton={false}
                fontSize="14px" />
            );
          })}
        </div>
      ) : null}
    </StyledExpense>
  );
};

export default Expense;
