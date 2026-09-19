import React, { useEffect, useState } from 'react';
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
import { Frequency, UserInfo } from '../../types';
import PeriodOption from './Charts/PeriodOption/PeriodOption';
import { initialiseSelectedTimeCycle } from '../../helpers/initialiseSelectedTimeCycle';
import { buildStartAndEndDates } from './helpers/buildStartAndEndDates';
import { useQueryClient } from '@tanstack/react-query';
import CurrencyOptionsAnimation from '../../components/Animations/CurrencyOptionsAnimation';
import AnalyticsSelectionAnimation from '../../components/Animations/AnalyticsMenuAnimations/AnalyticsSelectionAnimation';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import { useWeeklyDatesMemo } from '../../components/SearchTransactions/hooks/useWeeklyDatesMemo';
import { CategoryButton } from '../../components/CategoryButton/CategoryButton';
import SegmentedControl from '../../components/SegmentedControl/SegmentedControl';
import SectionLabel from '../../components/SectionLabel/SectionLabel';
import PropertyList, { PropertyRow } from '../../components/ListForms/PropertyList';
import { displayCurrencyAndAmount } from '../../helpers/displayCurrencyAndAmount';
import { isCurrentPeriod } from './helpers/isCurrentPeriod';
import { getSpendingSummary } from '../../helpers/spendingSummary';
import TopBarWithBackButton from '../../components/TopBarWithBackButton/TopBarWithBackButton';
import Spinner from '../../components/Spinner/Spinner';
import { useCumulativeSpendingArray } from '../../api/auth/QueryHooks/useCumulativeSpendingArray';
import CurrencyFlag from '../../components/CurrencyFlag/CurrencyFlag';

