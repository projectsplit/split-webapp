import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import { Signal } from '@preact/signals-react';
import { apiClient } from '../../apiClients';
import {
  CreateRecurringExpenseResponse,
  Group,
  Guest,
  Member,
  RecurringExpenseRequest,
  User,
} from '../../../types';

export const useCreateRecurringExpense = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  navigate: NavigateFunction,
  setIsSubmitting: (value: boolean) => void,
  makePersonalClicked: boolean,
  nonGroupUsers: Signal<User[]>,
  fromHomeGroup: Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  fromHome: boolean | undefined,
  isnonGroupExpense: Signal<boolean> | undefined,
  isPersonal: Signal<boolean> | undefined,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<
    CreateRecurringExpenseResponse,
    AxiosError,
    RecurringExpenseRequest
  >({
    meta: { errorHandled: true },
    mutationFn: (recurringExpense) => createRecurringExpense(recurringExpense),
    onSuccess: async () => {
      menu.value = null;

      const targetGroupId = groupId || fromHomeGroup?.value?.id;

      navigate('/recurring-expenses');

      await Promise.all(
        [
          'debts',
          'nonGroupDebts',
          'groupExpenses',
          'nonGroupExpenses',
          'personalExpenses',
          'non-group-expense-users',
          'home',
          'shared',
          'mostRecentGroup',
          'cumulativeArray',
          'recurringExpenses',
          'getMe',
          ...(targetGroupId ? [targetGroupId] : []),
        ].map((key) =>
          queryClient.invalidateQueries({ queryKey: [key], exact: false })
        )
      );

      if (fromHome || isnonGroupExpense?.value) {
        const data = {
          nonGroupUsers: nonGroupUsers.value,
          fromHomeGroup: fromHomeGroup?.value,
          groupMembers: groupMembers.value,
        };

        if (
          groupMembers.value.length > 0 ||
          nonGroupUsers.value.length > 0 ||
          fromHomeGroup?.value
        ) {
          sessionStorage.setItem(
            'submittedFromHomePersistData',
            JSON.stringify(data)
          );
        }
      }

      if (makePersonalClicked) {
        sessionStorage.removeItem('submittedFromHomePersistData');
      }
    },
    onError: (error) => {
      onError?.(
        error.response?.data
          ? String(error.response.data)
          : 'Could not create the recurring expense. Please try again.'
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
};

const createRecurringExpense = async (
  req: RecurringExpenseRequest
): Promise<CreateRecurringExpenseResponse> => {
  const response = await apiClient.post<
    void,
    AxiosResponse<CreateRecurringExpenseResponse>
  >('/recurring-expenses/create', req);

  return response.data;
};
