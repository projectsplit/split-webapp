import { ExpenseResponseItem, Group, Guest, Member, TransactionType, User } from "@/types";
import { Signal } from "@preact/signals-react";
import { useEditNonGroupExpense } from "./useEditNonGroupExpense";
import { useEditExpense } from "./useEditExpense";
import { useEditPersonalExpense } from "./useEditPersonalExpense";

export const useEditExpenseMutation = (menu: Signal<string | null>,
  setIsSubmitting: (value: boolean) => void,
  nonGroupUsers: Signal<User[]>,
  fromHomeGroup: Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  makePersonalClicked: boolean,
  isNonGroupExpense: Signal<boolean> | undefined,
  selectedExpense?: Signal<ExpenseResponseItem | null>) => {

  const group = useEditExpense(
    menu,
    selectedExpense?.value?.groupId,
    setIsSubmitting,
    nonGroupUsers,
    fromHomeGroup,
    groupMembers,
    makePersonalClicked,
    isNonGroupExpense,
    selectedExpense
  );

  const nonGroup = useEditNonGroupExpense(
    menu,
    setIsSubmitting,
    nonGroupUsers,
    fromHomeGroup,
    groupMembers,
    makePersonalClicked,
    isNonGroupExpense,
    selectedExpense
  );

  const personal = useEditPersonalExpense(
    menu,
    setIsSubmitting,
    nonGroupUsers,
    fromHomeGroup,
    groupMembers,
    makePersonalClicked,
    isNonGroupExpense,
    selectedExpense
  )

  if (selectedExpense?.value?.transactionType === TransactionType.Group) {
    return group;
  } else if (selectedExpense?.value?.transactionType === TransactionType.NonGroup) {
    return nonGroup;
  } else {
    return personal;
  }
}