import { FormExpense, FormGroupExpense } from "../../../types";

export function isGroupExpense(
  expense: FormExpense | null
): expense is FormGroupExpense {
  return !!expense && expense.groupId !== undefined;
}
