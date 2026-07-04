import { Frequency } from '@/types';
export const calendarTypeHandlerFn = (frequency, calendarDay, budgetFrequency, startDate, endDate, openCustomDateCalendar, pickingTarget, hasSwitchedBudgetType, queryClient, isStale) => {
    if (calendarDay.value !== '' && frequency === budgetFrequency.value) {
        budgetFrequency.value = frequency;
    }
    else {
        budgetFrequency.value = frequency;
        calendarDay.value = '';
    }
    if (frequency === Frequency.Custom) {
        if (startDate.value === '' && endDate.value === '') {
            openCustomDateCalendar.value = true;
            pickingTarget.value = 'start';
        }
        if (startDate.value !== '' &&
            endDate.value === '' &&
            openCustomDateCalendar.value === false) {
            openCustomDateCalendar.value = true;
            pickingTarget.value = 'end';
        }
    }
    else {
        openCustomDateCalendar.value = false;
        startDate.value = '';
        endDate.value = '';
    }
    if (!hasSwitchedBudgetType.value || isStale) {
        queryClient.invalidateQueries({ queryKey: ['budget'], exact: false });
    }
    if (!hasSwitchedBudgetType.value) {
        //setHasSwitchedBudgetType(true);
        hasSwitchedBudgetType.value = true;
    }
};
