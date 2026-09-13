import { keyframes, styled } from 'styled-components';
import { paddedScrollPageStyles } from '@/styles/paddedScrollPage';

const settle = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const StyledManageBudgets = styled.div`
  ${paddedScrollPageStyles}

  .scrollContainer {
    gap: 15px;
    padding: 0 20px;

    .flipRow {
      will-change: transform;
      animation: ${settle} 220ms cubic-bezier(0.2, 0, 0, 1);
    }

    @media (prefers-reduced-motion: reduce) {
      .flipRow {
        animation: none;
        transition: none !important;
      }
    }

    .spinnerContainer {

      display: flex;
      justify-content: center;
      align-items: center;
    }

    &::-webkit-scrollbar {
      width: 4px;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.surface.raisedHigh};
      border-radius: ${({ theme }) => theme.space.s4};
    }
  }

  .submitButton {
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding: 12px 20px 20px;
  }
`;
