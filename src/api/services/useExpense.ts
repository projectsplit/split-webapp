import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { CreateExpenseRequest } from "../../types";
import { Signal } from "@preact/signals-react";

export const useExpense = (menu: Signal<string | null>) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateExpenseRequest>({
    mutationFn: (expense) => createExpense(expense),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["debts"], exact: false });
      await queryClient.refetchQueries({
        queryKey: ["groupExpenses"],
        exact: false,
      });
      await queryClient.refetchQueries({ queryKey: ["home"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["groups"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["mostRecentGroup"], exact: false });
      menu.value = null;
    },
  });
};

const createExpense = async (req: CreateExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/expenses/create", req);
};
