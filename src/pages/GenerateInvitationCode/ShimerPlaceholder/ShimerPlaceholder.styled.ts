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

export const StyledShimerPlaceholder = styled.div`
  width: 100px;
  height: 16px;
  background-color: ${({ theme }) => theme.layer2};
  animation: ${pulse} 1.5s ease-in-out infinite;
  border-radius: 4px;
`;
