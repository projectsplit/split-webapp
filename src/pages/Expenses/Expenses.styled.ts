import styled, { keyframes } from 'styled-components';
import { StyledTransactionsPage } from '@/components/TransactionsPage.styled';

const draw = keyframes`
  from { stroke-dasharray: 0 100; }
  to   { stroke-dasharray: 100 0; }
`;

const fadeOut = keyframes`
  to { opacity: 0; }
`;

export const StyledExpenses = styled(StyledTransactionsPage)`
  .scroll-area .expense-highlight {
    position: relative;
    border-radius: ${({ theme }) => theme.radius.surface};
  }

  .scroll-area .expense-highlight .jumpRing {
    position: absolute;
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    overflow: visible;
    pointer-events: none;
  }

  .scroll-area .expense-highlight .jumpRing rect {
    fill: none;
    stroke: #ffffff;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-dasharray: 0 100;
    animation:
      ${draw} 420ms cubic-bezier(0.25, 1, 0.5, 1) both,
      ${fadeOut} 400ms ease-out 1320ms both;
  }

  @media (prefers-reduced-motion: reduce) {
    .scroll-area .expense-highlight .jumpRing rect {
      stroke-dasharray: 100 0;
      animation: ${fadeOut} 500ms ease-out 1320ms both;
    }
  }
`;
