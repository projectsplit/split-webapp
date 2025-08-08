import React from "react";
import { StyledSetUpSpendingGoal } from "./SetUpSpendingGoal.styled";

import { SetUpSpendingGoalProps } from "../../../../interfaces";
import InputMonetary from "../../../../components/InputMonetary/InputMonetary";

export default function SetUpSpendingGoal({
  menu,
  displayedAmount,
  currency,
  submitBudgetErrors,
  onChange,
}: SetUpSpendingGoalProps) {

  return (
    <StyledSetUpSpendingGoal>
      <div className="prompt">Set up your spending cap or goal</div>
      <div className="inputAndErrorsWrapper">
        <InputMonetary
          currencyMenu={menu}
          value={displayedAmount.value}
          onChange={onChange}
          currency={currency}
          $inputError={submitBudgetErrors.value.find(
            (item) => item.field === "Amount" || item.field === "Currency"
          )}
        />
        {submitBudgetErrors.value.find(
          (item) => item.field === "Amount" || item.field === "Currency"
        ) && (
          <span className="errorMsg">
            {
              submitBudgetErrors.value.find(
                (item) => item.field === "Amount" || item.field === "Currency"
              ).errorMessage
            }
          </span>
        )}
      </div>
    </StyledSetUpSpendingGoal>
  );
}
