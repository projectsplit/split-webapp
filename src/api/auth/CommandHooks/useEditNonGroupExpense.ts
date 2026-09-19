import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import {
  NonGroupExpenseRequest,
  ExpenseResponseItem,
  Group,
  Guest,
  Member,
  User,
} from '../../../types';
import { Signal } from '@preact/signals-react';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';

export const useEditNonGroupExpense = (
  menu: Signal<string | null>,
  setIsSubmitting: (value: boolean) => void,
  nonGroupUsers: Signal<User[]>,
  fromHomeGroup: Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  makePersonalClicked: boolean,
  isNonGroupExpense: Signal<boolean> | undefined,
  selectedExpense?: Signal<ExpenseResponseItem | null>,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, NonGroupExpenseRequest>({
    meta: { errorHandled: true },
    mutationFn: (expense) => editExpense(expense),
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [
        'nonGroupDebts',
        'nonGroupExpenses',
        'home',
        'shared',
        'mostRecentGroup',
        'cumulativeArray',
        'personalExpenses',
      ]);
      if (selectedExpense) {
        selectedExpense.value = null;
      }
      if (isNonGroupExpense && isNonGroupExpense.value) {
        const data = {
          nonGroupUsers: nonGroupUsers.value,
          fromHomeGroup: fromHomeGroup?.value,
          groupMembers: groupMembers.value,
        };
        if (
          groupMembers.value.length > 0 ||
          nonGroupUsers.value.length > 0 ||
          fromHomeGroup?.value
        )
          sessionStorage.setItem(
            'submittedFromHomePersistData',
            JSON.stringify(data)
          );
      }
      if (makePersonalClicked) {
        sessionStorage.removeItem('submittedFromHomePersistData');
      }
      menu.value = null;
    },
    onError: (err) => {
      const error = err as AxiosError;
      onError?.(
        error.response?.data
          ? String(error.response.data)
          : 'Could not save the expense. Please try again.'
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
};

const editExpense = async (req: NonGroupExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>(
    '/expenses/edit-non-group',
    req
  );
};
