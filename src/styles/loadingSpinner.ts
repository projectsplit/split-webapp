import styled, { keyframes } from "styled-components";
import IonIcon from "@reacticons/ionicons";
import { LoadingSpinnerProps } from "../interfaces";



const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingSpinner = styled(IonIcon)<LoadingSpinnerProps>`
 
  font-size: ${(props) => props.fontSize}px;
  animation-name: ${spinAnimation}; 
  animation-duration: 1s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;
