import { useMemo } from 'react';
import { dateStringToMonthAndDay, findIndexForCurrentDate, generateAllWeeksPerYear, weeksToDateString, } from '../../../helpers/weeklyDataHelpers';
export const useWeeklyDatesMemo = (selectedYear) => {
    return useMemo(() => {
        const currentDate = new Date();
        const allWeeksPerYear = generateAllWeeksPerYear(selectedYear.value);
        const wksToDateString = weeksToDateString(allWeeksPerYear);
        const monthsAndDaysArrays = dateStringToMonthAndDay(wksToDateString);
        const currentWeekIndex = findIndexForCurrentDate(generateAllWeeksPerYear(new Date().getFullYear()), new Date(currentDate.setHours(0, 0, 0, 0)));
        return [
            allWeeksPerYear,
            wksToDateString,
            monthsAndDaysArrays,
            currentWeekIndex,
        ];
    }, [selectedYear.value]);
};
