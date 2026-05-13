import React from 'react';
import { StyledSetUpSpendingGoal } from './SetUpSpendingGoal.styled';

import { SetUpSpendingGoalProps } from '../../../../interfaces';
import InputMonetary from '../../../../components/InputMonetary/InputMonetary';

export default function SetUpSpendingGoal({
  menu,
  displayedAmount,
  selectedCurrency,
  onChange,
  $inputError,
}: SetUpSpendingGoalProps) {
  return (
    <StyledSetUpSpendingGoal>
      <div className="prompt">Spending goal</div>
      <div className="inputAndErrorsWrapper">
        <InputMonetary
          currencyMenu={menu}
          value={displayedAmount.value}
          onChange={onChange}
          selectedCurrency={selectedCurrency}
          $inputError={$inputError}
        />
      </div>
    </StyledSetUpSpendingGoal>
  );
}
