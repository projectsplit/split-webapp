import { styled } from 'styled-components';

export const StyledAnalytics = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.ink.primary};
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: ${({ theme }) => `0 ${theme.space.s20}`};
  gap: 15px;
  position: relative;
  overflow: hidden;
  background-color: ${({ theme }) => theme.surface.page};

  & > * {
    flex-shrink: 0;
  }

  .scrollArea {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s20};
    padding-bottom: 32px;

    /* the scroller is also the column: without this the rows shrink to fit
       instead of overflowing, so there is nothing to scroll to */
    & > * {
      flex-shrink: 0;
    }
  }

  .buttonChart {
    font-size: ${({ theme }) => theme.icon.md};
  }

  .dateOptions {
    display: flex;
    flex-direction: row;
    gap: ${({ theme }) => theme.space.s8};
    align-items: center;

    .height {
      display: none;
    }
  }

  .charts {
    .chartWrapper {
      display: flex;
      flex-direction: column;

      .chart {
        width: 600px;
        align-self: center;
      }
    }
  }

  .calendar {
    font-size: ${({ theme }) => theme.icon.lg};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .dashed {
    width: 40px;
    fill: ${({ theme }) => theme.accent.you.ink};
  }

  .spinner {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .headline {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s12};
  }

  .headlineSide {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.s6};
  }

  .headlineSide.right {
    align-items: flex-end;
  }

  .headlineFigure {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.figure.page};
    font-weight: ${({ theme }) => theme.weight.medium};
    letter-spacing: -0.02em;
    color: ${({ theme }) => theme.accent.you.ink};
  }

  .headlineForecast {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s16};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.secondary};
  }

  .monoValue {
    font-family: ${({ theme }) => theme.font.mono};
  }

  .monoValue.up {
    color: ${({ theme }) => theme.direction.owe};
  }

  .monoValue.down {
    color: ${({ theme }) => theme.direction.owed};
  }

  .dot {
    color: ${({ theme }) => theme.surface.dot};
  }

`;
