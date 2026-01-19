import { FormExpense, FormNonGroupExpense } from "../../../types";

export function isNonGroupExpense(
  expense: FormExpense | null
): expense is FormNonGroupExpense {
  return !!expense && expense.groupId === undefined;
}
