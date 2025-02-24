import styled from "styled-components";
import { StyledOptionsButton } from "../OptionsButton/OptionsButton.styled";

export const StyledUserOptionsButton = styled(StyledOptionsButton)`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 4px;
  user-select: none;
  background-color: ${({ theme }) => theme.pink};
  font-size: 1rem;
  color: ${({ theme }) => theme.whiteText};
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 50%; /* makes the button a perfect circle */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; /* Ensures username stays in one line */

`;
