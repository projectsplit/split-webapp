import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { ExpenseRequest, ExpenseResponseItem } from "../../types";
import { Signal } from "@preact/signals-react";

export const useEditExpense = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  setIsSubmitting: (value: boolean) => void,
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
        queryKey: ["groupExpenses"],
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
      await queryClient.invalidateQueries({
        queryKey: [groupId],
        exact: false,
      });
      if (selectedExpense) {
        selectedExpense.value = null;
      }
      menu.value = null;
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
};

const editExpense = async (req: ExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/expenses/edit", req);
};
