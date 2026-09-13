import OnTrackMessage from './OnTrackMessage/OnTrackMessage';
import OverspentMessage from './OverspentMessage/OverspentMessage';
import ReceivedMoreThanSpentMessage from './ReceivedMoreThanSpentMessage/ReceivedMoreThanSpentMessage';
import Recommendation from './Recommendation/Recommendation';
import SimpleOnTrackMessage from './SimpleOnTrackMessage/SimpleOnTrackMessage';
import { BudgetInfoResponse } from '../../types';
import { NoBudgetSubmittedMessage } from './NoBudgetSubmittedMessage/NoBudgetSubmittedMessage';
import { dateIsInPast } from '../../helpers/dateIsInPast';

export const BudgetInfoMessage = (
  closeButton: boolean,
  data: BudgetInfoResponse | undefined,
  noSubmissions?: boolean,
  onclick?: (event: React.MouseEvent<HTMLDivElement>) => void,
  style?: React.CSSProperties,
  timeZoneId?: string
): JSX.Element => {
  if (data === undefined) {
    return <NoBudgetSubmittedMessage noSubmissions={noSubmissions} />;
  }

  if (dateIsInPast(data.endDate, timeZoneId)) {
    return (
      <SimpleOnTrackMessage
        endDate={data.endDate}
        timeZoneId={timeZoneId}
        onClick={onclick}
        closeButton={closeButton}
        style={style}
      />
    );
  }

  const totalAmountSpent = parseFloat(data?.totalAmountSpent);

  if (
    data?.remainingDays !== undefined &&
    data?.goal !== undefined &&
    data?.averageSpentPerDay !== undefined &&
    data?.frequency !== undefined
  ) {
    const remainingDays = parseFloat(data?.remainingDays);
    const averageSpentPerDay = parseFloat(data?.averageSpentPerDay);
    const goal = parseFloat(data?.goal);
    const spendingProjection =
      totalAmountSpent + remainingDays * averageSpentPerDay;

    if (totalAmountSpent === 0)
      return (
        <SimpleOnTrackMessage
          startDate={data?.startDate}
          timeZoneId={timeZoneId}
          onClick={onclick}
          closeButton={closeButton}
          style={style}
        />
      );

    if (totalAmountSpent < 0)
      return (
        <ReceivedMoreThanSpentMessage
          onClick={onclick}
          amount={totalAmountSpent.toString()}
          currency={data.currency}
          closeButton={closeButton}
          budgetFrequency={data.frequency}
          style={style}
        />
      );
    if (totalAmountSpent >= goal) {
      const overspentBy = (totalAmountSpent - goal).toFixed(2);
      const offBudgetAmount = (spendingProjection - goal).toFixed(2);
      return (
        <OverspentMessage
          onClick={onclick}
          overspent={totalAmountSpent > goal}
          offBudgetAmount={offBudgetAmount}
          overspentBy={overspentBy}
          currency={data.currency}
          closeButton={closeButton}
          budgetFrequency={data.frequency}
          style={style}
        />
      );
    } else {
      const isOnTarget = spendingProjection - goal > 0 ? false : true;

      if (!isOnTarget) {
        const offBudgetBy = (spendingProjection - goal).toFixed(2);
        const reachCapInDays = (
          (goal - totalAmountSpent) /
          averageSpentPerDay
        ).toFixed(1);
        const reduceByRecommendation = (
          averageSpentPerDay -
          (goal - totalAmountSpent) / remainingDays
        ).toFixed(2);

        return (
          <Recommendation
            onClick={onclick}
            days={reachCapInDays}
            offBudgetAmount={offBudgetBy}
            reduceAmount={reduceByRecommendation}
            currency={data.currency}
            closeButton={closeButton}
            budgetFrequency={data.frequency}
            style={style}
          />
        );
      } else {
        const onTargetAmount = (goal - spendingProjection).toFixed(2);
        return (
          <OnTrackMessage
            onClick={onclick}
            amount={onTargetAmount}
            currency={data.currency}
            closeButton={closeButton}
            budgetFrequency={data.frequency}
            style={style}
          />
        );
      }
    }
  } else {
    return (
      <div>
        <p>
          Some required budget data is missing. Cannot calculate projections.
        </p>
      </div>
    );
  }
};
