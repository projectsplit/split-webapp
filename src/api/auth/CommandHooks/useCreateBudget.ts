import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { NavigateFunction } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
import { CreateBudgetRequest } from '../../../types';

export const useCreateBudget = (
  navigate: NavigateFunction,
  submitBudgetErrors: Signal<any[]>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, any, CreateBudgetRequest>({
    mutationKey: ['budget', 'create'],
    mutationFn: createBudget,
    onError: (error) => {
      const errorData = error.response?.data;
      submitBudgetErrors.value = Array.isArray(errorData) ? errorData : [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'], exact: false });
      navigate('/budget/current', { replace: true });
    },
  });
};

const createBudget = async (request: CreateBudgetRequest) => {
  console.log(request)
  const response = await apiClient.post<CreateBudgetRequest>(
    `/budgets/create`,
    request
  );
  return response.data;
};
