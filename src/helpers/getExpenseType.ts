import {
  ExpenseResponseItem,
  GroupExpenseResponseItem,
  NonGroupExpenseResponseItem,
  TransactionType,
} from '../types';

export function isGroupExpense(
  expense: ExpenseResponseItem
): expense is GroupExpenseResponseItem {
  return expense.transactionType === TransactionType.Group;
}
export function isNonGroupExpense(
  expense: ExpenseResponseItem
): expense is NonGroupExpenseResponseItem {
  return expense.transactionType === TransactionType.NonGroup;
}
