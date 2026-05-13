import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
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
  background-color: ${({ theme }) => theme.layer2};
  animation: ${pulse} 1.5s ease-in-out infinite;
  width: 60%;
`;
