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
    background-color: rgba(0, 0, 0, 0.7);
    animation: ${fadeIn} 0.2s ease-out;
  }

  .sheet {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    background-color: ${({ theme }) => theme.backgroundcolor};
    border-radius: 14px;
    padding: 14px 16px 20px;
    animation: ${scaleIn} 0.2s ease-out;

    .sheet-header {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 10px;

      .sheet-title {
        font-size: 16px;
        font-weight: 600;
        color: ${({ theme }) => theme.activeTabButtonTextColor};
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
