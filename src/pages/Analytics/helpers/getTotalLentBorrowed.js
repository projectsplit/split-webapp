import { significantDigitsFromTicker } from '../../../helpers/openExchangeRates';
export const getTotalLentBorrowed = (backendData, currency) => {
    const totalLent = [];
    const totalBorrowed = [];
    const digits = significantDigitsFromTicker(currency);
    if (!backendData?.items)
        return { totalLent, totalBorrowed };
    if (backendData.items[backendData.items.length - 1]?.accumulativeShareAmount ===
        0 &&
        backendData.items[backendData.items.length - 1]
            ?.accumulativePaymentAmount === 0)
        return { totalLent: [], totalBorrowed: [] };
    let prevLent = 0;
    let prevBorrowed = 0;
    backendData.items.forEach((b) => {
        const diff = b.shareAmount - b.paymentAmount;
        if (diff < 0) {
            prevLent += Number(Math.abs(diff).toFixed(digits));
            totalLent.push(Number(prevLent.toFixed(digits)));
            totalBorrowed.push(Number(prevBorrowed.toFixed(digits)));
        }
        else if (diff > 0) {
            prevBorrowed += Number(diff.toFixed(digits));
            totalBorrowed.push(Number(prevBorrowed.toFixed(digits)));
            totalLent.push(Number(prevLent.toFixed(digits)));
        }
        else {
            totalLent.push(Number(prevLent.toFixed(digits)));
            totalBorrowed.push(Number(prevBorrowed.toFixed(digits)));
        }
    });
    return { totalLent, totalBorrowed };
};
