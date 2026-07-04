import currency from 'currency.js';
//type NetByCurrency = Record<string, number>;
export const computeNetPerCurrency = (groupedTransactions, userId) => {
    const userTransactions = groupedTransactions.filter((gt) => gt.id === userId);
    const byCurrency = new Map();
    for (const tx of userTransactions) {
        if (!byCurrency.has(tx.currency)) {
            byCurrency.set(tx.currency, {
                owedToYou: currency(0),
                youOwe: currency(0),
            });
        }
        const bucket = byCurrency.get(tx.currency);
        if (tx.isOwed) {
            bucket.owedToYou = bucket.owedToYou.subtract(tx.totalAmount);
        }
        else {
            bucket.youOwe = bucket.youOwe.subtract(tx.totalAmount);
        }
    }
    const result = {};
    for (const [curr, { owedToYou, youOwe }] of byCurrency) {
        result[curr] = owedToYou.subtract(youOwe).value;
    }
    return result;
};
