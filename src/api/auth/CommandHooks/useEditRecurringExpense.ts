import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { EditRecurringExpenseRequest } from '../../../types';

export const useEditRecurringExpense = (
  onSuccess?: () => void,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, EditRecurringExpenseRequest>({
    meta: { errorHandled: true },
    mutationFn: (req) => editRecurringExpense(req),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['recurringExpenses'] });
      onSuccess?.();
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

const editRecurringExpense = async (
  req: EditRecurringExpenseRequest
): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>(
    '/recurring-expenses/edit',
    req
  );
};
