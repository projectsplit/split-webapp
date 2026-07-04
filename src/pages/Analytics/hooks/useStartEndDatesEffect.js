import { useEffect } from 'react';
import { buildStartAndEndDates } from '../helpers/buildStartAndEndDates';
export const useStartAndEndDatesEffect = (selectedCycle, selectedTimeCycleIndex, selectedYear, allWeeksPerYear, startDate, endDate, timeZone) => {
    useEffect(() => {
        const startAndEndDates = buildStartAndEndDates(selectedCycle.value, selectedTimeCycleIndex.value, selectedYear.value, allWeeksPerYear, timeZone);
        startDate.value = startAndEndDates[0];
        endDate.value = startAndEndDates[1];
    }, [selectedTimeCycleIndex.value, selectedYear.value]);
};
