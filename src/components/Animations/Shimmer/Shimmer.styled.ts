import styled, { keyframes } from 'styled-components';

const shimmerAnimation = keyframes`
  /* The actual movement happens in the first 70% of the time */
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
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
  
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.layer2} 25%,
    ${({ theme }) => theme.layer1} 50%,
    ${({ theme }) => theme.layer2} 75%
  );
  
  background-size: 200% 100%;
  /* Using 'linear' ensures the movement is steady before the pause */
  animation: ${shimmerAnimation} 2.5s infinite linear; 
`;