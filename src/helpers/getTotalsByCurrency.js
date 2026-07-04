import currency from 'currency.js';
export function getAllCurrencyTotals(totalSpent) {
    const totals = {};
    Object.values(totalSpent).forEach((userCurrencies) => {
        Object.entries(userCurrencies).forEach(([currencyCode, amount]) => {
            //const precision = currencyCode === "JPY" ? 0 : 2;
            totals[currencyCode] = (totals[currencyCode] ?? currency(0)).add(amount);
        });
    });
    return Object.fromEntries(Object.entries(totals).map(([currencyCode, total]) => [
        currencyCode,
        total.value,
    ]));
}
export function getCurrencyValues(totalSpent, id) {
    if (!id || !totalSpent[id]) {
        return {};
    }
    return totalSpent[id];
}
