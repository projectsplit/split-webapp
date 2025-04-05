import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { CreateEditExpenseRequest, ExpenseResponseItem } from "../../types";
import { Signal } from "@preact/signals-react";

export const useEditExpense = (
  menu: Signal<string | null>,
  selectedExpense: Signal<ExpenseResponseItem | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateEditExpenseRequest>({
    mutationFn: (expense) => editExpense(expense),
    onSuccess: async () => {
      selectedExpense.value = null;
      menu.value = null;
      await queryClient.refetchQueries({ queryKey: ["debts"], exact: false });
      await queryClient.refetchQueries({
        queryKey: ["groupExpenses"],
        exact: false,
      });
      await queryClient.refetchQueries({ queryKey: ["home"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["groups"], exact: false });
      await queryClient.refetchQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });
    },
  });
};

const editExpense = async (req: CreateEditExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/expenses/edit", req);
};
