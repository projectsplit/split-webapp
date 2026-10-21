import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  GroupExpenseRequest,
  Group,
  Guest,
  Member,
  User,
} from '../../../types';
import { Signal } from '@preact/signals-react';
import { generatePath, NavigateFunction } from 'react-router-dom';
import routes from '@/routes';
import { newId } from '@/helpers/newId';
import { getSignedInUserId } from '@/helpers/isUserAuthenticated';
import {
  refreshAfterNewTransactions,
  sendOrKeep,
  SendOutcome,
} from '../../offline/pendingTransactionSync';

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

  return useMutation<SendOutcome, AxiosError, GroupExpenseRequest>({
    meta: { errorHandled: true },
    // Runs offline too: sendOrKeep decides between sending and keeping, where the default
    // mode would hold the submit behind a spinner until the connection came back.
    networkMode: 'always',
    mutationFn: (expense) => {
      const id = newId();
      const expenseGroupId = expense.groupId ?? groupId ?? '';
      const group =
        fromHomeGroup?.value ??
        queryClient.getQueryData<Group>([expenseGroupId]);
      const userId = getSignedInUserId();

      return sendOrKeep({
        id,
        kind: 'groupExpense',
        request: { ...expense, groupId: expenseGroupId, expenseId: id },
        groupName: group?.name ?? '',
        memberId: group?.members.find((m) => m.userId === userId)?.id ?? '',
        names: Object.fromEntries(
          groupMembers.value.map((m) => [m.id, m.name])
        ),
      });
    },
    onSuccess: async (outcome, expense) => {
      menu.value = null;
      if (groupId) {
        const groupExpensesPath = generatePath(routes.GROUP_EXPENSES, {
          groupid: groupId,
        });
        if (window.location.pathname !== groupExpensesPath) {
          navigate(groupExpensesPath);
        }
      }
      // A kept expense changed nothing on the server yet; the sync refreshes once it has.
      if (outcome === 'sent') {
        await refreshAfterNewTransactions(queryClient, [
          { kind: 'groupExpense', groupId: expense.groupId ?? groupId },
        ]);
      }

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
