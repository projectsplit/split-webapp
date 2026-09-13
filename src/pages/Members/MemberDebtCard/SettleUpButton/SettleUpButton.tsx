import { StyledSettleUpButton } from './SettleUpButton.styled';
import { SettleUpButtonProps } from '../../../../interfaces';

export default function SettleUpButton({
  onClick,
  children,
  primary,
}: SettleUpButtonProps) {
  return (
    <StyledSettleUpButton onClick={onClick} $primary={primary}>
      <div>{children}</div>
    </StyledSettleUpButton>
  );
}
