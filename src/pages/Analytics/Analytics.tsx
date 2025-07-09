import React, { useEffect, useState } from "react";
import { StyledAnalytics } from "./Analytics.styled";
import { useNavigate, useOutletContext } from "react-router-dom";
import { MdOutlineShowChart } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
import { MdSsidChart } from "react-icons/md";
import { CumulativeSpending } from "./Charts/CumulativeSpending/CumulativeSpending";
import { TotalLentBorrowed } from "./Charts/TotalLentBorrowed/TotalLentBorrowed";
import { BarChart } from "./Charts/BarChart/BarChart";
import { useSignal } from "@preact/signals-react";
import CycleOptions from "./CycleOption/CycleOption";
import Years from "./YearOption/YearOption";
import { Frequency, UserInfo } from "../../types";
import PeriodOption from "./Charts/PeriodOption/PeriodOption";
import { initialiseSelectedTimeCycle } from "../../helpers/initialiseSelectedTimeCycle";
import { buildStartAndEndDates } from "./helpers/buildStartAndEndDates";
import { useQueryClient } from "@tanstack/react-query";
import CurrencyOptionsAnimation from "../../components/Menus/MenuAnimations/CurrencyOptionsAnimation";
import AnalyticsTimePeriodSelectionAnimation from "../../components/Menus/MenuAnimations/AnalyticsMenuAnimations/AnalyticsTimePeriodSelectionAnimation";
import AnalyticsCycleSelectionAnimation from "../../components/Menus/MenuAnimations/AnalyticsMenuAnimations/AnalyticsCycleSelectionAnimation";
import AnalyticsYearSelectionAnimation from "../../components/Menus/MenuAnimations/AnalyticsMenuAnimations/AnalyticsYearSelectionAnimation";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import { useWeeklyDatesMemo } from "../../components/SearchTransactions/hooks/useWeeklyDatesMemo";
import { CategoryButton } from "../../components/CategoryButton/CategoryButton";
import TopBarWithBackButton from "../../components/TopBarWithBackButton/TopBarWithBackButton";
import Spinner from "../../components/Spinner/Spinner";

export default function Analytics() {
  const [selectedChart, setSelectedChart] =
    useState<string>("cumulativeSpending");
  const selectedCycle = useSignal<Frequency>(Frequency.Monthly);
  const selectedYear = useSignal<number>(new Date().getFullYear());
  const cyclehaschanged = useSignal<boolean>(false);
  const menu = useSignal<string | null>(null);

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();
  const [currency, setCurrency] = useState<string>('');

  const queryClient = useQueryClient();
  const [
    allWeeksPerYear,
    wksToDateString,
    monthsAndDaysArrays,
    currentWeekIndex,
  ] = useWeeklyDatesMemo(selectedYear);

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
      allWeeksPerYear
    )[0]
  );

  const endDate = useSignal<string>(
    buildStartAndEndDates(
      selectedCycle.value,
      selectedTimeCycleIndex.value,
      selectedYear.value,
      allWeeksPerYear
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
    // currency.value = curr;
     setCurrency(curr);
    if (
      selectedChart === "cumulativeSpending" ||
      selectedChart === "barChart"
    ) {
      queryClient.invalidateQueries({
        queryKey: ["cumulativeSpending", startDate, endDate, currency],
      });
    }
    if (selectedChart === "totalLentBorrowed") {
      queryClient.invalidateQueries({
        queryKey: ["totalLentBorrowed", startDate, endDate, currency],
      });
    }
    menu.value = null;
  };

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
        <div className="buttons">
          <div className="groupCategories">
            <CategoryButton
              selected={selectedChart === "cumulativeSpending"}
              onClick={() => setSelectedChart("cumulativeSpending")}
            >
              <MdOutlineShowChart className="buttonChart" />
            </CategoryButton>

            <CategoryButton
              selected={selectedChart === "barChart"}
              onClick={() => setSelectedChart("barChart")}
            >
              <MdBarChart className="buttonChart" />
            </CategoryButton>

            <CategoryButton
              selected={selectedChart === "totalLentBorrowed"}
              onClick={() => setSelectedChart("totalLentBorrowed")}
            >
              <MdSsidChart className="buttonChart" />
            </CategoryButton>
          </div>
        </div>

        <div className="dateOptions">
          <CategoryButton onClick={() => (menu.value = "cycle")} >
            <div className="height"></div>
            <span>{Frequency[selectedCycle.value]}</span>
            <div className="height"></div>
          </CategoryButton>
          <CategoryButton onClick={() => (menu.value = "year")}>
            <div className="height"></div>
            <span>{selectedYear.value}</span>
            <div className="height"></div>
          </CategoryButton>
          <CategoryButton onClick={() => (menu.value = "currencyOptions")}>
            <div className="height"></div>
            <span>{currency}</span>
            <div className="height"></div>
          </CategoryButton>
        </div>

        <div className="chartWrapper">
          <div className="chart">
            {selectedChart === "cumulativeSpending" && (
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
              />
            )}
            {selectedChart === "barChart" && (
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
              />
            )}
            {selectedChart === "totalLentBorrowed" && (
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
              />
            )}
          </div>
        </div>

        <MenuAnimationBackground menu={menu} />

        <AnalyticsCycleSelectionAnimation menu={menu} header="Select Cycle">
          <CycleOptions
            menu={menu}
            selectedCycle={selectedCycle}
            cyclehaschanged={cyclehaschanged}
          />
        </AnalyticsCycleSelectionAnimation>

        <AnalyticsYearSelectionAnimation menu={menu} header="Select Year">
          <Years
            menu={menu}
            selectedYear={selectedYear}
            selectedTimeCycleIndex={selectedTimeCycleIndex}
          />
        </AnalyticsYearSelectionAnimation>

        <AnalyticsTimePeriodSelectionAnimation
          menu={menu}
          header={
            selectedCycle.value === Frequency.Monthly
              ? "Select Month"
              : "Select Week"
          }
        >
          <PeriodOption
            menu={menu}
            selectedCycle={selectedCycle}
            selectedTimeCycleIndex={selectedTimeCycleIndex}
            monthsAndDaysArrays={monthsAndDaysArrays}
          />
        </AnalyticsTimePeriodSelectionAnimation>

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
