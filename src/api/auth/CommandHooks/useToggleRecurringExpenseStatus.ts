import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';

export const useToggleRecurringExpenseStatus = (
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: (recurringExpenseId) =>
      toggleRecurringExpenseStatus(recurringExpenseId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['recurringExpenses'] });
    },
    onError: (error) => {
      onError?.(
        error.response?.data
          ? String(error.response.data)
          : 'Could not update the recurring expense. Please try again.'
      );
    },
  });
};

const toggleRecurringExpenseStatus = async (
  recurringExpenseId: string
): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>(
    '/recurring-expenses/toggle-status',
    { recurringExpenseId }
  );
};
