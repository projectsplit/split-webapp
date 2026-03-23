import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { NavigateFunction } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
import { UpdateBudgetRequest } from '../../../types';

export const useUpdateBudget = (
  navigate: NavigateFunction,
  serverErrors: Signal<any[]>,
  menu: Signal<string | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, any, UpdateBudgetRequest>({
    mutationKey: ['budgets', 'update'],
    mutationFn: updateBudget,
    onError: (error) => {
      const errorData = error.response?.data;
      serverErrors.value = errorData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });

      menu.value = null;
      navigate('/budget/manage', { replace: true });
    },
  });
};

const updateBudget = async (request: UpdateBudgetRequest) => {
  const response = await apiClient.put<UpdateBudgetRequest>(
    `/budgets/update`,
    request
  );
  return response.data;
};
