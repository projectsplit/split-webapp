import { useMemo } from "react";
import { Signal } from "@preact/signals-react";
import {
  dateStringToMonthAndDay,
  findIndexForCurrentDate,
  generateAllWeeksPerYear,
  weeksToDateString,
} from "../../../helpers/weeklyDataHelpers";

export const useWeeklyDatesMemo = (
  selectedYear: Signal<number>
): [Date[][], string[][], string[][], number] => {
  return useMemo(() => {
    const currentDate = new Date();
    const allWeeksPerYear = generateAllWeeksPerYear(selectedYear.value);
    const wksToDateString = weeksToDateString(allWeeksPerYear);
    const monthsAndDaysArrays = dateStringToMonthAndDay(wksToDateString);
    const currentWeekIndex = findIndexForCurrentDate(
      generateAllWeeksPerYear(new Date().getFullYear()),
      new Date(currentDate.setHours(0, 0, 0, 0))
    );

    return [
      allWeeksPerYear,
      wksToDateString,
      monthsAndDaysArrays,
      currentWeekIndex,
    ];
  }, [selectedYear.value]);
};
