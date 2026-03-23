import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { Signal } from '@preact/signals-react';

export const useDeleteBudget = (
  menu: Signal<string | null>,
  errorMessage: Signal<string>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (budgetId) => deleteBudget({ budgetId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['budgets'],
        exact: false,
      });

      menu.value = null;
    },
    onError: (err) => {
      const error = err as AxiosError;
      errorMessage.value = String(error.response?.data);
    },
  });
};

const deleteBudget = async (req: { budgetId: string }): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    '/budgets/delete',
    req
  );
  return response.data;
};
