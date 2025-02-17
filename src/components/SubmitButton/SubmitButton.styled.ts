import styled from 'styled-components'
import { SubmitButtonProps } from '../../interfaces';


export const StyledSubmitButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "submitbuttonisactive", // Prevents this prop from being passed to the DOM
})<SubmitButtonProps>`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 4px;
  border: none;
  border-radius: 4px;
  user-select: none;
  padding: 12px 16px;
  cursor: ${({ submitbuttonisactive }) =>
    submitbuttonisactive === false ? 'not-allowed' : 'pointer'};
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme, submitbuttonisactive }) =>
    submitbuttonisactive !== false
      ? theme.buttonActive
      : theme.buttonNotActive};
  display: flex;
  justify-content: center;
  position: relative;  
  font-size: 18px;

  &:hover {
    opacity: ${({ submitbuttonisactive }) => (submitbuttonisactive === false ? 1 : 0.75)};
  }

  &:disabled {
    cursor: not-allowed; 
    opacity: 1;  
  }
`;
