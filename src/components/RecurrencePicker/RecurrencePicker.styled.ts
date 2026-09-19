import styled from 'styled-components';
import { StyledDateTimePicker } from '../DateTimePicker/DateTimePicker.styled';

export const StyledRecurrencePicker = styled.div`
  .main {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`;

export const StyledRecurrenceBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 4;
  background-color: ${({ theme }) => theme.scrim.sheet};
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
`;

export const StyledRecurrenceMenu = styled(StyledDateTimePicker)`
  max-height: 80dvh;
  overflow-y: auto;

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: -0.01em;
    color: ${({ theme }) => theme.ink.primary};
  }

  .cycles {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.space.s6};
  }

  .cycle {
    box-sizing: border-box;
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    padding: ${({ theme }) => `0 ${theme.space.s12}`};
    background-color: ${({ theme }) => theme.surface.page};
    border: 1px solid ${({ theme }) => theme.surface.hairline};
    border-radius: ${({ theme }) => theme.radius.control};
    color: ${({ theme }) => theme.ink.secondary};
    font-size: ${({ theme }) => theme.size.s13};
    font-weight: ${({ theme }) => theme.weight.medium};
    white-space: nowrap;
    cursor: pointer;

    &.active {
      background-color: ${({ theme }) => theme.surface.raised};
      border-color: ${({ theme }) => theme.surface.outline};
      color: ${({ theme }) => theme.ink.primary};
      font-weight: ${({ theme }) => theme.weight.semibold};
    }
  }

  .sectionLabel {
    font-size: ${({ theme }) => theme.size.s11};
    font-weight: ${({ theme }) => theme.weight.semibold};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .grid {
    display: flex;
    flex-direction: column;
    padding: ${({ theme }) => theme.space.s8};
    border-radius: ${({ theme }) => theme.radius.control};
    gap: ${({ theme }) => theme.space.s4};
    background-color: ${({ theme }) => theme.surface.page};
  }

  .grid-row {
    display: flex;
    gap: ${({ theme }) => theme.space.s2};
  }

  .grid-cell {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    border-radius: ${({ theme }) => theme.radius.control};
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.primary};
    cursor: pointer;

    &.selected {
      background-color: ${({ theme }) => theme.ink.primary};
      color: ${({ theme }) => theme.surface.page};
      font-weight: ${({ theme }) => theme.weight.medium};
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
    gap: ${({ theme }) => theme.space.s10};
  }

  .time {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s15};
    font-weight: ${({ theme }) => theme.weight.medium};
    color: ${({ theme }) => theme.ink.primary};
    cursor: pointer;
  }

  .timezone {
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s12};
    color: ${({ theme }) => theme.ink.tertiary};
  }

  .time-picker {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: ${({ theme }) => theme.space.s8};
    height: 8em;
    position: static;
    padding: 0;
  }

  .footnote {
    font-size: ${({ theme }) => theme.size.s12};
    line-height: 1.5;
    color: ${({ theme }) => theme.ink.tertiary};
    text-align: center;
    text-wrap: pretty;
  }
`;
