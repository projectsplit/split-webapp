import { dateIsInFuture } from '@/helpers/dateIsInFuture';
import { dateIsInPast } from '@/helpers/dateIsInPast';
import { SimpleOnTrackMessageProps } from '../../../interfaces';
import { StyledSimpleOnTrackMessage } from './SimpleOnTrackMessage.styled';
import IonIcon from '@reacticons/ionicons';

export default function SimpleOnTrackMessage({
  onClick,
  style,
  closeButton,
  startDate,
  endDate,
}: SimpleOnTrackMessageProps) {
  const getMessage = () => {
    if (endDate && dateIsInPast(endDate)) return 'This budget has expired.';
    if (dateIsInFuture(startDate)) return 'Your budget is not yet in effect.';
    return 'You are on track to meeting your spending goal.';
  };

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
             {getMessage()}
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
