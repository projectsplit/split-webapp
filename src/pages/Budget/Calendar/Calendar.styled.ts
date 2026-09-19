import styled from 'styled-components';
import { Frequency } from '../../../types';
import { Signal } from '@preact/signals-react';

interface StyledCalendarProps {
  $budgetFrequency: Signal<Frequency>;
}

export const StyledCalendar = styled.div<StyledCalendarProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) =>
    props.$budgetFrequency.value === Frequency.Monthly ? 'column' : 'row'};
  gap: 2px;
  padding: ${({ theme }) => theme.space.s12};
  background-color: ${({ theme }) => theme.surface.card};
  border: 1px solid ${({ theme }) => theme.surface.hairline};
  border-radius: ${({ theme }) => theme.radius.surface};
  overflow-wrap: break-word;

  .calendar-row {
    display: flex;
    gap: 2px;
  }

  .calendar-day {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    height: 34px;
    border-radius: ${({ theme }) => theme.radius.control};
    font-family: ${({ theme }) => theme.font.mono};
    font-size: ${({ theme }) => theme.size.s13};
    color: ${({ theme }) => theme.ink.primary};
    text-align: center;

    &.selected {
      background-color: ${({ theme }) => theme.ink.primary};
      color: ${({ theme }) => theme.surface.page};
      font-weight: ${({ theme }) => theme.weight.medium};
    }
  }
`;
