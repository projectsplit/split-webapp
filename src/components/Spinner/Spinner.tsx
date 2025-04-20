import { CgSpinner } from "react-icons/cg";
import styled from "styled-components";

interface SpinnerProps {
  fontSize?: string;
}

const Spinner = styled(CgSpinner)<SpinnerProps>`

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
    font-size: ${({ fontSize }) => fontSize || "25px"};
    color: ${({ theme }) => theme.labelColor6};
    /* margin-top: 10px;
    margin-bottom: 10px; */
`;

export default Spinner;