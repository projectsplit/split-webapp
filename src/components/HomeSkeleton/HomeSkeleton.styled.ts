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

export const StyledHomeSkeleton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 65%;

  .welcomeShimmer {
    padding: ${({ theme }) => `${theme.space.s16} ${theme.space.s20}`};
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.s8};
    align-items: center;
  }

  .menuShimmer {
    padding: ${({ theme }) => `0 ${theme.space.s20}`};
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s12};
    flex-grow: 1;
    min-height: 0;
  }

  .bone {
    background-color: ${({ theme }) => theme.surface.card};
    border-radius: ${({ theme }) => theme.radius.surface};
    animation: ${pulse} 1.5s ease-in-out infinite;
    flex: 1;
  }

  .boneLine {
    background-color: ${({ theme }) => theme.surface.card};
    border-radius: ${({ theme }) => theme.space.s4};
    animation: ${pulse} 1.5s ease-in-out infinite;
  }

  .fabShimmer {
    position: fixed;
    bottom: 40px;
    right: 25px;
    width: 52px;
    height: 52px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.card};
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
`;
