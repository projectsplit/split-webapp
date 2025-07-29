import { StyledSpendingCycleSelector } from "./SpendingCycleSelector.styled";
import { SpendingCycleSelectorProps } from "../../../interfaces";

export default function SpendingCycleSelector({
  onClick,
  error,
  children,
  open,
  inputError
}: SpendingCycleSelectorProps) {
  return (
    <StyledSpendingCycleSelector error={error} onClick={onClick} open={open} inputError={inputError}>
      <div className="currencyOption">
        {open ? (
          <i className="angle up icon"></i>
        ) : (
          <i className="angle down icon"></i>
        )}
      </div>
      {children}
    </StyledSpendingCycleSelector>
  );
}
