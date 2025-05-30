import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import { getSymbolFromCurrency } from "../../../../helpers/currency-symbol-map";
import { memo } from "react";
import AutoWidthInput from "../../../AutoWidthInput";
import { Signal } from "@preact/signals-react";

interface RightProps {
  screenQuantity: string;
  id: string;
  locked: boolean;
  selectedCurrency: string;
  handleInputBlur: (id: string) => void;
  changeAmount: (id: string, amount: string) => void;
  toggleLock: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => void;
  category: Signal<string>;
}

const Right: React.FC<RightProps> = ({
  screenQuantity,
  id,
  locked,
  selectedCurrency,
  handleInputBlur,
  changeAmount,
  toggleLock,
  category,
}) => {
  switch (category.value) {
    case "Amounts":
      return (
        <div className="right">
          <div>
            {getSymbolFromCurrency(selectedCurrency)}
            <AutoWidthInput
              className="amount-input"
              inputMode="decimal"
              value={screenQuantity}
              onBlur={() => handleInputBlur(id)}
              onChange={(e) => changeAmount(id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div onClick={(e) => toggleLock(e, id)}>
            {locked ? (
              <HiLockClosed className="locked-icon" />
            ) : (
              <HiLockOpen className="unlocked-icon" />
            )}
          </div>
        </div>
      );
    case "Shares":
      return (
        <div className="right">
          <div>
            
            <AutoWidthInput
              className="amount-input"
              inputMode="numeric"
              value={screenQuantity}
              onBlur={() => handleInputBlur(id)}
              onChange={(e) => changeAmount(id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
            shares
          </div>
        </div>
      );
    case "Percentages":
      return (
        <div className="right">
          <div>
            %
            <AutoWidthInput
              className="amount-input"
              inputMode="decimal"
              value={screenQuantity}
              onBlur={() => handleInputBlur(id)}
              onChange={(e) => changeAmount(id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div onClick={(e) => toggleLock(e, id)}>
            {locked ? (
              <HiLockClosed className="locked-icon" />
            ) : (
              <HiLockOpen className="unlocked-icon" />
            )}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default memo(Right);
