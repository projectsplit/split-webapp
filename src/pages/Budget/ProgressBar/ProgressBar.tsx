import React from "react";
import { StyledProgressBar } from "./ProgressBar.styled";
import { TbTargetArrow } from "react-icons/tb";
import { ProgressBarProps } from "../../../interfaces";
import { displayCurrencyAndAmount } from "../../../helpers/displayCurrencyAndAmount";
import { BudgetInfoResponse } from "../../../types";
import { useTheme } from "styled-components";
import { getIsoDateInfo } from "../../../helpers/getIsoDateInfo";

export default function ProgressBar({ data}: ProgressBarProps) {
  const theme = useTheme();
  let percentage: number = 0;

  if (data?.totalAmountSpent !== undefined && data?.goal !== undefined) {
    const totalAmountSpent = parseFloat(data.totalAmountSpent);
    const goal = parseFloat(data.goal);
    if (!isNaN(totalAmountSpent) && !isNaN(goal)) {
      percentage = parseFloat(((totalAmountSpent / goal) * 100).toFixed(1));
    }
  }

  const progressBarColor = (data: BudgetInfoResponse | undefined) => {
    if (
      data !== undefined &&
      data.remainingDays !== undefined &&
      data.goal !== undefined &&
      data.averageSpentPerDay !== undefined&&
      data.totalAmountSpent!== undefined
    ) {
      const totalAmountSpent = parseFloat(data.totalAmountSpent);
      const remainingDays = parseFloat(data.remainingDays);
      const averageSpentPerDay = parseFloat(data.averageSpentPerDay);
      const goal = parseFloat(data.goal);
      const spendingProjection =
        totalAmountSpent + remainingDays * averageSpentPerDay;
      if (totalAmountSpent < goal && spendingProjection < goal) {
        return theme?.green;
      } else return theme?.redish;
    } else {
      return "black";
    }
  };

  const convertDaysToDaysHoursAndMinutes = (
    days: string | undefined
  ): { days: number; hours: number; minutes: number } => {
    if (days === undefined) return { days: 0, hours: 0, minutes: 0 };
    const days2decimal = parseFloat(days);
    const wholeDays = Math.floor(days2decimal);
    const remainingHoursDecimal = (days2decimal - wholeDays) * 24;
    const remainingHours = Math.floor(remainingHoursDecimal);
    const remainingMinutes = Math.round(
      (remainingHoursDecimal - remainingHours) * 60
    );
    return {
      days: wholeDays,
      hours: remainingHours,
      minutes: remainingMinutes,
    };
  };

  const convertedDaysHoursMinutes = convertDaysToDaysHoursAndMinutes(
    data?.remainingDays
  );

  const startDateDecomposed = getIsoDateInfo(data?.startDate);
  const endDateDecomposed = getIsoDateInfo(data?.endDate);

  return (
    <StyledProgressBar percentage={percentage} color={progressBarColor(data)}>
      {/* <div className="closeButton" onClick={()=>setMenu("deleteBudgetConfirmation")}>
        <IonIcon name="close-outline" className="close" />
      </div> */}
      <div className="budgetInfo">
        <div className="thisPeriod">
          <div className="budgetTitle">
            {startDateDecomposed.dateNumber} {startDateDecomposed.month} -{" "}
            {endDateDecomposed.dateNumber} {endDateDecomposed.month}
          </div>
          <div className="progressBar">
           
            <TbTargetArrow className="targetIcon" />
           
            <div className="wrapper">
              <div className="barWrapper">
                <div className="bar" />
              </div>
              <div className="monetaryProgress">
                {data?.currency !== undefined ? (
                  <strong>
                    {displayCurrencyAndAmount(
                      data.totalAmountSpent,
                      data.currency
                    )}{" "}
                    / {displayCurrencyAndAmount(data.goal, data.currency)}
                  </strong>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="amount">{percentage < 0 ? 0 : percentage}%</div>
          </div>
          <div className="miscInfo">
            <div className="remainingDays">
              Remaining time:{" "}
              <strong>
                {convertedDaysHoursMinutes.days}d{" "}
                {convertedDaysHoursMinutes.hours}h{" "}
                {convertedDaysHoursMinutes.minutes}m{" "}
              </strong>
            </div>
            <div className="averageSpending">
              Avg spent per day:&nbsp;
              <strong>
                {data?.currency !== undefined
                  ? displayCurrencyAndAmount(
                      data.averageSpentPerDay,
                      data.currency
                    )
                  : ""}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </StyledProgressBar>
  );
}
