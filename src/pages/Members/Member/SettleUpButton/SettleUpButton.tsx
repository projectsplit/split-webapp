import { StyledSettleUpButton } from "./SettleUpButton.Styled";
import { SettleUpButtonProps } from "../../../../interfaces";


export default function SettleUpButton({ onClick,children }: SettleUpButtonProps) {
  return (
    <StyledSettleUpButton onClick={onClick}>
      <div>{children}</div>
    </StyledSettleUpButton>
  );
}
