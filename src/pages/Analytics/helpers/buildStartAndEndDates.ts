import { Frequency } from "../../../types";
import { formatDateIntoYMD } from "./formatDateIntoYMD";
import { getAllDaysInMonth } from "../../../helpers/monthlyDataHelpers";
import { getWeekDates } from "./weeklyDataHelpers"

export const buildStartAndEndDates = (
  cycle: Frequency,
  selectedTimeCycleIndex: number,
  selectedYear: number,
  allWeeksPerYear: Date[][]
) => {
  let startDate: string;
  let endDate: string

  switch (cycle) {
    case Frequency.Monthly:
      const allDaysInMonth = getAllDaysInMonth(
        selectedTimeCycleIndex + 1,
        selectedYear
      );

      startDate = formatDateIntoYMD(allDaysInMonth[0])
      endDate = formatDateIntoYMD(allDaysInMonth[allDaysInMonth.length - 1]);
      return [startDate, endDate]

    case Frequency.Weekly:

      startDate = formatDateIntoYMD(getDateFromWeeksArray(allWeeksPerYear, selectedTimeCycleIndex, 0))
      endDate = formatDateIntoYMD(getDateFromWeeksArray(allWeeksPerYear, selectedTimeCycleIndex, 1))
      return [startDate, endDate]

    case Frequency.Annually:
      const startWeekIndex = getWeekDates(selectedYear, 0).length === 0 ? 1 : 0
      const endWeekIndex = getWeekDates(selectedYear, 0).length === 0 ? 53 : 52
      startDate = formatDateIntoYMD(new Date(getWeekDates(selectedYear, startWeekIndex)[0]))
      endDate = formatDateIntoYMD(new Date(getWeekDates(selectedYear, endWeekIndex)[getWeekDates(selectedYear, endWeekIndex).length - 1]))
      return [startDate, endDate]

    default:
      return "";
  }
};

const getDateFromWeeksArray = (allWeeksPerYear: Date[][], selectedTimeCycleIndex: number, index: number) => {
  if (allWeeksPerYear[selectedTimeCycleIndex] != undefined) {
    if (index === 0) {
      return allWeeksPerYear[selectedTimeCycleIndex][index]
    } else {
      index = allWeeksPerYear[selectedTimeCycleIndex].length - 1
      return allWeeksPerYear[selectedTimeCycleIndex][index]
    }
  }
  return new Date()
};

