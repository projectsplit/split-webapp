import { Frequency } from '../../../types';
import { generateYearsArray } from './generateYearsArray';
export const isCurrentPeriod = (cycle, selectedTimeCycleIndex, isSuccess, cumulArrayData, currentWeekIndex, selectedYear) => {
    const currentYear = new Date().getFullYear();
    switch (cycle) {
        case Frequency.Monthly:
            return (selectedTimeCycleIndex === new Date().getMonth() &&
                isSuccess &&
                cumulArrayData?.length !== 0 &&
                currentYear === selectedYear);
        case Frequency.Weekly:
            return (selectedTimeCycleIndex === currentWeekIndex &&
                isSuccess &&
                cumulArrayData?.length !== 0);
        case Frequency.Annually:
            return (selectedTimeCycleIndex === generateYearsArray().indexOf(currentYear) &&
                isSuccess &&
                cumulArrayData?.length !== 0);
        default:
            return false;
    }
};
