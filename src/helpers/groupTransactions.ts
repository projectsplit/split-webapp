import currency from "currency.js";
import { GroupedTransaction, PendingTransaction } from "../types";

export function groupTransactions(
  transactions: PendingTransaction[]
): GroupedTransaction[] {
  const groupedMap = new Map<string, GroupedTransaction>();

  for (const transaction of transactions) {
    // Group by receiverId
    const receiverKey = `receiver-${transaction.currency}-${transaction.receiverId}`;

    if (!groupedMap.has(receiverKey)) {
      groupedMap.set(receiverKey, {
        totalAmount: currency(0, { symbol: "" }),
        currency: transaction.currency,
        id: transaction.receiverId,
        isOwed: true,
        isUser: transaction.receiverId===transaction.userMemberId,
        name: transaction.receiverName,
      });
    }
    groupedMap.get(receiverKey)!.totalAmount = currency(
      groupedMap.get(receiverKey)!.totalAmount
    ).add(transaction.amount);

    // Group by senderId
    const senderKey = `sender-${transaction.currency}-${transaction.senderId}`;
  
    if (!groupedMap.has(senderKey)) {
      groupedMap.set(senderKey, {
        totalAmount: currency(0, { symbol: "" }),
        currency: transaction.currency,
        id: transaction.senderId,
        isOwed: false,
        isUser: transaction.senderId===transaction.userMemberId,
        name: transaction.senderName,
      });
    }
    groupedMap.get(senderKey)!.totalAmount = currency(
      groupedMap.get(senderKey)!.totalAmount
    ).add(transaction.amount);
  }

  return Array.from(groupedMap.values());
}