export default function Analytics() {
  const [selectedChart, setSelectedChart] =
    useState<string>('cumulativeSpending');
  const selectedCycle = useSignal<Frequency>(Frequency.Monthly);
  const selectedYear = useSignal<number>(new Date().getFullYear());
  const cyclehaschanged = useSignal<boolean>(false);
  const menu = useSignal<string | null>(null);

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();
  const [currency, setCurrency] = useState<string>('');

  const queryClient = useQueryClient();
  const [allWeeksPerYear, , monthsAndDaysArrays, currentWeekIndex] =
    useWeeklyDatesMemo(selectedYear);

  const selectedTimeCycleIndex = useSignal<number>(
    initialiseSelectedTimeCycle(
      selectedCycle.value,
      currentWeekIndex,
      selectedYear.value
    )
  );

  const startDate = useSignal<string>(
    buildStartAndEndDates(
      selectedCycle.value,
      selectedTimeCycleIndex.value,
      selectedYear.value,
      allWeeksPerYear,
      userInfo?.timeZone
    )[0]
  );

  const endDate = useSignal<string>(
    buildStartAndEndDates(
      selectedCycle.value,
      selectedTimeCycleIndex.value,
      selectedYear.value,
      allWeeksPerYear,
      userInfo?.timeZone
    )[1]
  );

  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(`/`);
  };

  useEffect(() => {
    selectedTimeCycleIndex.value = initialiseSelectedTimeCycle(
      selectedCycle.value,
      currentWeekIndex,
      selectedYear.value
    );
  }, [selectedYear.value, selectedCycle.value]);

  useEffect(() => {
    if (userInfo?.currency) {
      setCurrency(userInfo.currency);
    }
  }, [userInfo]);

  const handleCurrencyOptionsClick = (curr: string) => {
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

  const { data, isSuccess } = useCumulativeSpendingArray(
    startDate.value,
    endDate.value,
    currency,
    selectedCycle.value
  );

  const summary = getSpendingSummary(data, startDate.value, selectedCycle.value);

  const showForecast = isCurrentPeriod(
    selectedCycle.value,
    selectedTimeCycleIndex.value,
    isSuccess,
    data?.items ?? [],
    currentWeekIndex,
    selectedYear.value
  );

  return (
    <StyledAnalytics>
      {!userInfo?.currency ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <>
          <TopBarWithBackButton
            header="Spending Trends"
            onClick={() => handleBackButtonClick()}
          />
          <SegmentedControl
            value={selectedChart}
            onChange={(next) => setSelectedChart(next)}
            options={[
              {
                value: 'cumulativeSpending',
                label: <MdOutlineShowChart className="buttonChart" />,
              },
              {
                value: 'barChart',
                label: <MdBarChart className="buttonChart" />,
              },
              {
                value: 'totalLentBorrowed',
                label: <MdSsidChart className="buttonChart" />,
              },
            ]}
          />

          <div className="scrollArea">
            <div className="dateOptions">
              <CategoryButton variant="pill" onClick={() => (menu.value = 'cycle')}>
                <div className="height"></div>
                <span>{Frequency[selectedCycle.value]}</span>
                <div className="height"></div>
              </CategoryButton>
              <CategoryButton variant="pill" onClick={() => (menu.value = 'year')}>
                <div className="height"></div>
                <span>{selectedYear.value}</span>
                <div className="height"></div>
              </CategoryButton>
              <CategoryButton variant="pill" onClick={() => (menu.value = 'currencyOptions')}>
                <div className="height"></div>
                <CurrencyFlag code={currency} />
                <span>{currency}</span>
                <div className="height"></div>
              </CategoryButton>
            </div>

            <div className="headline">
              <div className="headlineSide">
                <SectionLabel title="Spent so far" />
                <div className="headlineFigure">
                  {displayCurrencyAndAmount(
                    (summary?.spentSoFar ?? 0).toString(),
                    currency
                  )}
                </div>
              </div>
              {showForecast ? (
                <div className="headlineSide right">
                  <SectionLabel title="Forecast" />
                  <div className="headlineForecast">
                    {displayCurrencyAndAmount(
                      (summary?.forecast ?? 0).toString(),
                      currency
                    )}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="chartWrapper">
              <div className="chart">
                {selectedChart === 'cumulativeSpending' && (
                  <CumulativeSpending
                    selectedCycle={selectedCycle}
                    selectedYear={selectedYear}
                    currentWeekIndex={currentWeekIndex}
                    monthsAndDaysArrays={monthsAndDaysArrays}
                    cyclehaschanged={cyclehaschanged}
                    allWeeksPerYear={allWeeksPerYear}
                    menu={menu}
                    selectedTimeCycleIndex={selectedTimeCycleIndex}
                    startDate={startDate}
                    endDate={endDate}
                    currency={currency}
                    backendData={data}
                    isSuccess={isSuccess}
                    timeZone={userInfo.timeZone}
                  />
                )}
                {selectedChart === 'barChart' && (
                  <BarChart
                    selectedCycle={selectedCycle}
                    selectedYear={selectedYear}
                    currentWeekIndex={currentWeekIndex}
                    monthsAndDaysArrays={monthsAndDaysArrays}
                    cyclehaschanged={cyclehaschanged}
                    allWeeksPerYear={allWeeksPerYear}
                    menu={menu}
                    selectedTimeCycleIndex={selectedTimeCycleIndex}
                    startDate={startDate}
                    endDate={endDate}
                    currency={currency}
                    backendData={data}
                    isSuccess={isSuccess}
                    timeZone={userInfo.timeZone}
                  />
                )}
                {selectedChart === 'totalLentBorrowed' && (
                  <TotalLentBorrowed
                    selectedCycle={selectedCycle}
                    selectedYear={selectedYear}
                    currentWeekIndex={currentWeekIndex}
                    monthsAndDaysArrays={monthsAndDaysArrays}
                    cyclehaschanged={cyclehaschanged}
                    allWeeksPerYear={allWeeksPerYear}
                    menu={menu}
                    selectedTimeCycleIndex={selectedTimeCycleIndex}
                    startDate={startDate}
                    endDate={endDate}
                    currency={currency}
                    backendData={data}
                    isSuccess={isSuccess}
                    timeZone={userInfo.timeZone}
                  />
                )}
              </div>
            </div>

            <PropertyList>
              <PropertyRow label="Daily average">
                <span className="monoValue">
                  {displayCurrencyAndAmount(
                    (summary?.dailyAverage ?? 0).toString(),
                    currency
                  )}
                </span>
              </PropertyRow>
              <PropertyRow label="Busiest day">
                {summary?.busiestLabel ? (
                  <span>
                    {summary.busiestLabel}{' '}
                    <span className="dot">&middot;</span>{' '}
                    <span className="monoValue">
                      {displayCurrencyAndAmount(
                        summary.busiestAmount.toString(),
                        currency
                      )}
                    </span>
                  </span>
                ) : (
                  <span className="monoValue">&mdash;</span>
                )}
              </PropertyRow>
            </PropertyList>
          </div>


          <MenuAnimationBackground menu={menu} />

          <AnalyticsSelectionAnimation menu={menu} menuKey="cycle" header="Select Cycle">
            <CycleOptions
              menu={menu}
              selectedCycle={selectedCycle}
              cyclehaschanged={cyclehaschanged}
            />
          </AnalyticsSelectionAnimation>

          <AnalyticsSelectionAnimation menu={menu} menuKey="year" header="Select Year">
            <Years
              menu={menu}
              selectedYear={selectedYear}
              selectedTimeCycleIndex={selectedTimeCycleIndex}
            />
          </AnalyticsSelectionAnimation>

          <AnalyticsSelectionAnimation
            menu={menu}
            menuKey="timePeriod"
            header={
              selectedCycle.value === Frequency.Monthly
                ? 'Select Month'
                : 'Select Week'
            }
          >
            <PeriodOption
              menu={menu}
              selectedCycle={selectedCycle}
              selectedTimeCycleIndex={selectedTimeCycleIndex}
              monthsAndDaysArrays={monthsAndDaysArrays}
            />
          </AnalyticsSelectionAnimation>

          <CurrencyOptionsAnimation
            currencyMenu={menu}
            selectedCurrency={currency}
            clickHandler={handleCurrencyOptionsClick}
          />
        </>
      )}
    </StyledAnalytics>
  );
}
