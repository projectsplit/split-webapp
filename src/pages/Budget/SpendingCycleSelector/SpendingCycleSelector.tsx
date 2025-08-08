import { StyledSpendingCycleSelector } from "./SpendingCycleSelector.styled";
import { SpendingCycleSelectorProps } from "../../../interfaces";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

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
          <FaAngleUp className="angle" />
        ) : (
           <FaAngleDown className="angle" />
        )}
      </div>
      {children}
    </StyledSpendingCycleSelector>
  );
}
