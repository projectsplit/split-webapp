import { StyledConfirmation } from './Confirmation.styled';
import MyButton from '../../MyButton/MyButton';
import { ConfirmationProps } from '../../../interfaces';

export default function InfoContainer({
  children,
  isLoading,
  onClick,
  menu,
  header,
  confirmLabel,
}: ConfirmationProps) {
  return (
    <StyledConfirmation>
      <div className="dialogTitle">{header}</div>
      <div className="info">{children}</div>
      <div className="buttons">
        <MyButton isLoading={isLoading} onClick={onClick}>
          {confirmLabel ?? 'Confirm'}
        </MyButton>
        <MyButton variant="secondary" onClick={() => (menu.value = null)}>
          Cancel
        </MyButton>
      </div>
    </StyledConfirmation>
  );
}
