import styled, { keyframes } from 'styled-components';

const sweep = keyframes`
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
  background-color: ${({ theme }) => theme.surface.card};
  background-image: ${({ theme }) =>
    `linear-gradient(90deg, ${theme.surface.card} 0%, ${theme.surface.outline} 50%, ${theme.surface.card} 100%)`};
  background-size: 200% 100%;
  animation: ${sweep} 1.6s linear infinite;
`;
