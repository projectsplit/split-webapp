import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';

export const useDeleteRecurringExpense = (
  onSuccess?: () => void,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    meta: { errorHandled: true },
    mutationFn: (recurringExpenseId) =>
      deleteRecurringExpense(recurringExpenseId),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['recurringExpenses'] }),
        queryClient.invalidateQueries({ queryKey: ['getMe'] }),
      ]);
      onSuccess?.();
    },
    onError: (error) => {
      onError?.(
        error.response?.data
          ? String(error.response.data)
          : 'Could not delete the recurring expense. Please try again.'
      );
    },
  });
};

const deleteRecurringExpense = async (
  recurringExpenseId: string
): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>(
    '/recurring-expenses/delete',
    { recurringExpenseId }
  );
};
