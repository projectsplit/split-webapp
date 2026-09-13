import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { DeleteExpenseRequest, ExpenseResponseItem } from '../../../types';
import { apiClient } from '../../apiClients';
import { Signal } from '@preact/signals-react';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';

export const useDeleteNonGroupExpense = (
  menu: Signal<string | null>,
  errorMessage: Signal<string>,
  selectedExpense: Signal<ExpenseResponseItem | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    meta: { errorHandled: true },
    mutationFn: (expenseId) => deleteExpense({ expenseId }),
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [
        'nonGroupDebts',
        'nonGroupExpenses',
        'personalExpenses',
        'home',
        'shared',
        'mostRecentGroup',
        'cumulativeArray',
      ]);
      selectedExpense.value = null;
      menu.value = null;
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
    '/expenses/delete-non-group',
    req
  );
  return response.data;
};
