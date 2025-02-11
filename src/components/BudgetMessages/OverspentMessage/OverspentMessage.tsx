import { StyledOverspentMessage } from "./OverspentMessage.styled";
import IonIcon from "@reacticons/ionicons";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import { OverspentMessageProps } from "../../../interfaces";

export default function OverspentMessage({
  onClick,
  offBudgetAmount,
  style,
  currency,
  overspentBy,
  overspent,
  closeButton,
  budgetType
}: OverspentMessageProps) {
  return (
    <StyledOverspentMessage style={style}>
      <div className="main">
        {/* <div className="header">Recommendation</div> */}
        <div className="signParagraphWrap">
          <div className="sign">
            <IonIcon name="warning-outline" className="warning" />
          </div>
          <div className="paragraphs">
            <div className="firstParagraph">
              {overspent ? (
                <span>
                  You have overspent by{" "}
                  <strong className="amount">
                    {displayCurrencyAndAmount(overspentBy, currency)}
                  </strong>
                  .
                </span>
              ) : (
                <span>You have reached your spending goal.</span>
              )}
            </div>
            <div className="secondParagraph">
              By spending at this rate you will be off budget by{" "}
              <strong className="amount">
                {displayCurrencyAndAmount(offBudgetAmount, currency)}
              </strong>{" "}
              at the end of the {budgetType === 1 ? "month" : "week"}
            </div>
          </div>
        </div>
        {closeButton && (
          <div className="closeButton" onClick={onClick}>
            <IonIcon name="close-outline" className="close" />
          </div>
        )}
      </div>
    </StyledOverspentMessage>
  );
}
