import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { DeleteExpenseRequest } from "../../types";
import { apiClient } from "../apiClients";

export const useDeleteExpense = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (expenseId) => deleteExpense({ expenseId }),
    onSuccess: async () => {      
      await queryClient.refetchQueries({ queryKey: ["debts"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["groupExpenses"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["home"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["groups"], exact: false });
    }
  });
};

const deleteExpense = async (req: DeleteExpenseRequest): Promise<void> => {
  const response =  await apiClient.post<void, AxiosResponse<void>>("/expenses/delete", req);
  return response.data;
};