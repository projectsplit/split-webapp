import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import {
  GroupExpenseRequest,
  Group,
  Guest,
  Member,
  User,
} from '../../../types';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';

export const useCreateGroupExpense = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  navigate: NavigateFunction,
  setIsSubmitting: (value: boolean) => void,
  makePersonalClicked: boolean,
  nonGroupUsers: Signal<User[]>,
  fromHomeGroup: Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  fromHome: boolean | undefined,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, GroupExpenseRequest>({
    meta: { errorHandled: true },
    mutationFn: (expense) => createGroupExpense(expense),
    onSuccess: async () => {
      menu.value = null;
      if (groupId) {
        navigate(`/shared/${groupId}/expenses`);
      }
      await invalidateQueryKeys(queryClient, [
        'debts',
        'groupExpenses',
        'home',
        'shared',
        'mostRecentGroup',
        'cumulativeArray',
        'personalExpenses',
      ]);
      await queryClient.invalidateQueries({
        queryKey: [groupId],
        exact: false,
      });

      if (fromHome) {
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

const createGroupExpense = async (req: GroupExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>('/expenses/create', req);
};
