import { SimpleOnTrackMessageProps } from "../../../interfaces";
import { StyledSimpleOnTrackMessage } from "./SimpleOnTrackMessage.styled";
import IonIcon from "@reacticons/ionicons";


export default function SimpleOnTrackMessage({
  onClick,
  style,
  closeButton,
}: SimpleOnTrackMessageProps) {
  return (
    <StyledSimpleOnTrackMessage style={style}>
      <div className="main">
        <div className="signParagraphWrap">
          <div className="sign">
            <IonIcon
              name="information-circle-outline"
              className="information"
            />
          </div>
          <div className="paragraph">
            <div className="firstParagraph">
              You are on track to meeting your spending goal.
            </div>
          </div>
        </div>
        {closeButton && (
          <div className="closeButton" onClick={onClick}>
            <IonIcon name="close-outline" className="close" />
          </div>
        )}
      </div>
    </StyledSimpleOnTrackMessage>
  );
}
