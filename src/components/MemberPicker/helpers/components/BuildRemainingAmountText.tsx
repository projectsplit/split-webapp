import { displayCurrencyAndAmount } from "../../../../helpers/displayCurrencyAndAmount";
import { significantDigitsFromTicker } from "../../../../helpers/openExchangeRates";

export const BuildRemainingAmountText = (
  totalSelectedAmount: number,
  selectedCurrency: string,
  totalAmount: number
) => {
  const difference = totalAmount - totalSelectedAmount;

  return (
    <div className="secondRow">
      {difference > 0 ? (
        <div>
          <span className="greenText">
            {displayCurrencyAndAmount(
              Math.abs(difference)
                .toFixed(significantDigitsFromTicker(selectedCurrency))
                .toString(),
              selectedCurrency
            )}
          </span>{" "}
          <span className="text">to allocate</span>
        </div>
      ) : difference < 0 ? (
        <div>
          <span className="redText">
            {displayCurrencyAndAmount(
              Math.abs(difference)
                .toFixed(significantDigitsFromTicker(selectedCurrency))
                .toString(),
              selectedCurrency
            )}
          </span>{" "}
          <span className="text">over</span>
        </div>
      ) : null}
    </div>
  );
};
