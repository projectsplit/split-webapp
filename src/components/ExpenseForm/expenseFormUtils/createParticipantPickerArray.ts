import { FormExpense, Guest, Member, PickerMember, User } from "../../../types";
import { isNonGroupExpense } from "./isNonGroupExpense";
import { isGroupExpense } from "./isGroupExpense";

export const createParticipantPickerArray = (
  groupMembers: (Member | Guest)[],
  nonGroupUsers: User[],
  expense: FormExpense | null,
  type: string,
  isCreateExpense: boolean,
  isnonGroupExpense?: boolean
): PickerMember[] => {
  let array: PickerMember[] = [];

  if (isnonGroupExpense && nonGroupUsers.length > 0) {
    array = nonGroupUsers.map((user) => {
      const participant = isNonGroupExpense(expense)
        ? expense.participants.find((p) => p.userId === user.userId)
        : undefined;
      const actualAmount = participant?.participationAmount ?? "";
      const isPercentageType = type === "Percentages";
      const isSharesType = type === "Shares";
      const expenseAmount = Number(expense?.amount);
      const participationAmount = Number(participant?.participationAmount);

      const screenQuantity =
        isPercentageType &&
        expense?.amount &&
        participant?.participationAmount &&
        !isNaN(expenseAmount) &&
        expenseAmount !== 0
          ? ((participationAmount / expenseAmount) * 100).toFixed(1)
          : isSharesType && !isCreateExpense
          ? ""
          : actualAmount;

      return {
        id: user.userId,
        actualAmount,
        screenQuantity,
        locked:
          (isNonGroupExpense(expense) &&
            expense.participants.some((p) => p.userId === user.userId)) ??
          false,
        name: user.username,
        order: 0,
        selected:
          (isNonGroupExpense(expense) &&
            expense.participants.some((p) => p.userId === user.userId)) ??
          false,
      };
    });
  } else {
    array = groupMembers.map((member) => {
      const participant =
        expense && isGroupExpense(expense)
          ? expense.participants.find((p) => p.memberId === member.id)
          : undefined;
      const actualAmount = participant?.participationAmount ?? "";
      const isPercentageType = type === "Percentages";
      const isSharesType = type === "Shares";
      const expenseAmount = Number(expense?.amount);
      const participationAmount = Number(participant?.participationAmount);

      const screenQuantity =
        isPercentageType &&
        expense?.amount &&
        participant?.participationAmount &&
        !isNaN(expenseAmount) &&
        expenseAmount !== 0
          ? ((participationAmount / expenseAmount) * 100).toFixed(1)
          : isSharesType && !isCreateExpense
          ? ""
          : actualAmount;

      return {
        id: member.id,
        actualAmount,
        screenQuantity,
        locked: isGroupExpense(expense)
          ? expense?.participants.some((p) => p.memberId === member.id) ?? false
          : false,
        name: member.name,
        order: 0,
        selected: isGroupExpense(expense)
          ? expense?.participants.some((p) => p.memberId === member.id) ?? false
          : false,
      };
    });
  }

  // Auto-select all participants for new expense
  if (isCreateExpense) {
    array = array.map((m) => ({ ...m, selected: true, order: 0 }));
  }

  return array;
};
