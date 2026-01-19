import { FormExpense, Guest, Member, PickerMember, User } from "../../../types";
import { isNonGroupExpense } from "./isNonGroupExpense";
import { isGroupExpense } from "./isGroupExpense";

export const createPayerPickerArray = (
  groupMembers: (Member | Guest)[],
  nonGroupUsers: User[],
  expense: FormExpense | null,
  type: string,
  isCreateExpense: boolean,
  userId: string,
  userMemberId: string | undefined,
  isnonGroupExpense?: boolean,
  currentAmount?: string
): PickerMember[] => {
  let array: PickerMember[] = [];

  if (isnonGroupExpense && nonGroupUsers.length > 0) {
    array = nonGroupUsers.map((user) => {
      const payer = isNonGroupExpense(expense)
        ? expense.payers.find((p) => p.userId === user.userId)
        : undefined;
      const actualAmount = payer?.paymentAmount ?? "";
      const isPercentageType = type === "Percentages";
      const isSharesType = type === "Shares";
      const expenseAmount = Number(expense?.amount);
      const paymentAmount = Number(payer?.paymentAmount);

      const screenQuantity =
        isPercentageType &&
        expense?.amount &&
        payer?.paymentAmount &&
        !isNaN(expenseAmount) &&
        expenseAmount !== 0
          ? ((paymentAmount / expenseAmount) * 100).toFixed(1)
          : isSharesType && !isCreateExpense
          ? ""
          : actualAmount;

      return {
        id: user.userId,
        actualAmount,
        screenQuantity,
        locked:
          (isNonGroupExpense(expense) &&
            expense.payers.some((p) => p.userId === user.userId)) ??
          false,
        name: user.username,
        order: 0,
        selected:
          (isNonGroupExpense(expense) &&
            expense.payers.some((p) => p.userId === user.userId)) ??
          false,
      };
    });
  } else {
    array = groupMembers.map((member) => {
      const payer =
        expense && isGroupExpense(expense)
          ? expense.payers.find((p) => p.memberId === member.id)
          : undefined;
      const actualAmount = payer?.paymentAmount ?? "";
      const isPercentageType = type === "Percentages";
      const isSharesType = type === "Shares";
      const expenseAmount = Number(expense?.amount);
      const paymentAmount = Number(payer?.paymentAmount);

      const screenQuantity =
        isPercentageType &&
        expense?.amount &&
        payer?.paymentAmount &&
        !isNaN(expenseAmount) &&
        expenseAmount !== 0
          ? ((paymentAmount / expenseAmount) * 100).toFixed(1)
          : isSharesType && !isCreateExpense
          ? ""
          : actualAmount;

      return {
        id: member.id,
        actualAmount,
        screenQuantity,
        locked: isGroupExpense(expense)
          ? expense?.payers.some((p) => p.memberId === member.id) ?? false
          : false,
        name: member.name,
        order: 0,
        selected: isGroupExpense(expense)
          ? expense?.payers.some((p) => p.memberId === member.id) ?? false
          : false,
      };
    });
  }

  // Auto-select the current user as payer for new expense
  if (isCreateExpense) {
    const selectedId =
      isnonGroupExpense && nonGroupUsers.length > 0 ? userId : userMemberId;
    array = array.map((m) => {
      const isSelected = m.id === selectedId;
      return {
        ...m,
        selected: isSelected,
        order: 0,
        actualAmount:
          isSelected && currentAmount ? currentAmount : m.actualAmount,
      };
    });
  }

  return array;
};
