import { tokens } from '@/styles/tokens';
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
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { StyledBarChart } from './BarChart.styled';
import Carousel from '../../Carousel/Carousel';
import { getCarouselItemsBasedOnCycle } from '../../helpers/getCarouselItemsBasedOnCycle';

import { getAllDaysInMonth } from '../../../../helpers/monthlyDataHelpers';
import { createGroupedLabels } from '../../helpers/createGroupedLabels';
import { getChartOptions } from './options/getChartOptions';
import { groupExpensesPerWeek } from '../../helpers/groupExpensesPerWeek';
import { useStartAndEndDatesEffect } from '../../hooks/useStartEndDatesEffect';
import { noData } from '../plugins/noData';
import { Frequency } from '../../../../types';
import { deCumulArray } from '../../helpers/deCumulArray';
import { horizontalLine } from '../plugins/horizontalLine';
import { months, shortWeekdays } from '../../../../constants';
import { BarChartProps } from '../../../../interfaces';
import { getCumulativeShares } from '../../helpers/getCumulativeArray';

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
  currency,
  backendData,
  isSuccess,
  timeZone,
}: BarChartProps) {
  const cumulArrayData = getCumulativeShares(backendData);

  const expenseDataPoints = deCumulArray(cumulArrayData);

  const allDaysInMonth = getAllDaysInMonth(
    selectedTimeCycleIndex.value + 1,
    selectedYear.value
  );

  const datesToNumbers = allDaysInMonth.map((day) => day.getDate());

  const weekDays =
    allWeeksPerYear[selectedTimeCycleIndex.value]?.map(
      (day) => shortWeekdays[(day.getDay() + 6) % 7]
    ) ?? shortWeekdays;

  const labelBuilder = (cycle: Frequency) => {
    switch (cycle) {
      case Frequency.Monthly:
        return createGroupedLabels(datesToNumbers);
      case Frequency.Weekly:
        return weekDays;
      case Frequency.Annually:
        return months.map((m) => m.slice(0, 3));
      default:
        return [];
    }
  };

  const labels = labelBuilder(selectedCycle.value);

  useStartAndEndDatesEffect(
    selectedCycle,
    selectedTimeCycleIndex,
    selectedYear,
    allWeeksPerYear,
    startDate,
    endDate,
    timeZone
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

  const expenseDataGrouping = (
    cycle: Frequency,
    expenseDataPoints: number[]
  ) => {
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

  const expenseData = expenseDataGrouping(
    selectedCycle.value,
    expenseDataPoints
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'cumulative spending',
        data: expenseData,
        backgroundColor: tokens.chart.spentBar,
        borderWidth: 2,
      },
    ],
  } as any;

  return (
    <StyledBarChart>
      <div className="chartArea">
        <Bar
          options={options}
          data={data}
          plugins={[noData, ChartDataLabels, horizontalLine]}
        />
      </div>
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
