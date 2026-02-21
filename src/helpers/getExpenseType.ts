import {
  ExpenseResponseItem,
  GroupExpenseResponseItem,
  NonGroupExpenseResponseItem,
  PersonalExpenseResponseItem,
  TransactionType,
} from "../types";



export function isGroupExpense(expense: ExpenseResponseItem): expense is GroupExpenseResponseItem {
  return expense.transactionType === TransactionType.Group;
}
export function isNonGroupExpense(expense: ExpenseResponseItem): expense is NonGroupExpenseResponseItem {
  return expense.transactionType === TransactionType.NonGroup;
}
export function isPersonalExpense(expense: ExpenseResponseItem): expense is PersonalExpenseResponseItem {
  return expense.transactionType === TransactionType.Personal;
}

