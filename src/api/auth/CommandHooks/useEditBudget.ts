import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { NavigateFunction } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
import { EditBudgetRequest } from '../../../types';

export const useEditBudget = (
  navigate: NavigateFunction,
  serverErrors: Signal<any[]>,
  menu: Signal<string | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, any, EditBudgetRequest>({
    mutationKey: ['budgets', 'update'],
    mutationFn: editBudget,
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

const editBudget = async (request: EditBudgetRequest) => {
  const response = await apiClient.post<EditBudgetRequest>(
    `/budgets/edit`,
    request
  );
  return response.data;
};
