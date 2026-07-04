// useCycleEffect.js
import { useEffect } from 'react';
import { Frequency } from '../../../types';
import { generateYearsArray } from '../helpers/generateYearsArray';
export const useCycleIndexEffect = (selectedCycle, selectedTimeCycleIndex, currentWeekIndex, selectedYear) => {
    useEffect(() => {
        if (selectedCycle.value === Frequency.Monthly)
            selectedTimeCycleIndex.value = new Date().getMonth();
        if (selectedCycle.value === Frequency.Weekly)
            selectedTimeCycleIndex.value = currentWeekIndex;
        if (selectedCycle.value === Frequency.Annually)
            selectedTimeCycleIndex.value = generateYearsArray().indexOf(selectedYear);
    }, [selectedCycle.value, selectedYear]);
};
