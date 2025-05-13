import { useMutation, useQueryClient,UseMutationResult } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import {  ExpenseRequest, ExpenseResponseItem } from "../../types";
import { Signal } from "@preact/signals-react";

export const useEditExpense = (
  menu: Signal<string | null>,
  selectedExpense: Signal<ExpenseResponseItem | null>,
  groupId:string
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, ExpenseRequest>({
    mutationFn: (expense) => editExpense(expense),
    onSuccess: async () => {
      selectedExpense.value = null;
      menu.value = null;

      await queryClient.invalidateQueries({ queryKey: ["debts"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["groupExpenses"],
        exact: false,
      });
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["groups"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: [groupId],
        exact: false,
      });
    },
  });
};

const editExpense = async (req: ExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/expenses/edit", req);
};
