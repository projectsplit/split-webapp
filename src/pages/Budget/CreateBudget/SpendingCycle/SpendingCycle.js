import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useRef } from 'react';
import { StyledSpendingCycle } from './SpendingCycle.styled';
import IonIcon from '@reacticons/ionicons';
import CalendarOptionsButton from '../../CalendarOptionButton/CalendarOptionsButton';
import Calendar from '../../Calendar/Calendar';
import { Frequency } from '../../../../types';
import { useQueryClient } from '@tanstack/react-query';
import { CalendarAndErrorsWrapper } from './CalendarAndErrorsWrapper.tsx/CalendarAndErrorsWrapper';
import { calendarTypeHandlerFn } from './helpers/calendarTypeHandlerFn';
import BottomDatePicker from '../../BottomDatePicker/BottomDatePicker';
export default function SpendingCycle({ calendarDay, budgetFrequency, menu, isStale, openCalendar, hasSwitchedBudgetType, timeZoneId, openCustomDateCalendar, startDate, endDate, pickingTarget, setError, $inputError, }) {
    const queryClient = useQueryClient();
    const daysArray = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const customButtonRef = useRef(null);
    const selectorRef = useRef(null);
    const monthDaysArray = Array.from({ length: 5 }, (_, weekIndex) => weekIndex < 4
        ? Array.from({ length: 7 }, (_, dayIndex) => weekIndex * 7 + dayIndex + 1)
        : [29, 30, 31, '', '', '', '']);
    const calendarTypeHandler = (frequency) => {
        calendarTypeHandlerFn(frequency, calendarDay, budgetFrequency, startDate, endDate, openCustomDateCalendar, pickingTarget, hasSwitchedBudgetType, queryClient, isStale);
    };
    React.useEffect(() => {
        if (budgetFrequency.value === Frequency.Custom &&
            startDate.value !== '' &&
            endDate.value === '' &&
            !openCustomDateCalendar.value) {
            openCustomDateCalendar.value = true;
            pickingTarget.value = 'end';
        }
    }, [startDate.value]);
    return (_jsxs(StyledSpendingCycle, { "$calendarIsOpen": openCalendar.value, children: [_jsxs("div", { className: "spendingCycleHeader", children: [_jsx("div", { className: "prompt", children: "Spending cycle" }), _jsx(IonIcon, { onClick: () => (menu.value = 'infoBox'), name: "information-circle-outline", className: "information" })] }), _jsx(CalendarAndErrorsWrapper, { openCalendar: openCalendar, budgetFrequency: budgetFrequency, calendarDay: calendarDay, startDate: startDate, endDate: endDate, openCustomDateCalendar: openCustomDateCalendar, pickingTarget: pickingTarget, selectorRef: selectorRef, "$inputError": $inputError }), _jsx("div", { className: "categoryButtons", children: openCalendar.value && (_jsxs(_Fragment, { children: [_jsx(CalendarOptionsButton, { onClick: () => {
                                calendarTypeHandler(Frequency.Monthly);
                            }, isactive: budgetFrequency.value === Frequency.Monthly, children: "Monthly" }), _jsx(CalendarOptionsButton, { onClick: () => {
                                calendarTypeHandler(Frequency.Weekly);
                            }, isactive: budgetFrequency.value === Frequency.Weekly, children: "Weekly" }), _jsx(CalendarOptionsButton, { ref: customButtonRef, onClick: () => {
                                calendarTypeHandler(Frequency.Custom);
                            }, isactive: budgetFrequency.value === Frequency.Custom, children: "Custom" })] })) }), openCalendar.value && budgetFrequency.value !== Frequency.Custom && (_jsx(Calendar
            // setCalendarDay={setCalendarDay}
            , { 
                // setCalendarDay={setCalendarDay}
                budgetFrequency: budgetFrequency, calendarDay: calendarDay, setError: setError, children: budgetFrequency.value === Frequency.Monthly
                    ? monthDaysArray
                    : daysArray })), openCustomDateCalendar.value &&
                budgetFrequency.value === Frequency.Custom && (_jsx(BottomDatePicker, { isOpen: openCustomDateCalendar, pickingTarget: pickingTarget, startDate: startDate, endDate: endDate, timeZoneId: timeZoneId, datePeriodClicked: calendarDay, setError: setError }))] }));
}
