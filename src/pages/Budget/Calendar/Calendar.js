import { jsx as _jsx } from "react/jsx-runtime";
import { StyledCalendar } from './Calendar.styled';
import { Frequency } from '../../../types';
export default function Calendar({ children, budgetFrequency, calendarDay, setError, }) {
    const handleElementClick = (day) => {
        setError('spendingCycleError', '');
        setError('showSpendingCycleError', false);
        setError('commencementDayError', '');
        setError('showCommencementDayError', false);
        calendarDay.value = day;
    };
    return (_jsx(StyledCalendar, { as: "div", "$budgetFrequency": budgetFrequency, children: budgetFrequency.value == Frequency.Monthly
            ? children.map((row, rowIndex) => (_jsx("div", { className: "calendar-row", children: row.map((day, dayIndex) => (_jsx("div", { className: `calendar-day ${String(day) === calendarDay.value && day !== '' ? 'selected' : ''}`, style: { cursor: day !== '' ? 'pointer' : 'default' }, onClick: () => handleElementClick(String(day)), children: day }, String(day) + dayIndex))) }, rowIndex)))
            : children.map((day, dayIndex) => (_jsx("div", { className: `calendar-day ${String(day) === calendarDay.value && day !== '' ? 'selected' : ''}`, style: { cursor: day !== '' ? 'pointer' : 'default' }, onClick: () => handleElementClick(String(day)), children: day }, String(day) + dayIndex))) }));
}
