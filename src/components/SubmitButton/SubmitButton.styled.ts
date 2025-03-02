import styled from "styled-components";
import { SubmitButtonProps } from "../../interfaces";

export const StyledSubmitButton = styled.button<SubmitButtonProps>`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 4px;
  border: none;
  border-radius: 4px;
  user-select: none;
  padding: 12px 16px;
  cursor: ${({ disabled }) =>
    disabled === true ? "not-allowed" : "pointer"};
  color: ${({ theme, color }) => (color ? color : theme.text)};
  background-color: ${({ backgroundColor, theme, disabled }) =>
    backgroundColor
      ? backgroundColor
      : disabled !== true
      ? theme.buttonActive
      : theme.buttonNotActive};
  display: flex;
  justify-content: center;
  position: relative;
  font-size: 18px;

  &:hover {
    opacity: ${({ disabled }) =>
      disabled === true ? 1 : 0.75};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 1;
  }
`;
