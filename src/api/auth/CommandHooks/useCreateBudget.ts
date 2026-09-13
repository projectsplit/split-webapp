import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { NavigateFunction } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
import { CreateBudgetRequest } from '../../../types';
import routes from '@/routes';

export const useCreateBudget = (
  navigate: NavigateFunction,
  serverErrors: Signal<any[]>,
  menu: Signal<string | null>,
) => {
  const queryClient = useQueryClient();

  return useMutation<any, any, CreateBudgetRequest>({
    mutationKey: ['budgets', 'create'],
    meta: { errorHandled: true },
    mutationFn: createBudget,
    onError: (error) => {
      const errorData = error.response?.data;
      serverErrors.value = errorData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budgets'] });

      menu.value = null;
      navigate(routes.BUDGET_MANAGE, { replace: true });
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
