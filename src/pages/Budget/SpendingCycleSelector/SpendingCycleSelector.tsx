import { forwardRef } from 'react';
import { StyledSpendingCycleSelector } from './SpendingCycleSelector.styled';
import { SpendingCycleSelectorProps } from '../../../interfaces';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const SpendingCycleSelector = forwardRef<
  HTMLButtonElement,
  SpendingCycleSelectorProps
>(({ onClick, error, children, open, inputError }, ref) => {
  return (
    <StyledSpendingCycleSelector
      ref={ref}
      error={error}
      onClick={onClick}
      open={open}
      inputError={inputError}
    >
      <div className="currencyOption">
        {open ? (
          <FaAngleUp className="angle" />
        ) : (
          <FaAngleDown className="angle" />
        )}
      </div>
      {children}
    </StyledSpendingCycleSelector>
  );
});

export default SpendingCycleSelector;
