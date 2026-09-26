import styled, { keyframes } from 'styled-components';
import { StyledDateTimePicker } from '@/components/DateTimePicker/DateTimePicker.styled';

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const StyledBottomDatePickerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;

  .backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ theme }) => theme.scrim.sheet};
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    animation: ${fadeIn} 0.2s ease-out;
  }

  .sheet {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    box-sizing: border-box;
    background-color: ${({ theme }) => theme.surface.card};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.dialog};
    padding: ${({ theme }) =>
      `${theme.space.s16} ${theme.space.s16} ${theme.space.s20}`};
    box-shadow: ${({ theme }) => theme.shadow.dialog};
    animation: ${scaleIn} 0.2s ease-out;

    .sheet-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: ${({ theme }) => theme.space.s12};

      .sheet-title {
        font-size: ${({ theme }) => theme.size.s17};
        font-weight: ${({ theme }) => theme.weight.semibold};
        letter-spacing: -0.01em;
        color: ${({ theme }) => theme.ink.primary};
      }
    }

    .calendar-container {
      display: flex;
      justify-content: center;

      ${StyledDateTimePicker} {
        position: relative;
        top: 0;
        left: 0;
        transform: none;
        border: none;
        margin: 0;
        background-color: transparent;
      }
    }
  }
`;
