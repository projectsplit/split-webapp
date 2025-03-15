import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExpense } from "./api";
import { AxiosError } from "axios";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (expenseId) => deleteExpense({ expenseId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["groupExpenses"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["debts"],
        exact: false,
      });
    }
  });
};
