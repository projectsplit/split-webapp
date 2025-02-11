import { getLocaleFromCurrency } from "./getLocaleFromCurrency";

export const displayCurrencyAndAmount = (
  amount: string | undefined,
  currency: string
): string => {

  const amount2decimal = parseFloat(amount ?? "0");

  if (amount2decimal < 0)
    return  new Intl.NumberFormat(getLocaleFromCurrency(currency), {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0

    }).format(0);

  if (amount2decimal % 1 !== 0) { //check is if it is decimal
    return  new Intl.NumberFormat(getLocaleFromCurrency(currency), {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 2
    }).format(amount2decimal);
  } else {
    return  new Intl.NumberFormat(getLocaleFromCurrency(currency), {
      style: "currency",
      currency: currency,
      maximumFractionDigits: 0
    }).format(amount2decimal);
  }
};
