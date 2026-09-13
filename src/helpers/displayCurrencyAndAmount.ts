import { getSymbolFromCurrency } from './currency-symbol-map';
import { getLocaleFromCurrency } from './getLocaleFromCurrency';
import { significantDigitsFromTicker } from './openExchangeRates';

export const displayCurrencyAndAmount = (
  amount: string | undefined,
  currency: string
): string => {
  const amount2decimal = Number.isFinite(parseFloat(amount ?? '0'))
    ? parseFloat(amount ?? '0')
    : 0;
  const symbol = getSymbolFromCurrency(currency) ?? currency;

  if (amount2decimal < 0) {
    return `${symbol}0`;
  }

  const maxDigits = significantDigitsFromTicker(currency);
  const isInteger = amount2decimal % 1 === 0;

  const formatter = new Intl.NumberFormat(getLocaleFromCurrency(currency), {
    minimumFractionDigits: isInteger ? 0 : Math.min(2, maxDigits),
    maximumFractionDigits: maxDigits,
  });

  return `${symbol}${formatter.format(amount2decimal)}`;
};

export const displayMoneyFixed = (
  amount: string | number | undefined,
  currency: string
): string => {
  const value = Number.isFinite(parseFloat(String(amount ?? '0')))
    ? parseFloat(String(amount ?? '0'))
    : 0;
  const symbol = getSymbolFromCurrency(currency) ?? currency;

  if (value < 0) return `${symbol}0.00`;

  const maxDigits = significantDigitsFromTicker(currency);
  const digits = Math.min(2, maxDigits);

  const formatter = new Intl.NumberFormat(getLocaleFromCurrency(currency), {
    minimumFractionDigits: digits,
    maximumFractionDigits: Math.max(digits, maxDigits),
  });

  return `${symbol}${formatter.format(value)}`;
};
