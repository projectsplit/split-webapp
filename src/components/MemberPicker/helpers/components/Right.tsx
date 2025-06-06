import { HiLockClosed, HiLockOpen } from "react-icons/hi";
import { getSymbolFromCurrency } from "../../../../helpers/currency-symbol-map";
import { memo } from "react";
import AutoWidthInput from "../../../AutoWidthInput";
import { Signal } from "@preact/signals-react";
import { PickerMember } from "../../../../types";

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
  memberAmounts: PickerMember[];
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
  memberAmounts,
}) => {
  const totalSharesValue = memberAmounts.reduce(
    (sum, member) => sum + Number(member.screenQuantity),
    0
  );
  const formattedTotalShares = totalSharesValue === 0
    ? ""
    : Number.isInteger(totalSharesValue)
    ? totalSharesValue.toString()
    : totalSharesValue.toString().replace(/\.?0+$/, "");

  switch (category.value) {
    case "Amounts":
      return (
        <div className="right">
          <div className="inputField">
            {getSymbolFromCurrency(selectedCurrency)}
            <AutoWidthInput
              className="amount-input"
              inputMode="decimal"
              value={screenQuantity}
              onBlur={() => handleInputBlur(id)}
              onChange={(e) => changeAmount(id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              category={category.value}
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
          <div className="inputField">
            <AutoWidthInput
              className="amount-input"
              inputMode="decimal"
              value={screenQuantity}
              onBlur={() => handleInputBlur(id)}
              onChange={(e) => changeAmount(id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              category={category.value}
            />
            <div className="shares">
              <div className="fraction">
                <div className="nominatorDenominator">
                {screenQuantity === formattedTotalShares ?"":<>
                {screenQuantity === "" || screenQuantity === "0" ? (
                  <span className="numerator"></span>
                ) : screenQuantity === formattedTotalShares ? (
                  <span className="numerator">1</span>
                ) : (
                  <>
                    <span className="numerator">{screenQuantity}</span>/
                    <span className="denominator">{formattedTotalShares}</span>
                  </>
                )}
                </>}
                </div>
                <span className="shares-label">shares</span>
              </div>
            </div>
          </div>
        </div>
      );
    case "Percentages":
      return (
        <div className="right">
          <div className="inputField">
            %
            <AutoWidthInput
              className="amount-input"
              inputMode="decimal"
              value={screenQuantity}
              onBlur={() => handleInputBlur(id)}
              onChange={(e) => changeAmount(id, e.target.value)}
              onClick={(e) => e.stopPropagation()}
              category={category.value}
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
