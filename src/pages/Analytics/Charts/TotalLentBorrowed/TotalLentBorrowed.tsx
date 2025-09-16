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
import { getTotalLentBorrowed } from "../../helpers/getTotalLentBorrowed";

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
  startDate,
  backendData,
  isSuccess,
}: TotalLentBorrowedProps) {
  const fractalFactor = 4;

  const totalLentBorrowed = getTotalLentBorrowed(backendData,currency);


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

  useStartAndEndDatesEffect(
    selectedCycle,
    selectedTimeCycleIndex,
    selectedYear,
    allWeeksPerYear,
    startDate,
    endDate
  );

  const totalLent =
    totalLentBorrowed?.totalLent === undefined
      ? []
      : totalLentBorrowed.totalLent;
  const totalBorrowed =
    totalLentBorrowed?.totalBorrowed === undefined
      ? []
      : totalLentBorrowed.totalBorrowed;

  const totalLentExt = enhanceNumberArray(totalLent, fractalFactor).filter(
    (element) => element !== undefined
  );
  const totalBorrowedExt = enhanceNumberArray(
    totalBorrowed,
    fractalFactor
  ).filter((element) => element !== undefined);

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
