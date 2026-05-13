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

export const StyledShimmer = styled.div<{
  $width?: string;
  $height?: string;
  $borderRadius?: string;
}>`
  width: ${({ $width }) => $width || '100%'};
  height: ${({ $height }) => $height || '20px'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '4px'};
  background-color: ${({ theme }) => theme.layer2};
  animation: ${pulse} 1.5s ease-in-out infinite;
`;
