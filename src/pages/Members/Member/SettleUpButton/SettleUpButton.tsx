import { StyledSettleUpButton } from "./SettleUpButton.Styled";
import { SettleUpButtonProps } from "../../../../interfaces";


export default function SettleUpButton({ onClick }: SettleUpButtonProps) {
  return (
    <StyledSettleUpButton onClick={onClick}>
      <div>Settle Up</div>
    </StyledSettleUpButton>
  );
}
