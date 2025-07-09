import React from "react";
import { StyledTotalLentBorrowed } from "./TotalLentBorrowe.styled";
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
import { noData } from "../plugins/noData";
import Carousel from "../../Carousel/Carousel";
import { getCarouselItemsBasedOnCycle } from "../../helpers/getCarouselItemsBasedOnCycle";
import { TotalLentBorrowedProps } from "../../../../interfaces";
import { getAllDaysInMonth } from "../../../../helpers/monthlyDataHelpers";
import { enhanceNumberArray } from "../../../../helpers/enhanceNumberArray";
import { getChartOptions } from "./options/getChartOptions";
import { getData } from "./data/getData";
import { useStartAndEndDatesEffect } from "../../hooks/useStartEndDatesEffect";
import { buildLabels } from "../../helpers/buildLabels";

import { months } from "../../../../constants";
import { useTotalLentBorrowedArrays } from "../../../../api/services/useTotalLentBorrowedArrays";
//TODO fast click to the left by choosing weekly. Legends are flashing
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

export function TotalLentBorrowed({
  selectedCycle,
  selectedYear,
  currentWeekIndex,
  monthsAndDaysArrays,
  cyclehaschanged,
  allWeeksPerYear,
  menu,
  selectedTimeCycleIndex,
  currency,
  endDate,
  startDate
}: TotalLentBorrowedProps) {
  const fractalFactor = 4;


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


const totalLentBorrowed = {
    totalLent: [1, 12, 15, 16, 56, 69, 100, 102, 120, 130, 150, 180, 190, 200, 210.36, 222, 250.36, 310, 400, 420, 450, 500, 540, 690, 940, 952, 1000, 1045.36],
    totalBorrowed: [2, 15.0, 16.5, 20.0, 80.0, 175.0, 195.0, 205.0, 325.0, 435.0, 560.0, 690.0, 700.0, 810.0, 920.0, 1030.0, 1160.0, 1220.0, 1310.0, 1430.0, 1560.0, 1610.0, 1750.0,1800.0, 1960.0, 2075.0, 2020.0,2065.0]
};
  const isSuccess=true;

  useStartAndEndDatesEffect(
    selectedCycle,
    selectedTimeCycleIndex,
    selectedYear,
    allWeeksPerYear,
    startDate,
    endDate
  );

  const totalLent2 = [2, 50, 100, 750, 800, 800, 1000];
  const totalBorrowed2 = [7, 150, 10, 15, 25, 35, 150];

  // const { data: totalLentBorrowed, isSuccess } = useTotalLentBorrowedArrays(
  //   startDate.value,
  //   endDate.value, 
  //   currency
  // );

  const totalLent =
    totalLentBorrowed?.totalLent === undefined
      ? []
      : totalLentBorrowed.totalLent;
  const totalBorrowed =
    totalLentBorrowed?.totalBorrowed === undefined
      ? []
      : totalLentBorrowed.totalBorrowed;

  const totalLentExt = enhanceNumberArray(totalLent, fractalFactor).filter((element) => element !== undefined);
  const totalBorrowedExt = enhanceNumberArray(totalBorrowed, fractalFactor).filter((element) => element !== undefined);


  const pointRadius: number[] = [];
  const hitRadius: number[] = []; //determines which cicles will be highlited on hover.
  const pointBackgroundColorTotalLent: string[] = [];
  const pointBackgroundColorTotalLentTotalBorrowed: string[] = [];

  totalLentExt.map((dp, indx) => {
    if (
      indx === 0 ||
      indx === totalLentExt.length - 1 ||
      enhancedDatesToNumbers[indx] === 15 //createConditionForMiddlePoint(totalLentExt.length, indx)
    ) {
      if (
        enhancedDatesToNumbers[indx] === 15 &&
        (enhancedDatesToNumbers[totalLentExt.length - 1] === 14 ||
          enhancedDatesToNumbers[totalLentExt.length - 1] === 16) //condition to not show 15th and 16th consecutive data points
      ) {
        pointRadius.push(0);
        pointBackgroundColorTotalLent.push("transparent");
      } else {
        pointRadius.push(2);
        pointBackgroundColorTotalLent.push("#317E24");
      }
    } else {
      pointRadius.push(0);
      pointBackgroundColorTotalLent.push("transparent");
    }
    if (enhancedDatesToNumbers[indx] % 1 === 0) {
      hitRadius.push(10);
    } else {
      hitRadius.push(0);
    }
  });

  totalBorrowedExt.map((dp, indx) => {
    if (
      indx === 0 ||
      indx === totalLentExt.length - 1 ||
      enhancedDatesToNumbers[indx] === 15
    ) {
      if (
        enhancedDatesToNumbers[indx] === 15 &&
        (enhancedDatesToNumbers[totalLentExt.length - 1] === 14 ||
          enhancedDatesToNumbers[totalLentExt.length - 1] === 16) //condition to not show 15th and 16th consecutive data points
      ) {
        pointRadius.push(0);
        pointBackgroundColorTotalLent.push("transparent");
      } else {
        pointRadius.push(2);
        pointBackgroundColorTotalLentTotalBorrowed.push("#FF3D3D");
      }
    } else {
      pointRadius.push(0);
      pointBackgroundColorTotalLentTotalBorrowed.push("transparent");
    }
    if (enhancedDatesToNumbers[indx] % 1 === 0) {
      hitRadius.push(10);
    } else {
      hitRadius.push(0);
    }
  });

  const options = getChartOptions(
    isSuccess,
    totalLentExt,
    totalBorrowedExt,
    selectedCycle.value,
    labels,
    enhancedDatesToNumbers,
    selectedYear.value,
    selectedTimeCycleIndex.value,
    currentWeekIndex,
    hitRadius,
    fractalFactor,
    currency
  );

  const data = getData(
    totalLentExt,
    totalBorrowedExt,
    labels,
    pointRadius,
    pointBackgroundColorTotalLent,
    pointBackgroundColorTotalLentTotalBorrowed
  );

  return (
    <StyledTotalLentBorrowed>
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
    </StyledTotalLentBorrowed>
  );
}
