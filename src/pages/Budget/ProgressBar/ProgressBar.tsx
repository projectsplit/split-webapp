import React from 'react';
import { StyledProgressBar } from './ProgressBar.styled';
import { TbTargetArrow } from 'react-icons/tb';
import { ProgressBarProps } from '../../../interfaces';
import { displayCurrencyAndAmount } from '../../../helpers/displayCurrencyAndAmount';
import { BudgetInfoResponse } from '../../../types';
import { useTheme } from 'styled-components';
import { getIsoDateInfo } from '../../../helpers/getIsoDateInfo';

export default function ProgressBar({ data }: ProgressBarProps) {
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
      data.averageSpentPerDay !== undefined &&
      data.totalAmountSpent !== undefined
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
      return 'black';
    }
  };

  const convertDaysToDaysHoursAndMinutes = (
    endDate: string | undefined
  ): { days: number; hours: number; minutes: number } => {
    if (!endDate) return { days: 0, hours: 0, minutes: 0 };

    const now = new Date();
    const end = new Date(endDate);
    const diffMs = end.getTime() - now.getTime();

    if (diffMs <= 0) return { days: 0, hours: 0, minutes: 0 };

    const totalSeconds = Math.floor(diffMs / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const totalHours = Math.floor(totalMinutes / 60);
    const days = Math.floor(totalHours / 24);

    const hours = totalHours % 24;
    const minutes = totalMinutes % 60;

    return {
      days,
      hours,
      minutes,
    };
  };

  const convertedDaysHoursMinutes = convertDaysToDaysHoursAndMinutes(
    data?.endDate
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
            {startDateDecomposed.dateNumber} {startDateDecomposed.month} -{' '}
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
                    )}{' '}
                    / {displayCurrencyAndAmount(data.goal, data.currency)}
                  </strong>
                ) : (
                  ''
                )}
              </div>
            </div>
            <div className="amount">{percentage < 0 ? 0 : percentage}%</div>
          </div>
          <div className="miscInfo">
            <div className="remainingDays">
              Remaining time:{' '}
              <strong>
                {convertedDaysHoursMinutes.days}d{' '}
                {convertedDaysHoursMinutes.hours}h{' '}
                {convertedDaysHoursMinutes.minutes}m{' '}
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
                  : ''}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </StyledProgressBar>
  );
}
