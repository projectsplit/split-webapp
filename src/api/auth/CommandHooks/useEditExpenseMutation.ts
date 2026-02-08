import { ExpenseResponseItem, Group, Guest, Member, User } from "@/types";
import { Signal } from "@preact/signals-react";
import { useEditNonGroupExpense } from "./useEditNonGroupExpense";
import { useEditExpense } from "./useEditExpense";

export const useEditExpenseMutation = (menu: Signal<string | null>,
  setIsSubmitting: (value: boolean) => void,
  nonGroupUsers: Signal<User[]>,
  nonGroupGroup: Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  makePersonalClicked: boolean,
  isNonGroupExpense: Signal<boolean> | undefined,
  selectedExpense?: Signal<ExpenseResponseItem | null>) => {

  const hasGroup = !!selectedExpense?.value?.groupId;

  const group = useEditExpense(
    menu,
    selectedExpense?.value?.groupId,
    setIsSubmitting,
    nonGroupUsers,
    nonGroupGroup,
    groupMembers,
    makePersonalClicked,
    isNonGroupExpense,
    selectedExpense
  );

  const nonGroup = useEditNonGroupExpense(
    menu,
    setIsSubmitting,
    nonGroupUsers,
    nonGroupGroup,
    groupMembers,
    makePersonalClicked,
    isNonGroupExpense,
    selectedExpense
  );

  return hasGroup ? group : nonGroup;
}