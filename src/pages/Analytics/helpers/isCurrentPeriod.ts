import { Frequency } from "../../../types";
import { generateYearsArray } from "./generateYearsArray";

export const isCurrentPeriod = (
    cycle: Frequency,
    selectedTimeCycleIndex: number,
    isSuccess: boolean,
    cumulArrayData: number[],
    currentWeekIndex: number) => {

    switch (cycle) {
        case Frequency.Monthly:
            return selectedTimeCycleIndex === new Date().getMonth() && isSuccess && cumulArrayData?.length !== 0

        case Frequency.Weekly:
            return selectedTimeCycleIndex === currentWeekIndex && isSuccess && cumulArrayData?.length !== 0

        case Frequency.Annually:
            const currentYear = new Date().getFullYear()
            return selectedTimeCycleIndex === generateYearsArray().indexOf(currentYear) && isSuccess && cumulArrayData?.length !== 0

        default:
            return false;
    }
}