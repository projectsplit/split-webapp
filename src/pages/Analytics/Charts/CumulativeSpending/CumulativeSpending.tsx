import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { StyledCumulativeSpending } from "./CumulativeSpending.styled";
import Carousel from "../../Carousel/Carousel";
import { CumulativeSpendingProps } from "../../../../interfaces";
import { noData } from "../plugins/noData";
import { getAllDaysInMonth } from "../../../../helpers/monthlyDataHelpers";
import { getCarouselItemsBasedOnCycle } from "../../helpers/getCarouselItemsBasedOnCycle";
import { getChartOptions } from "./options/getChartOptions";
import { getData } from "./data/getData";
import { buildLabels } from "../../helpers/buildLabels";
import { useStartAndEndDatesEffect } from "../../hooks/useStartEndDatesEffect";
import { Frequency } from "../../../../types";
import { deCumulArray } from "../../helpers/deCumulArray";
import { enhanceNumberArray } from "../../../../helpers/enhanceNumberArray";
import { isCurrentPeriod } from "../../helpers/isCurrentPeriod";
import { useCumulativeSpendingArray } from "../../../../api/services/useCumulativeSpendingArray";
import { months } from "../../../../constants";
import { significantDigitsFromTicker } from "../../../../helpers/openExchangeRates";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export function CumulativeSpending({
  selectedCycle,
  selectedYear,
  currentWeekIndex,
  monthsAndDaysArrays,
  cyclehaschanged,
  allWeeksPerYear,
  menu,
  selectedTimeCycleIndex,
  startDate,
  endDate,
  currency,
}: CumulativeSpendingProps) {
  const fractalFactor = 1;

  useStartAndEndDatesEffect(
    selectedCycle,
    selectedTimeCycleIndex,
    selectedYear,
    allWeeksPerYear,
    startDate,
    endDate
  );

  const allDaysInMonth = getAllDaysInMonth(
    selectedTimeCycleIndex.value + 1,
    selectedYear.value
  );

  const enhancedDatesToNumbers = enhanceNumberArray(
    allDaysInMonth.map((date) => date.getDate()),
    fractalFactor
  );

  const labels = buildLabels(
    selectedCycle.value,
    selectedTimeCycleIndex.value,
    enhancedDatesToNumbers,
    monthsAndDaysArrays,
    fractalFactor
  );

  // const { data: cumulArrayData, isSuccess } = useCumulativeSpendingArray(
  //   startDate.value,
  //   endDate.value,
  //   currency
  // );

  const projectionArray = (
    cumulArrayData: number[] | undefined,
    cycle: Frequency,
    currency:string
  ) => {
    if (cumulArrayData === undefined) return [];
    if (cumulArrayData.length === 0) return [];

    const enhancedCumulArray = [...cumulArrayData];
    let upLimit = 0;
    //const now = new Date();
    if (cycle === Frequency.Monthly)
      upLimit = getAllDaysInMonth(
        selectedTimeCycleIndex.value + 1,
        selectedYear.value
      ).length;
    if (cycle === Frequency.Weekly) upLimit = 7;
    if (cycle === Frequency.Annually) upLimit = 12;

    let enhancedCumulArrayLength = enhancedCumulArray?.length;

    while (enhancedCumulArrayLength < upLimit - 1) {
      enhancedCumulArray.push(NaN);
      enhancedCumulArrayLength = enhancedCumulArray?.length;
    }
    const forecastValue = calculateForcastValue(cumulArrayData, upLimit,currency);

    enhancedCumulArray.push(forecastValue);
    const enhancedCumulArrayWithMidPoints = enhanceNumberArray(
      enhancedCumulArray,
      1
    );

    const hasNaN = enhancedCumulArrayWithMidPoints.some(Number.isNaN);
    if (!hasNaN)
      enhancedCumulArrayWithMidPoints[
        enhancedCumulArrayWithMidPoints.length - 2
      ] = NaN;

    return enhancedCumulArrayWithMidPoints;
  };

  const calculateForcastValue = (
    cumulArrayData: number[] | undefined,
    upLimit: number,
    currency:string
  ) => {
    const spendingArray = deCumulArray(cumulArrayData);
    const total = spendingArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const average = total / spendingArray.length;
    const forecastValue = average * upLimit;
    
    return Number(forecastValue.toFixed(significantDigitsFromTicker(currency)));
  };

  const findLastNumberBeforeNaN = (arr: any) => {
    let lastIndex = -1;
    for (let [index, num] of arr.entries()) {
      if (isNaN(num)) {
        return lastIndex;
      }
      lastIndex = index;
    }
  };

  const isSuccess = true;
  // const cumulArrayData = [30, 30, 30, 33, 34,]
  const cumulArrayData = [
    1, 12, 15, 16, 56, 69, 100, 102, 120, 130, 150, 180, 190, 200, 210.36, 222,222,222,222,222,222,222,222,222,222,230,250,260
  ];
  const expensePoints = cumulArrayData === undefined ? [] : cumulArrayData;
  const projectedArray = projectionArray(cumulArrayData, selectedCycle.value,currency);

  const lastNumberBeforeNaN = findLastNumberBeforeNaN(projectedArray);

  const pointRadius: number[] = [];
  const pointBackgroundColor: string[] = [];

  const pointRadiusProjection: number[] = [];
  const pointBackgroundColorProjection: string[] = [];
  const hitRadius: number[] = [];

  projectedArray.map((dp, indx) => {
    if (
      indx === 0 ||
      indx === projectedArray.length - 1 ||
      (enhancedDatesToNumbers[indx] === 15 &&
        !isCurrentPeriod(
          selectedCycle.value,
          selectedTimeCycleIndex.value,
          isSuccess,
          expensePoints,
          currentWeekIndex
        )) || //does not affect annual or weekly as they are 12 and 7 rsptctvly
      indx === lastNumberBeforeNaN
    ) {
      pointRadiusProjection.push(2);
      pointBackgroundColorProjection.push("#A12BFF");
    } else {
      pointRadiusProjection.push(0);
      pointBackgroundColorProjection.push("transparent");
    }
    if (enhancedDatesToNumbers[indx] % 1 === 0) {
      hitRadius.push(10);
    } else {
      hitRadius.push(0);
    }
  });

  pointBackgroundColorProjection[projectedArray.length - 1] = "grey";

  const options = getChartOptions(
    isSuccess,
    expensePoints,
    selectedCycle.value,
    labels,
    enhancedDatesToNumbers,
    selectedYear.value,
    selectedTimeCycleIndex.value,
    lastNumberBeforeNaN,
    currentWeekIndex,
    hitRadius,
    fractalFactor,
    currency
  );

  const data = getData(
    labels,
    selectedCycle,
    selectedTimeCycleIndex,
    projectedArray,
    expensePoints,
    currentWeekIndex,
    pointRadiusProjection,
    pointRadius,
    pointBackgroundColorProjection,
    pointBackgroundColor,
    isSuccess,
    selectedYear.value
  );

  return (
    <StyledCumulativeSpending>
      <Line options={options} data={data} plugins={[noData, ChartDataLabels]} />
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
    </StyledCumulativeSpending>
  );
}
