import currency from "currency.js";
import { TotalSpent } from "../types";

export function getGroupTotalByCurrency(
  totalSpent: TotalSpent,
  currencyCode: string | undefined
): number {
  if (!currencyCode) {
    return 0;
  }
  return Object.values(totalSpent).reduce(
    (sum: currency, userCurrencies: Record<string, number>) => {
      const value = userCurrencies[currencyCode] ?? 0;
      return sum.add(value);
    },
    currency(0)
  ).value;
}

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
    userMemberId: string | undefined
  ): Record<string, number> {
    if (!userMemberId || !totalSpent[userMemberId]) {
      return {};
    }
  
    return totalSpent[userMemberId];
  }