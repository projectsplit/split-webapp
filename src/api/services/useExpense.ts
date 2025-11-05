import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { ExpenseRequest } from "../../types";
import { Signal } from "@preact/signals-react";
import { NavigateFunction } from "react-router-dom";

export const useExpense = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  navigate: NavigateFunction,
  isSubmitting:Signal<boolean>,
  isNonGroupExpense?: Signal<boolean>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, ExpenseRequest>({
    mutationFn: (expense) => createExpense(expense),
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
        queryKey: ["groups"],
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
      isSubmitting.value=false
      menu.value = null;
      if (isNonGroupExpense && isNonGroupExpense.value) {
        navigate(`/groups/${groupId}/expenses`);
      }
    },
  });
};

const createExpense = async (req: ExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/expenses/create", req);
};
