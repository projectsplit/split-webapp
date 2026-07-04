import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from 'styled-components';
import { DateTime as LuxonDateTime } from 'luxon';
import { insertDateMention } from '../../SearchTransactions/helpers/insertDateMention';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useBeautifulMentions } from 'lexical-beautiful-mentions';
const DayPicker = (props) => {
    const { selectedDateTime, setSelectedDateTime, timeZoneId, datePeriodClicked, calendarIsOpen, showOptions, withLexicalContext = false, category, isDateShowing, } = props;
    const [editor] = withLexicalContext ? useLexicalComposerContext() : [null];
    const { insertMention } = withLexicalContext
        ? useBeautifulMentions()
        : { insertMention: null };
    const selectedDt = LuxonDateTime.fromISO(selectedDateTime, {
        zone: timeZoneId,
    });
    const now = LuxonDateTime.now().setZone(timeZoneId);
    const { month, year } = selectedDt;
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const getDayNames = (offset) => {
        return Array.from({ length: 7 }, (_, i) => dayNames[(i + offset) % 7]);
    };
    const firstDayOfMonth = LuxonDateTime.fromObject({ year, month, day: 1 }, { zone: timeZoneId });
    const calendarStart = firstDayOfMonth.minus({
        days: firstDayOfMonth.weekday % 7,
    });
    const calendarGrid = Array.from({ length: 6 }, (_, i) => Array.from({ length: 7 }, (_, j) => calendarStart.plus({ days: i * 7 + j })));
    const onDayClick = (day) => {
        setSelectedDateTime((prev) => {
            const oldDt = LuxonDateTime.fromISO(prev, { zone: timeZoneId });
            const newDt = day.set({
                hour: oldDt.hour,
                minute: oldDt.minute,
                second: oldDt.second,
            });
            return newDt.toISO();
        });
        if (withLexicalContext &&
            datePeriodClicked &&
            calendarIsOpen &&
            showOptions &&
            editor &&
            insertMention &&
            category) {
            insertDateMention(day, datePeriodClicked, calendarIsOpen, showOptions, editor, insertMention, category);
        }
    };
    return (_jsxs(StyledDayPicker, { children: [_jsx("div", { className: "names-row", children: getDayNames(0).map((n) => (_jsx("div", { className: "day-name", children: n }, n))) }), _jsx("div", { className: "month-grid", onClick: () => {
                    if (isDateShowing) {
                        isDateShowing.value = true;
                    }
                }, children: calendarGrid.map((week, i) => (_jsx("div", { className: "week-row", children: week.map((day, j) => {
                        const isInactive = day.month !== month;
                        const isToday = day.hasSame(now, 'day');
                        const isSelected = day.hasSame(selectedDt, 'day');
                        return (_jsx("div", { className: `day${isInactive ? ' inactive' : ''}${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}`, onClick: () => onDayClick(day), children: day.day }, j));
                    }) }, i))) })] }));
};
export default DayPicker;
const StyledDayPicker = styled.div `
  display: flex;
  flex-direction: column;
  cursor: default;

  .names-row {
    display: flex;
    /* width: max-content; */
    gap: 0.3em;

    .day-name {
      color: #88888b;
      display: flex;
      gap: 0.3em;
      flex-shrink: 0;
      justify-content: center;
      align-items: center;
      width: 2em;
      height: 2em;
    }
  }

  .month-grid {
    display: flex;
    flex-direction: column;
    gap: 0.3em;

    .week-row {
      display: flex;
      gap: 0.3em;

      .inactive {
        color: #555558;
      }

      .day {
        display: flex;
        /* flex-shrink: 0; */
        justify-content: center;
        align-items: center;
        width: 2em;
        height: 2em;
        border-radius: 4px;
        cursor: pointer;

        @media (hover: hover) {
          &:hover {
            background-color: #34383c;
          }
        }
      }

      .selected {
        background-color: ${({ theme }) => theme.highlightColor};

        &:hover {
          background-color: ${({ theme }) => theme.highlightColor};
        }
      }

      .today {
        border: 1px solid #34383c;
      }
    }
  }
`;
