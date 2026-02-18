import { Signal } from "@preact/signals-react";
import { NavigateFunction } from "react-router-dom";
import {
  ExpenseRequest,
  GroupExpenseRequest,
  NonGroupExpenseRequest,
  PersonalExpenseRequest,
  Group,
  Guest,
  Member,
  User,
} from "@/types";
import { useCreateGroupExpense } from "@/api/auth/CommandHooks/useCreateGroupExpense";
import { useCreateNonGroupExpense } from "@/api/auth/CommandHooks/useCreateNonGroupExpense";
import { useCreatePersonalExpense } from "@/api/auth/CommandHooks/useCreatePersonalExpense";

export const useCreateExpenseMutation = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  navigate: NavigateFunction,
  setIsSubmitting: (value: boolean) => void,
  makePersonalClicked: boolean,
  nonGroupUsers: Signal<User[]>,
  nonGroupGroup: Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  fromHome: boolean | undefined,
  isnonGroupExpense: Signal<boolean> | undefined
) => {
  const { mutate: createGroupExpenseMutation, isPending: isPendingCreateGroupExpense } =
    useCreateGroupExpense(
      menu,
      groupId,
      navigate,
      setIsSubmitting,
      makePersonalClicked,
      nonGroupUsers,
      nonGroupGroup,
      groupMembers,
      fromHome
    );

  const { mutate: createNonGroupExpenseMutation, isPending: isPendingCreateNonGroupExpense } =
    useCreateNonGroupExpense(
      menu,
      navigate,
      setIsSubmitting,
      nonGroupUsers,
      nonGroupGroup,
      groupMembers,
      makePersonalClicked
    );

  const { mutate: createPersonalExpenseMutation, isPending: isPendingCreatePersonalExpense } =
    useCreatePersonalExpense(menu, setIsSubmitting);

  const mutate = (req: ExpenseRequest) => {
    if (isnonGroupExpense?.value) {
      createNonGroupExpenseMutation(req as NonGroupExpenseRequest);
    } else if (groupId) {
      createGroupExpenseMutation(req as GroupExpenseRequest);
    } else {
      createPersonalExpenseMutation(req as PersonalExpenseRequest);
    }
  };

  const isPending = isnonGroupExpense?.value
    ? isPendingCreateNonGroupExpense
    : groupId
      ? isPendingCreateGroupExpense
      : isPendingCreatePersonalExpense;

  return { mutate, isPending };
};
