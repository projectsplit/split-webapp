import styled, { keyframes } from 'styled-components';
import { sheetHeaderStyles } from '@/styles/sheetHeader';

const toastIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, 8px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
`;

export const StyledGenerateInvitationCode = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.surface.page};

  .fixed-header-container {
    flex-shrink: 0;
    background-color: ${({ theme }) => theme.surface.page};
  }

  ${sheetHeaderStyles}

  .sheetControls {
    padding: ${({ theme }) => `0 ${theme.space.s20} ${theme.space.s16}`};
    flex-shrink: 0;
  }

  .toast {
    position: fixed;
    left: 50%;
    bottom: 96px;
    z-index: 20;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.space.s8};
    max-width: calc(100vw - 40px);
    padding: ${({ theme }) => `10px ${theme.space.s16}`};
    background-color: ${({ theme }) => theme.surface.raisedHigh};
    border: 1px solid ${({ theme }) => theme.surface.outline};
    border-radius: ${({ theme }) => theme.radius.pill};
    box-shadow: ${({ theme }) => theme.shadow.dialog};
    font-size: ${({ theme }) => theme.size.s13};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
    white-space: nowrap;
    animation: ${toastIn} 0.18s ease-out;

    .toastIcon {
      display: flex;
      flex-shrink: 0;
      font-size: ${({ theme }) => theme.icon.sm};
      color: ${({ theme }) => theme.direction.owed};
    }

    &.failed .toastIcon {
      color: ${({ theme }) => theme.direction.owe};
    }
  }
`;
