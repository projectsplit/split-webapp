import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { StyledCalendarAndErrorsWrapper } from './CalendarAndErrorsWrapper.styled';
import { Frequency } from '@/types';
import { getOrdinalSuffix } from '@/helpers/getOrdinalSuffix';
import SpendingCycleSelector from '@/pages/Budget/SpendingCycleSelector/SpendingCycleSelector';
import { getWeekday } from '@/helpers/getWeekDay';
export const CalendarAndErrorsWrapper = ({ openCalendar, budgetFrequency, calendarDay, startDate, endDate, openCustomDateCalendar, pickingTarget, selectorRef, $inputError, }) => {
    const formatDate = (date) => {
        if (!date)
            return '';
        return new Date(date).toLocaleDateString();
    };
    const getDayNumber = (day) => {
        const index = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].indexOf(day);
        if (index !== -1)
            return (index + 1).toString();
        return null;
    };
    return (_jsx(StyledCalendarAndErrorsWrapper, { "$inputError": $inputError, children: _jsx(SpendingCycleSelector, { ref: selectorRef, onClick: () => {
                openCalendar.value = !openCalendar.value;
            }, open: openCalendar.value, children: budgetFrequency.value === Frequency.Custom ? (!startDate.value ? (_jsx("div", { className: "prompt", onClick: (e) => {
                    e.stopPropagation();
                    pickingTarget.value = 'start';
                    openCustomDateCalendar.value = true;
                }, children: "select start date" })) : !endDate.value ? (_jsxs("div", { className: "customPropmtPills", children: [_jsx("div", { className: "pill", onClick: (e) => {
                            e.stopPropagation();
                            pickingTarget.value = 'start';
                            openCustomDateCalendar.value = true;
                        }, children: _jsx("span", { className: "date", children: formatDate(startDate.value) }) }), ' ', "-", ' ', _jsx("div", { className: "prompt", onClick: (e) => {
                            e.stopPropagation();
                            pickingTarget.value = 'end';
                            openCustomDateCalendar.value = true;
                        }, children: "select end date" })] })) : (_jsxs("div", { className: "customPropmtPills", children: [_jsx("div", { className: "pill", onClick: (e) => {
                            e.stopPropagation();
                            pickingTarget.value = 'start';
                            openCustomDateCalendar.value = true;
                        }, children: _jsx("span", { className: "date", children: formatDate(startDate.value) }) }), ' ', "-", ' ', _jsx("div", { className: "pill", onClick: (e) => {
                            e.stopPropagation();
                            pickingTarget.value = 'end';
                            openCustomDateCalendar.value = true;
                        }, children: _jsx("span", { className: "date", children: formatDate(endDate.value) }) })] }))) : calendarDay.value === '' ? (budgetFrequency.value === Frequency.Monthly ? ('Monthly') : ('Weekly')) : budgetFrequency.value === Frequency.Monthly ? (_jsxs("div", { className: "monthlyPropmt", children: ["Monthly on the ", calendarDay.value, ' ', _jsx("sup", { className: "sup", children: getOrdinalSuffix(calendarDay.value) })] })) : (_jsxs(_Fragment, { children: ["Weekly on ", getWeekday(getDayNumber(calendarDay.value))] })) }) }));
};
