import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import {
  ExpenseResponseItem,
  Group,
  Guest,
  Member,
  User,
  BaseExpenseRequest,
} from '../../../types';
import { Signal } from '@preact/signals-react';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';

export const useEditPersonalExpense = (
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

  return useMutation<any, AxiosError, BaseExpenseRequest>({
    meta: { errorHandled: true },
    mutationFn: (expense) => editExpense(expense),
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [
        'personalExpenses',
        'cumulativeArray',
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

const editExpense = async (req: BaseExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>(
    '/expenses/edit-personal',
    req
  );
};
