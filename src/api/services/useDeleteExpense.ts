import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { DeleteExpenseRequest, ExpenseResponseItem } from "../../types";
import { apiClient } from "../apiClients";
import { Signal } from "@preact/signals-react";

export const useDeleteExpense = (
  menu: Signal<string | null>,
  errorMessage: Signal<string>,
  selectedExpense: Signal<ExpenseResponseItem | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (expenseId) => deleteExpense({ expenseId }),
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
    onError: (err) => {
      const error = err as AxiosError;
      errorMessage.value = String(error.response?.data);
      selectedExpense.value = null;
    },
  });
};

const deleteExpense = async (req: DeleteExpenseRequest): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    "/expenses/delete",
    req
  );
  return response.data;
};
