import { OptionsButtonProps } from "../../interfaces";
import { StyledOptionsButton } from "./OptionsButton.styled";


export default function OptionsButton({
  onClick,
  children,
}: OptionsButtonProps) {
  return (
    <StyledOptionsButton onClick={onClick}>{children}</StyledOptionsButton>
  );
}
