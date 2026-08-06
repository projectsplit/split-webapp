import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { EditRecurringExpenseRequest } from '../../../types';

/**
 * Edits the schedule only. Expenses it already produced are untouched, so nothing in the expense
 * lists or the debts derived from them changes here.
 */
export const useEditRecurringExpense = (
  onSuccess?: () => void,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, EditRecurringExpenseRequest>({
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
