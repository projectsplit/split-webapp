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

/**
 * Creates the schedule. No expense exists yet — the first one lands on the slot the user picked —
 * so this lands them on the recurring list rather than an expense list where nothing would have
 * changed. Expense caches are still invalidated: the scope is only known at submit time, and the
 * flag on getMe decides whether the settings entry appears at all.
 */
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
          // Where the template itself surfaces: the manage screen, and getMe, whose flag decides
          // whether the settings entry exists at all.
          'recurringExpenses',
          'getMe',
          ...(targetGroupId ? [targetGroupId] : []),
        ].map((key) =>
          queryClient.invalidateQueries({ queryKey: [key], exact: false })
        )
      );

      // Same hand-off the one-off create hooks use to repopulate the home form after a submit.
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
          localStorage.setItem(
            'submittedFromHomePersistData',
            JSON.stringify(data)
          );
        }
      }

      if (makePersonalClicked) {
        localStorage.removeItem('submittedFromHomePersistData');
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
