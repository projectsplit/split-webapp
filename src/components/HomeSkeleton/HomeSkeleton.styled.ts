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
  gap: ${({ theme }) => theme.space.s24};
  padding: ${({ theme }) => `${theme.space.s8} ${theme.space.s20} 110px`};

  .section {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s10};
  }

  .rows {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s8};
  }

  .fabShimmer {
    position: fixed;
    bottom: 28px;
    right: 20px;
    width: 56px;
    height: 56px;
    border-radius: ${({ theme }) => theme.radius.pill};
    background-color: ${({ theme }) => theme.surface.card};
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
`;
