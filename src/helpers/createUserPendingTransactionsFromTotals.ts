import {
  GroupsTotalAmountsResponse,
  UserPendingTransaction,
} from "../types";
import { createGroupsTotalSummary } from "./createGroupsTotalSummary";

export function createUserPendingTransactionsFromTotals(
  groupsTotalAmounts: GroupsTotalAmountsResponse | undefined
): UserPendingTransaction[] {

  if (groupsTotalAmounts?.groups.length===0) {
    return [];
  }
  const summary = createGroupsTotalSummary(groupsTotalAmounts)


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
