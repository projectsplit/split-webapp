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
  changeAmount: (id: string, e: React.ChangeEvent<HTMLInputElement>) => void;
  toggleLock: (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    id: string
  ) => void;
  category: Signal<string>;
  memberAmounts: PickerMember[];
  inputRef: (el: HTMLInputElement | null) => void;
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
  inputRef,
}) => {
  
  const totalSharesValue = memberAmounts.reduce(
    (sum, member) => sum + Number(member.screenQuantity),
    0
  );
  const formattedTotalShares = totalSharesValue === 0
    ? ""
    : Number(totalSharesValue).toFixed(2).replace(/\.?0+$/, "");

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
              onChange={(e) => changeAmount(id, e)}
              onClick={(e) => e.stopPropagation()}
              category={category.value}
              ref={inputRef}
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
              onChange={(e) => changeAmount(id, e)}
              onClick={(e) => e.stopPropagation()}
              category={category.value}
              ref={inputRef}
            />
            <div className="shares">
              <div className="fraction">
                <div className="nominatorDenominator">
                  {screenQuantity === formattedTotalShares ? "" : <>
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
              onChange={(e) => changeAmount(id, e)}
              onClick={(e) => e.stopPropagation()}
              category={category.value}
              ref={inputRef}
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
