import { StyledTotalLentBorrowed } from './TotalLentBorrowe.styled';
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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { noData } from '../plugins/noData';
import Carousel from '../../Carousel/Carousel';
import { getCarouselItemsBasedOnCycle } from '../../helpers/getCarouselItemsBasedOnCycle';
import { TotalLentBorrowedProps } from '../../../../interfaces';
import { getAllDaysInMonth } from '../../../../helpers/monthlyDataHelpers';
import { enhanceNumberArray } from '../../../../helpers/enhanceNumberArray';
import { getChartOptions } from './options/getChartOptions';
import { getData } from './data/getData';
import { useStartAndEndDatesEffect } from '../../hooks/useStartEndDatesEffect';
import { buildLabels } from '../../helpers/buildLabels';
import { months } from '../../../../constants';
import { getTotalLentBorrowed } from '../../helpers/getTotalLentBorrowed';

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
  timeZone,
}: TotalLentBorrowedProps) {
  const fractalFactor = 4;

  const totalLentBorrowed = getTotalLentBorrowed(backendData);

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
    endDate,
    timeZone
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

  // Both lines mark the same points, so one pass builds all four arrays together. Chart.js reads
  // one entry per data point, and the two lines share pointRadius and hitRadius, so filling them
  // once per line left them twice as long as the data with the second half never read.
  totalLentExt.forEach((_, indx) => {
    const isEdge = indx === 0 || indx === totalLentExt.length - 1;
    const isMiddleOfMonth = enhancedDatesToNumbers[indx] === 15; //createConditionForMiddlePoint(totalLentExt.length, indx)
    const lastPointSitsBesideTheMiddle =
      enhancedDatesToNumbers[totalLentExt.length - 1] === 14 ||
      enhancedDatesToNumbers[totalLentExt.length - 1] === 16;

    //condition to not show 15th and 16th consecutive data points
    const show =
      (isEdge || isMiddleOfMonth) &&
      !(isMiddleOfMonth && lastPointSitsBesideTheMiddle);

    pointRadius.push(show ? 2 : 0);
    pointBackgroundColorTotalLent.push(show ? '#317E24' : 'transparent');
    pointBackgroundColorTotalLentTotalBorrowed.push(
      show ? '#FF3D3D' : 'transparent'
    );

    hitRadius.push(enhancedDatesToNumbers[indx] % 1 === 0 ? 10 : 0);
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
