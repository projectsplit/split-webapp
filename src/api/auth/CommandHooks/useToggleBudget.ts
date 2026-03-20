import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';

export const useToggleBudget = () => {
  const queryClient = useQueryClient();

  return useMutation<any, any, { budgetId: string | undefined }>({
    mutationKey: ['budget'],
    mutationFn: toggleBudget,
    onError: (error) => {
      const errorData = error.response?.data;
      console.log(errorData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['budget'], exact: false });
      queryClient.invalidateQueries({
        queryKey: ['inactiveBudgets'],
        exact: false,
      });
    },
  });
};

const toggleBudget = async (request: { budgetId: string | undefined }) => {
  const response = await apiClient.post<{ budgetId: string | undefined }>(
    `/budgets/toggle-status`,
    request || ''
  );
  return response.data;
};
