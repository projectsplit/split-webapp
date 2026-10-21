import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  NonGroupExpenseRequest,
  Group,
  Guest,
  Member,
  User,
  UserInfo,
} from '../../../types';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
import routes from '@/routes';
import { newId } from '@/helpers/newId';
import {
  refreshAfterNewTransactions,
  sendOrKeep,
  SendOutcome,
} from '../../offline/pendingTransactionSync';

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

  return useMutation<SendOutcome, AxiosError, NonGroupExpenseRequest>({
    meta: { errorHandled: true },
    // Runs offline too: sendOrKeep decides between sending and keeping, where the default
    // mode would hold the submit behind a spinner until the connection came back.
    networkMode: 'always',
    mutationFn: (expense) => {
      const id = newId();
      const me = queryClient.getQueryData<UserInfo>(['getMe']);

      return sendOrKeep({
        id,
        kind: 'nonGroupExpense',
        request: { ...expense, expenseId: id },
        names: Object.fromEntries([
          ...nonGroupUsers.value.map((u) => [u.userId, u.username]),
          ...(me ? [[me.userId, me.username]] : []),
        ]),
      });
    },
    onSuccess: async (outcome) => {
      menu.value = null;
      if (window.location.pathname !== routes.NON_GROUP_EXPENSES) {
        navigate(routes.NON_GROUP_EXPENSES);
      }

      // A kept expense changed nothing on the server yet; the sync refreshes once it has.
      if (outcome === 'sent') {
        await refreshAfterNewTransactions(queryClient, [
          { kind: 'nonGroupExpense' },
        ]);
      }
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
