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

export const StyledShimmerPlaceholder = styled.div`
  width: 100px;
  height: 16px;
  background-color: ${({ theme }) => theme.surface.card};
  animation: ${pulse} 1.5s ease-in-out infinite;
  border-radius: ${({ theme }) => theme.radius.control};
`;
