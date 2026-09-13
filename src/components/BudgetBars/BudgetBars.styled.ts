import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 0.9;
  }
`;

export const StyledBudgetBars = styled.div`
  .barWithMarker {
    position: relative;
  }

  .barWithMarker.pendingBar {
    animation: ${pulse} 1.2s ease-in-out infinite;
  }

  .lead {
    border-radius: ${({ theme }) => theme.radius.pill};
  }

  .barEmpty .trail {
    border-radius: ${({ theme }) => theme.radius.pill};
  }

  .cycleMarker {
    position: absolute;
    top: -2px;
    width: 0;
    height: 0;
    transform: translateX(-50%);
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    border-top: 5px solid ${({ theme }) => theme.ink.primary};
  }

  .captions {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: ${({ theme }) => theme.size.s11};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .pendingFigure {
    width: 96px;
    border-radius: ${({ theme }) => theme.space.s6};
    background-color: ${({ theme }) => theme.surface.raised};
    animation: ${pulse} 1.2s ease-in-out infinite;
  }
`;
