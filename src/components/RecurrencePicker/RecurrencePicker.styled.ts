import styled from 'styled-components';
import { StyledDateTimePicker } from '../DateTimePicker/DateTimePicker.styled';

export const StyledRecurrencePicker = styled.div`
  .main {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

/**
 * Same card the calendar drops down as, so the two buttons sitting next to each other in the footer
 * open into something the user recognises rather than two unrelated surfaces. The day grids below
 * reuse the budget calendar's circle-on-selection treatment for the same reason.
 */
export const StyledRecurrenceMenu = styled(StyledDateTimePicker)`
  width: 17em;
  max-height: 80dvh;
  overflow-y: auto;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    color: ${({ theme }) => theme.activeTabButtonTextColor};
  }

  .cycles {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0.4em;
  }

  .cycle {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.inactiveTabButtonTextColor};
    padding: 0px 0.7em;
    height: 2.2em;
    border: 1px solid ${({ theme }) => theme.lineColor};
    border-radius: 5px;
    cursor: pointer;
    white-space: nowrap;

    &.active {
      color: ${({ theme }) => theme.activeTabButtonTextColor};
      background-color: ${({ theme }) => theme.highlightColor};
    }
  }

  .sectionLabel {
    color: ${({ theme }) => theme.inactiveTabButtonTextColor};
    font-size: 0.8em;
  }

  .grid {
    display: flex;
    flex-direction: column;
    padding: 0.6rem 0.5rem;
    border-radius: 6px;
    gap: 8px;
    background-color: ${({ theme }) => theme.layer2};
  }

  .grid-row {
    display: flex;
  }

  .grid-cell {
    flex: 1;
    border-radius: 6px;
    padding: 0.1rem;
    text-align: center;
    position: relative;
    cursor: pointer;
    z-index: 0;
    font-size: 0.9em;

    &.selected {
      color: black;
      font-weight: bold;
    }

    &.selected:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 26px;
      height: 26px;
      background-color: ${({ theme }) => theme.whiteText};
      border-radius: 50%;
      z-index: -1;
    }

    &.empty {
      cursor: default;
    }
  }

  .timeRow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .time {
    cursor: pointer;
    color: ${({ theme }) => theme.activeTabButtonTextColor};
  }

  .timezone {
    color: ${({ theme }) => theme.inactiveTabButtonTextColor};
    font-size: 0.8em;
  }

  .time-picker {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 0.5em;
    height: 8em;
  }

  .footnote {
    color: ${({ theme }) => theme.inactiveTabButtonTextColor};
    font-size: 0.8em;
    text-align: center;
  }
`;
