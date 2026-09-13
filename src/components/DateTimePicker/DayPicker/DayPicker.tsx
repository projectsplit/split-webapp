import { styled } from 'styled-components';
import { DateTime as LuxonDateTime } from 'luxon';
import { DayPickerProps } from '../../../interfaces';
import { insertDateMention } from '../../SearchTransactions/helpers/insertDateMention';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useBeautifulMentions } from 'lexical-beautiful-mentions';

const DayPicker = (props: DayPickerProps) => {
  const {
    selectedDateTime,
    setSelectedDateTime,
    timeZoneId,
    datePeriodClicked,
    calendarIsOpen,
    showOptions,
    withLexicalContext = false,
    category,
    isDateShowing,
  } = props;

  // useLexicalComposerContext throws outside a Lexical provider, so these cannot
  // be called unconditionally. withLexicalContext is fixed per call site and never
  // changes for a mounted instance, so hook order is stable.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [editor] = withLexicalContext ? useLexicalComposerContext() : [null];
  const { insertMention } = withLexicalContext
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useBeautifulMentions()
    : { insertMention: null };

  const selectedDt = LuxonDateTime.fromISO(selectedDateTime, {
    zone: timeZoneId,
  });

  const now = LuxonDateTime.now().setZone(timeZoneId);

  const { month, year } = selectedDt;

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  const getDayNames = (offset: number): string[] => {
    return Array.from({ length: 7 }, (_, i) => dayNames[(i + offset) % 7]);
  };

  const firstDayOfMonth = LuxonDateTime.fromObject(
    { year, month, day: 1 },
    { zone: timeZoneId }
  );

  const calendarStart = firstDayOfMonth.minus({
    days: firstDayOfMonth.weekday % 7,
  });

  const calendarGrid = Array.from({ length: 6 }, (_, i) =>
    Array.from({ length: 7 }, (_, j) => calendarStart.plus({ days: i * 7 + j }))
  );

  const onDayClick = (day: LuxonDateTime) => {
    setSelectedDateTime((prev) => {
      const oldDt = LuxonDateTime.fromISO(prev, { zone: timeZoneId });

      const newDt = day.set({
        hour: oldDt.hour,
        minute: oldDt.minute,
        second: oldDt.second,
      });

      return newDt.toISO()!;
    });

    if (
      withLexicalContext &&
      datePeriodClicked &&
      calendarIsOpen &&
      showOptions &&
      editor &&
      insertMention &&
      category
    ) {
      insertDateMention(
        day,
        datePeriodClicked,
        calendarIsOpen,
        showOptions,
        editor,
        insertMention,
        category
      );
    }
  };

  return (
    <StyledDayPicker>
      <div className="names-row">
        {getDayNames(0).map((n) => (
          <div key={n} className="day-name">
            {n}
          </div>
        ))}
      </div>

      <div
        className="month-grid"
        onClick={() => {
          if (isDateShowing) {
            isDateShowing.value = true;
          }
        }}
      >
        {calendarGrid.map((week, i) => (
          <div key={i} className="week-row">
            {week.map((day, j) => {
              const isInactive = day.month !== month;
              const isToday = day.hasSame(now, 'day');
              const isSelected =
                (isDateShowing ? isDateShowing.value : true) &&
                day.hasSame(selectedDt, 'day');

              return (
                <div
                  key={j}
                  className={`day${isInactive ? ' inactive' : ''}${
                    isToday ? ' today' : ''
                  }${isSelected ? ' selected' : ''}`}
                  onClick={() => onDayClick(day)}
                >
                  {day.day}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </StyledDayPicker>
  );
};

export default DayPicker;

const StyledDayPicker = styled.div`
  display: flex;
  flex-direction: column;
  cursor: default;

  .names-row {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    gap: 2px;

    .day-name {
      display: flex;
      align-items: center;
      justify-content: center;
      padding-bottom: 2px;
      font-size: ${({ theme }) => theme.size.s11};
      font-weight: ${({ theme }) => theme.weight.semibold};
      color: ${({ theme }) => theme.ink.tertiary};
    }
  }

  .month-grid {
    display: flex;
    flex-direction: column;
    gap: 2px;

    .week-row {
      display: grid;
      grid-template-columns: repeat(7, minmax(0, 1fr));
      gap: 2px;

      .day {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 38px;
        border-radius: ${({ theme }) => theme.radius.control};
        font-family: ${({ theme }) => theme.font.mono};
        font-size: ${({ theme }) => theme.size.s13};
        color: ${({ theme }) => theme.ink.primary};
        cursor: pointer;

        @media (hover: hover) {
          &:hover {
            background-color: ${({ theme }) => theme.surface.raised};
          }
        }
      }

      .inactive {
        color: ${({ theme }) => theme.ink.tertiary};
      }

      .today {
        box-shadow: ${({ theme }) => `inset 0 0 0 1px ${theme.surface.outline}`};
      }

      .selected,
      .selected:hover {
        background-color: ${({ theme }) => theme.ink.primary};
        color: ${({ theme }) => theme.surface.page};
        font-weight: ${({ theme }) => theme.weight.medium};
      }
    }
  }
`;
