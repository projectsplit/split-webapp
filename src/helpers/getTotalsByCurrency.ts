import currency from "currency.js";
import { TotalSpent } from "../types";

export function getAllCurrencyTotals(
  totalSpent: TotalSpent
): Record<string, number> {
  const totals: Record<string, currency> = {};

  Object.values(totalSpent).forEach((userCurrencies) => {
    Object.entries(userCurrencies).forEach(([currencyCode, amount]) => {
      //const precision = currencyCode === "JPY" ? 0 : 2;
      totals[currencyCode] = (
        totals[currencyCode] ?? currency(0)
      ).add(amount);
    });
  });

  return Object.fromEntries(
    Object.entries(totals).map(([currencyCode, total]) => [
      currencyCode,
      total.value,
    ])
  );
}

export function getCurrencyValues(
    totalSpent: TotalSpent,
    id: string | undefined
  ): Record<string, number> {
    if (!id || !totalSpent[id]) {
      return {} ;
    }
  
    return totalSpent[id];
  }