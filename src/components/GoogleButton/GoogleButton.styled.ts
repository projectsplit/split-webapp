import styled from "styled-components";
import { StyledSubmitButton } from "../SubmitButton/SubmitButton.styled";

export const StyledGoogleButton = styled(StyledSubmitButton)`
display: flex;
align-items: center;
justify-content: center;

gap: 8px;
padding: 12px 16px;

.googleLogo {
  width: 18px;  
  height: 18px;
}

.prompt {
  text-align: center;
}
`