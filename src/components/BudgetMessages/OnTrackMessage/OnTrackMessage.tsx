import { StyledOnTrackMessage } from "./OnTrackMessage.styled";
import IonIcon from "@reacticons/ionicons";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import { OnTrackMessageProps } from "../../../interfaces";

export default function OnTrackMessage({
  onClick,
  amount,
  style,
  currency,
  closeButton,
  budgetType
}: OnTrackMessageProps) {
  return (
    <StyledOnTrackMessage style={style}>
      <div className="main">
        <div className="signParagraphWrap">
          <div className="sign">
            <IonIcon
              name="information-circle-outline"
              className="information"
            />
          </div>
          <div className="paragraphs">
            <div className="firstParagraph">
              You are on track to meeting your spending goal.
            </div>
            <div className="secondParagraph">
              Spending at this rate will save you{" "}
              <strong className="amount">
                {displayCurrencyAndAmount(amount, currency)}
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
    </StyledOnTrackMessage>
  );
}
