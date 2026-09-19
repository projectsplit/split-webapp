import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import {
  NonGroupExpenseRequest,
  Group,
  Guest,
  Member,
  User,
} from '../../../types';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';

export const useCreateNonGroupExpense = (
  menu: Signal<string | null>,
  navigate: NavigateFunction,
  setIsSubmitting: (value: boolean) => void,
  nonGroupUsers: Signal<User[]>,
  fromHomeGroup: Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  makePersonalClicked: boolean,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, NonGroupExpenseRequest>({
    meta: { errorHandled: true },
    mutationFn: (expense) => createNonGroupExpense(expense),
    onSuccess: async () => {
      menu.value = null;
      navigate(`/shared/nongroup/expenses`);

      await invalidateQueryKeys(queryClient, [
        'nonGroupDebts',
        'nonGroupExpenses',
        'shared',
        'mostRecentGroup',
        'home',
        'non-group-expense-users',
        'cumulativeArray',
        'personalExpenses',
      ]);
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
      if (makePersonalClicked) {
        sessionStorage.removeItem('submittedFromHomePersistData');
      }
    },
    onError: (err) => {
      const error = err as AxiosError;
      onError?.(
        error.response?.data
          ? String(error.response.data)
          : 'Could not create the expense. Please try again.'
      );
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
};

const createNonGroupExpense = async (
  req: NonGroupExpenseRequest
): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>(
    '/expenses/create-non-group',
    req
  );
};
