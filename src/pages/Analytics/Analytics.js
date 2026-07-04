import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { StyledAnalytics } from './Analytics.styled';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { MdOutlineShowChart } from 'react-icons/md';
import { MdBarChart } from 'react-icons/md';
import { MdSsidChart } from 'react-icons/md';
import { CumulativeSpending } from './Charts/CumulativeSpending/CumulativeSpending';
import { TotalLentBorrowed } from './Charts/TotalLentBorrowed/TotalLentBorrowed';
import { BarChart } from './Charts/BarChart/BarChart';
import { useSignal } from '@preact/signals-react';
import CycleOptions from './CycleOption/CycleOption';
import Years from './YearOption/YearOption';
import { Frequency } from '../../types';
import PeriodOption from './Charts/PeriodOption/PeriodOption';
import { initialiseSelectedTimeCycle } from '../../helpers/initialiseSelectedTimeCycle';
import { buildStartAndEndDates } from './helpers/buildStartAndEndDates';
import { useQueryClient } from '@tanstack/react-query';
import CurrencyOptionsAnimation from '../../components/Animations/CurrencyOptionsAnimation';
import AnalyticsTimePeriodSelectionAnimation from '../../components/Animations/AnalyticsMenuAnimations/AnalyticsTimePeriodSelectionAnimation';
import AnalyticsCycleSelectionAnimation from '../../components/Animations/AnalyticsMenuAnimations/AnalyticsCycleSelectionAnimation';
import AnalyticsYearSelectionAnimation from '../../components/Animations/AnalyticsMenuAnimations/AnalyticsYearSelectionAnimation';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import { useWeeklyDatesMemo } from '../../components/SearchTransactions/hooks/useWeeklyDatesMemo';
import { CategoryButton } from '../../components/CategoryButton/CategoryButton';
import TopBarWithBackButton from '../../components/TopBarWithBackButton/TopBarWithBackButton';
import Spinner from '../../components/Spinner/Spinner';
import { useCumulativeSpendingArray } from '../../api/auth/QueryHooks/useCumulativeSpendingArray';
export default function Analytics() {
    const [selectedChart, setSelectedChart] = useState('cumulativeSpending');
    const selectedCycle = useSignal(Frequency.Monthly);
    const selectedYear = useSignal(new Date().getFullYear());
    const cyclehaschanged = useSignal(false);
    const menu = useSignal(null);
    const { userInfo } = useOutletContext();
    const [currency, setCurrency] = useState('');
    const queryClient = useQueryClient();
    const [allWeeksPerYear, wksToDateString, monthsAndDaysArrays, currentWeekIndex,] = useWeeklyDatesMemo(selectedYear);
    const selectedTimeCycleIndex = useSignal(initialiseSelectedTimeCycle(selectedCycle.value, currentWeekIndex, selectedYear.value));
    const startDate = useSignal(buildStartAndEndDates(selectedCycle.value, selectedTimeCycleIndex.value, selectedYear.value, allWeeksPerYear, userInfo?.timeZone)[0]);
    const endDate = useSignal(buildStartAndEndDates(selectedCycle.value, selectedTimeCycleIndex.value, selectedYear.value, allWeeksPerYear, userInfo?.timeZone)[1]);
    const navigate = useNavigate();
    const handleBackButtonClick = () => {
        navigate(`/`);
    };
    useEffect(() => {
        selectedTimeCycleIndex.value = initialiseSelectedTimeCycle(selectedCycle.value, currentWeekIndex, selectedYear.value);
    }, [selectedYear.value, selectedCycle.value]);
    useEffect(() => {
        if (userInfo?.currency) {
            setCurrency(userInfo.currency);
        }
    }, [userInfo]);
    const handleCurrencyOptionsClick = (curr) => {
        setCurrency(curr);
        queryClient.invalidateQueries({
            queryKey: [
                'cumulativeArray',
                startDate,
                endDate,
                currency,
                selectedCycle.value,
            ],
        });
        menu.value = null;
    };
    const { data, isSuccess, isFetching } = useCumulativeSpendingArray(startDate.value, endDate.value, currency, selectedCycle.value);
    return (_jsx(StyledAnalytics, { children: !userInfo?.currency ? (_jsx("div", { className: "spinner", children: _jsx(Spinner, {}) })) : (_jsxs(_Fragment, { children: [_jsx(TopBarWithBackButton, { header: "Spending Trends", onClick: () => handleBackButtonClick() }), _jsx("div", { className: "buttons", children: _jsxs("div", { className: "groupCategories", children: [_jsx(CategoryButton, { selected: selectedChart === 'cumulativeSpending', onClick: () => setSelectedChart('cumulativeSpending'), children: _jsx(MdOutlineShowChart, { className: "buttonChart" }) }), _jsx(CategoryButton, { selected: selectedChart === 'barChart', onClick: () => setSelectedChart('barChart'), children: _jsx(MdBarChart, { className: "buttonChart" }) }), _jsx(CategoryButton, { selected: selectedChart === 'totalLentBorrowed', onClick: () => setSelectedChart('totalLentBorrowed'), children: _jsx(MdSsidChart, { className: "buttonChart" }) })] }) }), _jsxs("div", { className: "dateOptions", children: [_jsxs(CategoryButton, { onClick: () => (menu.value = 'cycle'), children: [_jsx("div", { className: "height" }), _jsx("span", { children: Frequency[selectedCycle.value] }), _jsx("div", { className: "height" })] }), _jsxs(CategoryButton, { onClick: () => (menu.value = 'year'), children: [_jsx("div", { className: "height" }), _jsx("span", { children: selectedYear.value }), _jsx("div", { className: "height" })] }), _jsxs(CategoryButton, { onClick: () => (menu.value = 'currencyOptions'), children: [_jsx("div", { className: "height" }), _jsx("span", { children: currency }), _jsx("div", { className: "height" })] })] }), _jsx("div", { className: "chartWrapper", children: _jsxs("div", { className: "chart", children: [selectedChart === 'cumulativeSpending' && (_jsx(CumulativeSpending, { selectedCycle: selectedCycle, selectedYear: selectedYear, currentWeekIndex: currentWeekIndex, monthsAndDaysArrays: monthsAndDaysArrays, cyclehaschanged: cyclehaschanged, allWeeksPerYear: allWeeksPerYear, menu: menu, selectedTimeCycleIndex: selectedTimeCycleIndex, startDate: startDate, endDate: endDate, currency: currency, backendData: data, isSuccess: isSuccess, timeZone: userInfo.timeZone })), selectedChart === 'barChart' && (_jsx(BarChart, { selectedCycle: selectedCycle, selectedYear: selectedYear, currentWeekIndex: currentWeekIndex, monthsAndDaysArrays: monthsAndDaysArrays, cyclehaschanged: cyclehaschanged, allWeeksPerYear: allWeeksPerYear, menu: menu, selectedTimeCycleIndex: selectedTimeCycleIndex, startDate: startDate, endDate: endDate, currency: currency, backendData: data, isSuccess: isSuccess, timeZone: userInfo.timeZone })), selectedChart === 'totalLentBorrowed' && (_jsx(TotalLentBorrowed, { selectedCycle: selectedCycle, selectedYear: selectedYear, currentWeekIndex: currentWeekIndex, monthsAndDaysArrays: monthsAndDaysArrays, cyclehaschanged: cyclehaschanged, allWeeksPerYear: allWeeksPerYear, menu: menu, selectedTimeCycleIndex: selectedTimeCycleIndex, startDate: startDate, endDate: endDate, currency: currency, backendData: data, isSuccess: isSuccess, timeZone: userInfo.timeZone }))] }) }), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(AnalyticsCycleSelectionAnimation, { menu: menu, header: "Select Cycle", children: _jsx(CycleOptions, { menu: menu, selectedCycle: selectedCycle, cyclehaschanged: cyclehaschanged }) }), _jsx(AnalyticsYearSelectionAnimation, { menu: menu, header: "Select Year", children: _jsx(Years, { menu: menu, selectedYear: selectedYear, selectedTimeCycleIndex: selectedTimeCycleIndex }) }), _jsx(AnalyticsTimePeriodSelectionAnimation, { menu: menu, header: selectedCycle.value === Frequency.Monthly
                        ? 'Select Month'
                        : 'Select Week', children: _jsx(PeriodOption, { menu: menu, selectedCycle: selectedCycle, selectedTimeCycleIndex: selectedTimeCycleIndex, monthsAndDaysArrays: monthsAndDaysArrays }) }), _jsx(CurrencyOptionsAnimation, { currencyMenu: menu, selectedCurrency: currency, clickHandler: handleCurrencyOptionsClick })] })) }));
}
