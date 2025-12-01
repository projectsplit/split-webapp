import styled, { keyframes } from "styled-components";

export const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

export const ShimmerRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  width: 100%;
  box-sizing: border-box;
`;

export const Line = styled.div`
  height: 30px;
  border-radius: 8px;
  background: linear-gradient(
    to right,
    #18181b 0%,
    #363639 20%,
    #4a4a4d 40%,
    #18181b 100%
  );
  background-size: 468px 104px;
  animation: ${shimmer} 1.5s infinite linear;
  width: 60%;
`;
