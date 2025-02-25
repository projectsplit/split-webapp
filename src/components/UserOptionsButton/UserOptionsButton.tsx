import { OptionsButtonProps } from "../../interfaces";
import { StyledUserOptionsButton } from "./UserOptionsButton.styled";

export default function UserOptionsButton({
  onClick,
  username,
}: OptionsButtonProps) {
  
  // const getInitials = (name: string) => {
  //   const words = name.trim().split(' ');
  //   console.log(words)
  //   if (words && words.length === 1) {
  //     return words[0].charAt(0).toUpperCase();
  //   } else if (words && words.length > 1) {
  //     return (
  //       words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase()
  //     );
  //   }
  //   return '';
  // };

  // const initials = getInitials(username);

  return (
    <StyledUserOptionsButton onClick={onClick}>
     {"CK"}
    </StyledUserOptionsButton>
  );
}