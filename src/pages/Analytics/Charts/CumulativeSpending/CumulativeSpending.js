import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { StyledCumulativeSpending } from './CumulativeSpending.styled';
import Carousel from '../../Carousel/Carousel';
import { noData } from '../plugins/noData';
import { getAllDaysInMonth } from '../../../../helpers/monthlyDataHelpers';
import { getCarouselItemsBasedOnCycle } from '../../helpers/getCarouselItemsBasedOnCycle';
import { getChartOptions } from './options/getChartOptions';
import { getData } from './data/getData';
import { buildLabels } from '../../helpers/buildLabels';
import { useStartAndEndDatesEffect } from '../../hooks/useStartEndDatesEffect';
import { Frequency } from '../../../../types';
import { deCumulArray } from '../../helpers/deCumulArray';
import { enhanceNumberArray } from '../../../../helpers/enhanceNumberArray';
import { isCurrentPeriod } from '../../helpers/isCurrentPeriod';
import { months } from '../../../../constants';
import { significantDigitsFromTicker } from '../../../../helpers/openExchangeRates';
import { getCumulativeShares } from '../../helpers/getCumulativeArray';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
export function CumulativeSpending({ selectedCycle, selectedYear, currentWeekIndex, monthsAndDaysArrays, cyclehaschanged, allWeeksPerYear, menu, selectedTimeCycleIndex, startDate, endDate, currency, backendData, isSuccess, timeZone, }) {
    const fractalFactor = 1;
    const cumulArrayData = getCumulativeShares(backendData);
    useStartAndEndDatesEffect(selectedCycle, selectedTimeCycleIndex, selectedYear, allWeeksPerYear, startDate, endDate, timeZone);
    const allDaysInMonth = getAllDaysInMonth(selectedTimeCycleIndex.value + 1, selectedYear.value);
    const enhancedDatesToNumbers = enhanceNumberArray(allDaysInMonth.map((date) => date.getDate()), fractalFactor);
    const labels = buildLabels(selectedCycle.value, selectedTimeCycleIndex.value, enhancedDatesToNumbers, monthsAndDaysArrays, fractalFactor);
    const projectionArray = (cumulArrayData, cycle, currency) => {
        if (cumulArrayData === undefined)
            return [];
        if (cumulArrayData.length === 0)
            return [];
        const enhancedCumulArray = [...cumulArrayData];
        let upLimit = 0;
        //const now = new Date();
        if (cycle === Frequency.Monthly)
            upLimit = getAllDaysInMonth(selectedTimeCycleIndex.value + 1, selectedYear.value).length;
        if (cycle === Frequency.Weekly)
            upLimit = 7;
        if (cycle === Frequency.Annually)
            upLimit = 12;
        let enhancedCumulArrayLength = enhancedCumulArray?.length;
        while (enhancedCumulArrayLength < upLimit - 1) {
            enhancedCumulArray.push(NaN);
            enhancedCumulArrayLength = enhancedCumulArray?.length;
        }
        const forecastValue = calculateForcastValue(cumulArrayData, upLimit, currency);
        enhancedCumulArray.push(forecastValue);
        const enhancedCumulArrayWithMidPoints = enhanceNumberArray(enhancedCumulArray, 1);
        const hasNaN = enhancedCumulArrayWithMidPoints.some(Number.isNaN);
        if (!hasNaN)
            enhancedCumulArrayWithMidPoints[enhancedCumulArrayWithMidPoints.length - 2] = NaN;
        return enhancedCumulArrayWithMidPoints;
    };
    const calculateForcastValue = (cumulArrayData, upLimit, currency) => {
        const spendingArray = deCumulArray(cumulArrayData);
        const total = spendingArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        const average = total / spendingArray.length;
        const forecastValue = average * upLimit;
        return Number(forecastValue.toFixed(significantDigitsFromTicker(currency)));
    };
    const findLastNumberBeforeNaN = (arr) => {
        let lastIndex = -1;
        for (let [index, num] of arr.entries()) {
            if (isNaN(num)) {
                return lastIndex;
            }
            lastIndex = index;
        }
    };
    const expensePoints = cumulArrayData === undefined ? [] : cumulArrayData;
    const projectedArray = projectionArray(cumulArrayData, selectedCycle.value, currency);
    const lastNumberBeforeNaN = findLastNumberBeforeNaN(projectedArray);
    const pointRadius = [];
    const pointBackgroundColor = [];
    const pointRadiusProjection = [];
    const pointBackgroundColorProjection = [];
    const hitRadius = [];
    projectedArray.map((dp, indx) => {
        if (indx === 0 ||
            indx === projectedArray.length - 1 ||
            (enhancedDatesToNumbers[indx] === 15 &&
                !isCurrentPeriod(selectedCycle.value, selectedTimeCycleIndex.value, isSuccess, expensePoints, currentWeekIndex, selectedYear.value)) || //does not affect annual or weekly as they are 12 and 7 rsptctvly
            indx === lastNumberBeforeNaN) {
            pointRadiusProjection.push(2);
            pointBackgroundColorProjection.push('#A12BFF');
        }
        else {
            pointRadiusProjection.push(0);
            pointBackgroundColorProjection.push('transparent');
        }
        if (enhancedDatesToNumbers[indx] % 1 === 0) {
            hitRadius.push(10);
        }
        else {
            hitRadius.push(0);
        }
    });
    pointBackgroundColorProjection[projectedArray.length - 1] = 'grey';
    const options = getChartOptions(isSuccess, expensePoints, selectedCycle.value, labels, enhancedDatesToNumbers, selectedYear.value, selectedTimeCycleIndex.value, lastNumberBeforeNaN, currentWeekIndex, hitRadius, fractalFactor, currency);
    const data = getData(labels, selectedCycle, selectedTimeCycleIndex, projectedArray, expensePoints, currentWeekIndex, pointRadiusProjection, pointRadius, pointBackgroundColorProjection, pointBackgroundColor, isSuccess, selectedYear.value);
    return (_jsxs(StyledCumulativeSpending, { children: [_jsx(Line, { options: options, data: data, plugins: [noData, ChartDataLabels] }), _jsx("div", { className: "periodOptions", children: _jsx(Carousel, { carouselItems: getCarouselItemsBasedOnCycle(selectedCycle.value, months, monthsAndDaysArrays), selectedTimeCycleIndex: selectedTimeCycleIndex, selectedCycle: selectedCycle, cyclehaschanged: cyclehaschanged, menu: menu, selectedYear: selectedYear }) })] }));
}
