import { getInitials } from "../../helpers/getInitials";
import { OptionsButtonProps } from "../../interfaces";
import { StyledUserOptionsButton } from "./UserOptionsButton.styled";

export default function UserOptionsButton({
  onClick,
  username,
}: OptionsButtonProps) {
  return (
    <StyledUserOptionsButton onClick={onClick}>
      {getInitials(username)}
    </StyledUserOptionsButton>
  );
}
