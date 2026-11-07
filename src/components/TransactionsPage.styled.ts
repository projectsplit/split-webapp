import styled, { keyframes } from 'styled-components';

const draw = keyframes`
  from { stroke-dasharray: 0 100; }
  to   { stroke-dasharray: 100 0; }
`;

const fadeOut = keyframes`
  to { opacity: 0; }
`;

export const StyledTransactionsPage = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  flex: 1;

  .scroll-area {
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding-bottom: 100px;
  }

  .offlineNote {
    padding: ${({ theme }) => `${theme.space.s24} ${theme.space.s20}`};
    font-size: ${({ theme }) => theme.size.s13};
    line-height: 1.6;
    text-align: center;
    color: ${({ theme }) => theme.ink.secondary};
  }

  .same-date-container {
    display: flex;
    flex-direction: column;
    width: 100%;

    .date-only {
      position: sticky;
      top: 0;
      z-index: 1;
      background-color: ${({ theme }) => theme.surface.page};
      padding: ${({ theme }) =>
        `${theme.space.s16} ${theme.space.s20} ${theme.space.s6}`};
      font-size: ${({ theme }) => theme.size.s11};
      font-weight: ${({ theme }) => theme.weight.semibold};
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: ${({ theme }) => theme.ink.tertiary};
    }

    .rows {
      display: flex;
      flex-direction: column;
      gap: ${({ theme }) => theme.space.s8};
      padding: ${({ theme }) => `0 ${theme.space.s20}`};
    }
  }

  /* The row a jump link (?jumpTo=) opened the list on: a ring is drawn round it, then fades. */
  .scroll-area .jump-highlight {
    position: relative;
    border-radius: ${({ theme }) => theme.radius.surface};
  }

  .scroll-area .jump-highlight .jumpRing {
    position: absolute;
    top: 1px;
    left: 1px;
    width: calc(100% - 2px);
    height: calc(100% - 2px);
    overflow: visible;
    pointer-events: none;
  }

  .scroll-area .jump-highlight .jumpRing rect {
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
    .scroll-area .jump-highlight .jumpRing rect {
      stroke-dasharray: 100 0;
      animation: ${fadeOut} 500ms ease-out 1320ms both;
    }
  }
`;
