import currency from 'currency.js';
export function groupTransactions(transactions, members, userId) {
    const groupedMap = new Map();
    for (const transaction of transactions) {
        // Group by receiverId
        const receiverKey = `receiver-${transaction.currency}-${transaction.creditor}`;
        if (!groupedMap.has(receiverKey)) {
            groupedMap.set(receiverKey, {
                totalAmount: currency(0, { symbol: '' }),
                currency: transaction.currency,
                id: transaction.creditor,
                isOwed: true,
                isUser: transaction.creditor === userId,
                name: members.find((member) => member.id === transaction.creditor)?.name ||
                    '',
            });
        }
        groupedMap.get(receiverKey).totalAmount = currency(groupedMap.get(receiverKey).totalAmount).add(transaction.amount);
        // Group by senderId
        const senderKey = `sender-${transaction.currency}-${transaction.debtor}`;
        if (!groupedMap.has(senderKey)) {
            groupedMap.set(senderKey, {
                totalAmount: currency(0, { symbol: '' }),
                currency: transaction.currency,
                id: transaction.debtor,
                isOwed: false,
                isUser: transaction.debtor === userId,
                name: members.find((member) => member.id === transaction.debtor)?.name ||
                    '',
            });
        }
        groupedMap.get(senderKey).totalAmount = currency(groupedMap.get(senderKey).totalAmount).add(transaction.amount);
    }
    return Array.from(groupedMap.values());
}
