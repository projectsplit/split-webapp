import { useMutation, useQueryClient,UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { ExpenseRequest } from "../../types";
import { Signal } from "@preact/signals-react";

export const useExpense = (menu: Signal<string | null>, groupId:string) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, ExpenseRequest>({
    mutationFn: (expense) => createExpense(expense),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["debts"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["groupExpenses"],
        exact: false,
      });
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["groups"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["mostRecentGroup"], exact: false });
      await queryClient.invalidateQueries({ queryKey: [groupId], exact: false });
      menu.value = null;
    },
  });
};

const createExpense = async (req: ExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/expenses/create", req);
};
