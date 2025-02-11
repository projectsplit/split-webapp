import { StyledRecommendation } from "./Recommendation.styled";
import IonIcon from "@reacticons/ionicons";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import { RecommendationMessageProps } from "../../../interfaces";

export default function Recommendation({
  onClick,
  days,
  offBudgetAmount,
  reduceAmount,
  style,
  currency,
  closeButton,
  budgetType,
}: RecommendationMessageProps) {
  const displayedDays = (days: string) => {
    const days2number = parseFloat(days);
    if (days2number < 1) return days2number.toFixed(1).toString();
    else return days2number.toFixed(0).toString();
  };

  return (
    <StyledRecommendation style={style}>
      <div className="main">
        {/* <div className="header">Recommendation</div> */}
        <div className="signParagraphWrap">
          <div className="sign">
            <IonIcon name="warning-outline" className="warning" />
          </div>
          <div className="paragraphs">
            <div className="firstParagraph">
              Reduce your spending by{" "}
              <strong className="amount">
                {displayCurrencyAndAmount(reduceAmount, currency)}
              </strong>{" "}
              per day to not exceed your monthly cap.
            </div>
            <div className="secondParagraph">
              At this rate you will reach your cap in{" "}
              <strong>{displayedDays(days)}</strong>{" "}
              {displayedDays(days) === "1" ? "day" : "days"} and you will be off
              budget by{" "}
              <strong className="amount">
                {displayCurrencyAndAmount(offBudgetAmount, currency)}
              </strong>{" "}
              at the end of the {budgetType === 1 ? "month" : "week"}.
            </div>
          </div>
        </div>
        {closeButton && (
          <div className="closeButton" onClick={onClick}>
            <IonIcon name="close-outline" className="close" />
          </div>
        )}
      </div>
    </StyledRecommendation>
  );
}
