import { significantDigitsFromTicker } from "../../../helpers/openExchangeRates";
import { SpendingChartsResponse } from "../../../types";

export const getTotalLentBorrowed = (
  backendData: SpendingChartsResponse | undefined,
  currency: string
): { totalLent: number[]; totalBorrowed: number[] } => {
  const totalLent: number[] = [];
  const totalBorrowed: number[] = [];
  const digits = significantDigitsFromTicker(currency);

  if (!backendData?.items) return { totalLent, totalBorrowed };

  let prevLent = 0;
  let prevBorrowed = 0;

backendData.items.forEach((b) => {
    const diff = b.shareAmount - b.paymentAmount;
    if (diff < 0) {
      prevLent += Number(Math.abs(diff).toFixed(digits));
      totalLent.push(Number(prevLent.toFixed(digits)));
      totalBorrowed.push(Number(prevBorrowed.toFixed(digits)));
    } else if (diff > 0) {
      prevBorrowed += Number(diff.toFixed(digits));
      totalBorrowed.push(Number(prevBorrowed.toFixed(digits)));
      totalLent.push(Number(prevLent.toFixed(digits)));
    } else {
      totalLent.push(Number(prevLent.toFixed(digits)));
      totalBorrowed.push(Number(prevBorrowed.toFixed(digits)));
    }
  });
  return { totalLent, totalBorrowed };
};
