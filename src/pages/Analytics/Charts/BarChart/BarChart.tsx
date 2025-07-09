import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { StyledBarChart } from "./BarChart.styled";
import Carousel from "../../Carousel/Carousel";
import { getCarouselItemsBasedOnCycle } from "../../helpers/getCarouselItemsBasedOnCycle";

import {  getAllDaysInMonth } from "../../../../helpers/monthlyDataHelpers";
import { createGroupedLabels } from "../../helpers/createGroupedLabels";
import { getChartOptions } from "./options/getChartOptions";
import { groupExpensesPerWeek } from "../../helpers/groupExpensesPerWeek";
import { useStartAndEndDatesEffect } from "../../hooks/useStartEndDatesEffect";
import { noData } from "../plugins/noData";
import { Frequency } from "../../../../types";
import { deCumulArray } from "../../helpers/deCumulArray";
import { horizontalLine } from "../plugins/horizontalLine";
import { months, shortWeekdays } from "../../../../constants";
import { useCumulativeSpendingArray } from "../../../../api/services/useCumulativeSpendingArray";
import { BarChartProps } from "../../../../interfaces";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function BarChart({
  selectedCycle,
  selectedYear,
  monthsAndDaysArrays,
  cyclehaschanged,
  allWeeksPerYear,
  menu,
  selectedTimeCycleIndex,
  startDate,
  endDate,
  currency
}: BarChartProps) {


  // const { data: cumulArrayData, isSuccess } = useCumulativeSpendingArray(
  //   startDate.value,
  //   endDate.value,
  //   currency
  // );
  const isSuccess=true;
  const cumulArrayData = [
    1, 12, 15, 16, 56, 69, 100, 102, 120, 130, 150, 180, 190, 200, 210.36, 222,222,222,222,222,222,222,222,222,222,230,250,260
  ];
  const expenseDataPoints = deCumulArray(cumulArrayData); //getRandomNumbers(31, -500, 1000); // This is supposed to be the total amount spent per calendar day

  const allDaysInMonth = getAllDaysInMonth(
    selectedTimeCycleIndex.value + 1,
    selectedYear.value
  );

  const datesToNumbers = allDaysInMonth.map((day) => day.getDate());

  const labelBuilder = (cycle: Frequency) => {
    switch (cycle) {
      case Frequency.Monthly:
        return createGroupedLabels(datesToNumbers);
      case Frequency.Weekly:
        return shortWeekdays;
      case Frequency.Annually:
        return months.map(m=>m.slice(0,3))
      default:
        return [];
    }
  };

  const labels = labelBuilder(selectedCycle.value);

  //useCycleIndexEffect(selectedCycle, selectedTimeCycleIndex, currentWeekIndex,selectedYear.value);

  useStartAndEndDatesEffect(
    selectedCycle,
    selectedTimeCycleIndex,
    selectedYear,
    allWeeksPerYear,
    startDate,
    endDate
  );

  const options = getChartOptions(
    isSuccess,
    monthsAndDaysArrays,
    selectedCycle.value,
    labels,
    selectedYear.value,
    selectedTimeCycleIndex.value,
    currency
  );


  const expenseDataGrouping = (cycle: Frequency,expenseDataPoints: number[]) => {
    switch (cycle) {
      case Frequency.Monthly:
        return groupExpensesPerWeek(expenseDataPoints);
      case Frequency.Weekly:
        return expenseDataPoints;
      case Frequency.Annually:
        return expenseDataPoints;
      default:
        return [];
    }
  };

  const expenseData = expenseDataGrouping(selectedCycle.value,expenseDataPoints);
  
  const data = {
    labels: labels,
    datasets: [
      {
        label: "cumulative spending",
        data: expenseData,
        backgroundColor: "rgba(153, 30, 251, 0.5)",
        borderWidth: 2
      },
    ],
  } as any;


  return (
    <StyledBarChart>
      <Bar options={options} data={data} plugins={[noData, ChartDataLabels,horizontalLine]} />
      <div className="periodOptions">
        <Carousel
          carouselItems={getCarouselItemsBasedOnCycle(
            selectedCycle.value,
            months,
            monthsAndDaysArrays
          )}
          selectedTimeCycleIndex={selectedTimeCycleIndex}
          selectedCycle={selectedCycle}
          cyclehaschanged={cyclehaschanged}
          menu={menu}
          selectedYear={selectedYear}
        />
      </div>
    </StyledBarChart>
  );
}
