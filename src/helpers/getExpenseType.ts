import {
  ExpenseResponseItem,
  ExpenseType,
  GroupExpenseResponseItem,
  NonGroupExpenseResponseItem,
} from "../types";



export function isGroupExpense(
  expense: ExpenseResponseItem
): expense is GroupExpenseResponseItem {
  return expense.groupId !== undefined;
}

export function isNonGroupExpense(
  expense: ExpenseResponseItem
): expense is NonGroupExpenseResponseItem {
  return (
    expense.groupId === undefined &&
    ((!!expense.payments &&
      expense.payments.length > 0 &&
      "userId" in expense.payments[0]) ||
      (!!expense.shares &&
        expense.shares.length > 0 &&
        "userId" in expense.shares[0]))
  );
}

export const getExpenseType = (
  expense: ExpenseResponseItem | undefined
): ExpenseType => {
  if (!expense) {
    return "undefined expense";
  }
  if (isGroupExpense(expense)) {
    return "Group";
  }
  if (isNonGroupExpense(expense)) {
    return "NonGroup";
  }
  
  return "Personal";
};
