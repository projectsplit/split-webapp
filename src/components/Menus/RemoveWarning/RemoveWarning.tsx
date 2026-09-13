import IonIcon from '@reacticons/ionicons';
import { StyledRemoveWarning } from './RemoveWarning.styled';
import { RemoveWarningProps } from '../../../interfaces';
import MyButton from '../../MyButton/MyButton';

export default function RemoveWarning({
  header,
  menu,
  message,
  onConfirm,
  isLoading,
}: RemoveWarningProps) {
  return (
    <StyledRemoveWarning>
      <div className="dialogHeader">
        <IonIcon
          name="information-circle-outline"
          className="dialogIcon danger"
        />
        <div className="dialogTitle">{header}</div>
        <div className="closeButton" onClick={() => (menu.value = null)}>
          <IonIcon name="close-outline" />
        </div>
      </div>
      <div className="info">{message}</div>
      {onConfirm && (
        <div className="buttons">
          <MyButton isLoading={isLoading} onClick={onConfirm}>
            Confirm
          </MyButton>
          <MyButton variant="secondary" onClick={() => (menu.value = null)}>
            Cancel
          </MyButton>
        </div>
      )}
    </StyledRemoveWarning>
  );
}
