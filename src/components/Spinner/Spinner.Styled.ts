import { CgSpinner } from "react-icons/cg";
import styled from "styled-components";

export const StyledSpinner = styled(CgSpinner)`
  @keyframes spin-animation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
    align-self: center;
    animation: spin-animation 0.8s linear infinite;
    font-size: 25px;
    color: ${({ theme }) => theme.colors.labelColor6};
    margin-top: 10px;
    margin-bottom: 10px;
 
`;
