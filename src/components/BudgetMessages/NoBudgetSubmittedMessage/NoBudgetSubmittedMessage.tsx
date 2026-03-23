import IonIcon from '@reacticons/ionicons';
import { StyledNoBudgetSubmittedMessage } from './NoBudgetSubmittedMessage.styled';

export const NoBudgetSubmittedMessage = ({noSubmissions}: {noSubmissions?: boolean}) => {
  return (
    <StyledNoBudgetSubmittedMessage>
      <div className="main">
        <div className="signParagraphWrap">
          <div className="sign">
            <IonIcon
              name="information-circle-outline"
              className="information"
            />
          </div>
          <div className="paragraph">
            <div className="firstParagraph">{noSubmissions ? 'No budgets have been submitted.' : 'No active budget.'}</div>
          </div>
        </div>
      </div>
    </StyledNoBudgetSubmittedMessage>
  );
};
