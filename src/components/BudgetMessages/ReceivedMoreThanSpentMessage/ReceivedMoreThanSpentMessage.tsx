
import { StyledReceivedMoreThanSpentMessage } from "./ReceivedMoreThanSpentMessage.styled";
import IonIcon from "@reacticons/ionicons";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import { ReceivedMoreThanSpentMessageProps } from "../../../interfaces";

export default function ReceivedMoreThanSpentMessage({
  onClick,
  amount,
  style,
  currency,
  closeButton,
  budgetType,
}: ReceivedMoreThanSpentMessageProps) {

  const negativeAmountToPositive = (parseFloat(amount) * -1).toString();

  return (
    <StyledReceivedMoreThanSpentMessage style={style}>
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
               You have received more
              funds than you have spent this {budgetType === 1 ? "month" : "week"}.
            </div>
            <div className="secondParagraph">
              The total amount received in excess of your expenses is{" "}
              <strong className="amount">
                {displayCurrencyAndAmount(negativeAmountToPositive , currency)}
              </strong>.{" "}
            </div>
          </div>
        </div>
        {closeButton && (
          <div className="closeButton" onClick={onClick}>
            <IonIcon name="close-outline" className="close" />
          </div>
        )}
      </div>
    </StyledReceivedMoreThanSpentMessage>
  );
}
