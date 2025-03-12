import { StyledComment } from "./Comment.Styled";
import IonIcon from "@reacticons/ionicons";

export default function Comment() {
  return (
    <StyledComment>
      <div className="nameAndClose">
        <strong className="name">You</strong>
        <IonIcon name="close-outline" className="close" />
        </div>
      <div className="commentAndTime">
        <div className="comment">
          kala ta les alla ante kai gamisou paliopoutanaki
        </div>
        <div className="time">12:00</div>
      </div>
    </StyledComment>
  );
}
