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
    padding: 1rem 0;
    padding-left: 14px;
    padding-right: 14px;
    display: flex;
    flex-direction: row;
    gap: 8px;
    align-items: center;
  }

  .menuShimmer {
    padding: 14px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    flex-grow: 1;
    min-height: 0;
  }

  .bone {
    background-color: ${({ theme }) => theme.layer2};
    border-radius: 10px;
    animation: ${pulse} 1.5s ease-in-out infinite;
    flex: 1;
  }

  .boneLine {
    background-color: ${({ theme }) => theme.layer2};
    animation: ${pulse} 1.5s ease-in-out infinite;
  }

  .fabShimmer {
    position: fixed;
    bottom: 40px;
    right: 25px;
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.layer2};
    animation: ${pulse} 1.5s ease-in-out infinite;
  }
`;
