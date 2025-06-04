import { getSymbolFromCurrency } from "./currency-symbol-map";
import { getLocaleFromCurrency } from "./getLocaleFromCurrency";
import { significantDigitsFromTicker } from "./openExchangeRates";

export const displayCurrencyAndAmount = (
  amount: string | undefined,
  currency: string
): string => {
  const amount2decimal = parseFloat(amount ?? "0");
  const symbol = getSymbolFromCurrency(currency) ?? currency;

  if (amount2decimal < 0) {
    return `${symbol}0`;
  }

  const formatter = new Intl.NumberFormat(getLocaleFromCurrency(currency), {
    minimumFractionDigits: amount2decimal % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: amount2decimal % 1 !== 0 ? significantDigitsFromTicker(currency) : 0,
  });

  return `${symbol}${formatter.format(amount2decimal)}`;
};
