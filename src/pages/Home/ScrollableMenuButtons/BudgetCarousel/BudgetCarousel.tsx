import React from 'react';
import IonIcon from '@reacticons/ionicons';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { BudgetInfoResponse, Frequency } from '@/types';
import { displayMoneyFixed } from '@/helpers/displayCurrencyAndAmount';
import { StyledBudgetCarousel } from './BudgetCarousel.styled';
import { elapsedPercent, pct } from '@/helpers/budgetProgress';

export const BudgetCarousel = ({
  activeBudgetData,
  setShowBudgetInfo,
  setShowButton,
  onClick,
}: BudgetCarouselProps) => {
  const spent = parseFloat(activeBudgetData?.totalAmountSpent ?? '0') || 0;
  const cap = parseFloat(activeBudgetData?.goal ?? '0') || 0;
  const currency = activeBudgetData?.currency ?? '';

  const capUsed = pct(spent, cap);
  const cycleElapsed = elapsedPercent(
    activeBudgetData?.startDate,
    activeBudgetData?.endDate
  );

  const days = Math.max(
    0,
    Math.ceil(parseFloat(activeBudgetData?.remainingDays ?? '0') || 0)
  );

  const frequencyLabel =
    activeBudgetData?.frequency !== undefined
      ? Frequency[activeBudgetData.frequency]
      : '';

  return (
    <StyledBudgetCarousel>
      <div className="budgetHeader">
        <div className="budgetLabel">{frequencyLabel} budget</div>
        <div className="budgetAside">
          {days} {days === 1 ? 'day' : 'days'} left
        </div>
      </div>

      <div className="budgetCard" onClick={onClick}>
        <div
          className="budgetClose"
          onClick={(e: React.MouseEvent) => {
            e.stopPropagation();
            setShowBudgetInfo(false);
            setShowButton(true);
          }}
        >
          <IonIcon name="close-outline" />
        </div>

        <div className="budgetFigures">
          <div className="budgetSpent">
            {displayMoneyFixed(spent.toString(), currency)}
          </div>
          <div className="budgetCap">
            of {displayMoneyFixed(cap.toString(), currency)}
          </div>
        </div>

        <div className="budgetTrack">
          <div className="budgetFill" style={{ width: `${capUsed}%` }} />
          <div className="budgetMarker" style={{ left: `${cycleElapsed}%` }} />
        </div>

        <div className="budgetCaptions">
          <span>{Math.round(capUsed)}% of cap used</span>
          <span>{Math.round(cycleElapsed)}% of cycle elapsed</span>
        </div>
      </div>
    </StyledBudgetCarousel>
  );
};

interface BudgetCarouselProps {
  activeBudgetData: BudgetInfoResponse | undefined;
  setShowBudgetInfo: UseMutateAsyncFunction<
    any,
    AxiosError<unknown, any>,
    boolean,
    unknown
  >;
  setShowButton: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: React.MouseEventHandler<HTMLDivElement>;
  timeZoneId?: string;
}
