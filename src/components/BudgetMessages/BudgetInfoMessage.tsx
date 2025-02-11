import OnTrackMessage from "./OnTrackMessage/OnTrackMessage";
import OverspentMessage from "./OverspentMessage/OverspentMessage";
import ReceivedMoreThanSpentMessage from "./ReceivedMoreThanSpentMessage/ReceivedMoreThanSpentMessage";
import Recommendation from "./Recommendation/Recommendation";
import SimpleOnTrackMessage from "./SimpleOnTrackMessage/SimpleOnTrackMessage";
import { BudgetInfoResponse } from "../../types";
import { DefaultTheme } from "styled-components";

export const BudgetInfoMessage = (
  theme: DefaultTheme | undefined,
  closeButton: boolean,
  data: BudgetInfoResponse,
  onclick?: (event: React.MouseEvent<HTMLDivElement>) => void
): JSX.Element => {
  if (data.totalAmountSpent === undefined || data.currency === undefined) {
    return (
      <div>
        <p>
          Some required budget data is missing. Cannot calculate projections.
        </p>
      </div>
    );
  }
  const totalAmountSpent = parseFloat(data.totalAmountSpent);

  // Check if remainingDays, goal, and averageSpentPerDay are provided
  if (
    data.remainingDays !== undefined &&
    data.goal !== undefined &&
    data.averageSpentPerDay !== undefined &&
    data.budgetType !== undefined
  ) {
    const remainingDays = parseFloat(data.remainingDays);
    const averageSpentPerDay = parseFloat(data.averageSpentPerDay);
    const goal = parseFloat(data.goal);
    const spendingProjection =
      totalAmountSpent + remainingDays * averageSpentPerDay;
    if (totalAmountSpent === 0)
      return (
        <SimpleOnTrackMessage
          onClick={onclick}
          closeButton={closeButton}
          style={{
            backgroundColor: theme?.colors.layer2,
            borderColor: theme?.colors.layer2,
            borderStyle: "solid",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "6px",
            padding: "0.8rem",
          }}
        />
      );
      
    if (totalAmountSpent < 0)
      return (
        <ReceivedMoreThanSpentMessage
          onClick={onclick}
          amount={totalAmountSpent.toString()}
          currency={data.currency}
          closeButton={closeButton}
          budgetType={data.budgetType}
          style={{
            backgroundColor: theme?.colors.layer2,
            borderColor: theme?.colors.layer2,
            borderStyle: "solid",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "6px",
            padding: "0.8rem",
          }}
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
          budgetType={data.budgetType}
          style={{
            backgroundColor: theme?.colors.layer2,
            borderColor: theme?.colors.layer2,
            borderStyle: "solid",
            // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: "6px",
            padding: "0.8rem",
          }}
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
            budgetType={data.budgetType}
            style={{
              backgroundColor: theme?.colors.layer2,
              borderColor: theme?.colors.layer2,
              borderStyle: "solid",
              //boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "6px",
              padding: "0.8rem",
            }}
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
            budgetType={data.budgetType}
            style={{
              backgroundColor: theme?.colors.layer2,
              borderColor: theme?.colors.layer2,
              borderStyle: "solid",
              //boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              borderRadius: "6px",
              padding: "0.8rem",
            }}
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
