import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  100% {
    background-position: 468px 0;
  }
`;
export const StyledShimerPlaceholder = styled.div`
  width: 100px;
  height: 16px;
  background: linear-gradient(
    to right,
    #18181b 0%,
    #363639 20%,
    #4a4a4d 40%,
    #18181b 100%
  );
  background-size: 468px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  border-radius: 4px;
`;
