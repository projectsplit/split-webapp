import {
  GroupsTotalAmountsResponse,
  UserPendingTransaction,
} from "../types";

export function createUserPendingTransactionsFromTotals(
  summary: GroupsTotalAmountsResponse | undefined
): UserPendingTransaction[] {
  if (!summary) {
    return [];
  }

  const transactions: UserPendingTransaction[] = [];

  Object.entries(summary.userOwesAmounts).forEach(([currency, amount]) => {
    transactions.push({
      userIsSender: true,
      userIsReceiver: false,
      amount,
      currency,
    });
  });

  Object.entries(summary.userIsOwedAmounts).forEach(([currency, amount]) => {
    transactions.push({
      userIsSender: false,
      userIsReceiver: true,
      amount,
      currency,
    });
  });

  return transactions;
}
