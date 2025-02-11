import React from "react";
import { OptionsButtonProps } from "../../interfaces";
import { StyledUserOptionsButton } from "./UserOptionsButton.styled";

export default function UserOptionsButton({
  onClick,
  children,
}: OptionsButtonProps) {
  return (
    <StyledUserOptionsButton onClick={onClick}>
      {children}
    </StyledUserOptionsButton>
  );
}
