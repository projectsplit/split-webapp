import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { NavigateFunction } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
import { CreateBudgetRequest } from '../../../types';

export const useCreateBudget = (
  navigate: NavigateFunction,
  serverErrors: Signal<any[]>,
  menu: Signal<string | null>,
) => {
  const queryClient = useQueryClient();

  return useMutation<any, any, CreateBudgetRequest>({
    mutationKey: ['budgets', 'create'],
    mutationFn: createBudget,
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

const createBudget = async (request: CreateBudgetRequest) => {
  const response = await apiClient.post<CreateBudgetRequest>(
    `/budgets/create`,
    request
  );
  return response.data;
};
