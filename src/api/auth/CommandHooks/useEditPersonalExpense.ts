import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import {
  NonGroupExpenseRequest,
  ExpenseResponseItem,
  Group,
  Guest,
  Member,
  User,
  BaseExpenseRequest,
} from "../../../types";
import { Signal } from "@preact/signals-react";

export const useEditPersonalExpense = (
  menu: Signal<string | null>,
  setIsSubmitting: (value: boolean) => void,
  nonGroupUsers: Signal<User[]>,
  fromHomeGroup: Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  makePersonalClicked: boolean,
  isNonGroupExpense: Signal<boolean> | undefined,
  selectedExpense?: Signal<ExpenseResponseItem | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, BaseExpenseRequest>({
    mutationFn: (expense) => editExpense(expense),
    onSuccess: async () => {

      await queryClient.invalidateQueries({
        queryKey: ["personalExpenses"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["cumulativeArray"],
        exact: false,
      });
      if (selectedExpense) {
        selectedExpense.value = null;
      }
      if (isNonGroupExpense && isNonGroupExpense.value) {
        const data = {
          nonGroupUsers: nonGroupUsers.value,
          fromHomeGroup: fromHomeGroup?.value,
          groupMembers: groupMembers.value,
        };
        if (
          groupMembers.value.length > 0 ||
          nonGroupUsers.value.length > 0 ||
          fromHomeGroup?.value
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

const editExpense = async (req: BaseExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/expenses/edit-personal", req);
};
