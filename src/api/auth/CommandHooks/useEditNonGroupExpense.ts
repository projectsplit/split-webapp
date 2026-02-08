import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import {
  ExpenseRequest,
  ExpenseResponseItem,
  Group,
  Guest,
  Member,
  User,
} from "../../../types";
import { Signal } from "@preact/signals-react";

export const useEditNonGroupExpense = (
  menu: Signal<string | null>,
  setIsSubmitting: (value: boolean) => void,
  nonGroupUsers: Signal<User[]>,
  nonGroupGroup: Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  makePersonalClicked: boolean,
  isNonGroupExpense: Signal<boolean> | undefined,
  selectedExpense?: Signal<ExpenseResponseItem | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, ExpenseRequest>({
    mutationFn: (expense) => editExpense(expense),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["debts"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["nonGroupExpenses"],
        exact: false,
      });
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["shared"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });
      if (selectedExpense) {
        selectedExpense.value = null;
      }
      if (isNonGroupExpense && isNonGroupExpense.value) {
        const data = {
          nonGroupUsers: nonGroupUsers.value,
          nonGroupGroup: nonGroupGroup?.value,
          groupMembers: groupMembers.value,
        };
        if (
          groupMembers.value.length > 0 ||
          nonGroupUsers.value.length > 0 ||
          nonGroupGroup?.value
        )
          localStorage.setItem("submittedFromHomePersistData", JSON.stringify(data));
      }
      if (makePersonalClicked) {
        localStorage.removeItem("submittedFromHomePersistData");
      }
      menu.value = null;
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
};

const editExpense = async (req: ExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/expenses/edit-non-group", req);
};
