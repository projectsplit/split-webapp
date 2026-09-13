import IonIcon from '@reacticons/ionicons';
import { ErrorMenuProps } from '../../../interfaces';
import { StyledErrorMenu } from './ErrorMenu.styled';

export default function ErrorMenu({ menu, type }: ErrorMenuProps) {
  return (
    <StyledErrorMenu>
      <div className="dialogHeader">
        <IonIcon
          name="information-circle-outline"
          className="dialogIcon danger"
        />
        <div className="dialogTitle">Error</div>
        <div className="closeButton" onClick={() => (menu.value = null)}>
          <IonIcon name="close-outline" />
        </div>
      </div>
      <div className="info">
        {type === 'expense'
          ? 'Expense not found. Possibly already deleted by another user.'
          : 'Transfer not found. Possibly already deleted by another user.'}
      </div>
    </StyledErrorMenu>
  );
}
