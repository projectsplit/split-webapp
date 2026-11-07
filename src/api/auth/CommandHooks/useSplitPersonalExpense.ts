import {
  onlineManager,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Signal } from '@preact/signals-react';
import { apiClient } from '../../apiClients';
import { needsConnectionMessage } from '../../offline/connectivity';
import { refreshAfterNewTransactions } from '../../offline/pendingTransactionSync';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';
import { draftForExpense, Destination, Person } from '@/helpers/expenseSplit';
import { newId } from '@/helpers/newId';
import { ExpenseResponseItem, Group } from '../../../types';

type SplitRequest = {
  expense: ExpenseResponseItem;
  destination: Destination;
  groups: Group[] | null;
  me: Person;
};

type SplitResult = {
  kind: 'groupExpense' | 'nonGroupExpense';
  groupId?: string;
  /** The shared expense was filed but the personal one could not be removed after it. */
  personalLeft: boolean;
};

const messageOf = (error: unknown) => {
  const response = (error as AxiosError).response;
  if (response?.data) return String(response.data);
  return error instanceof Error && error.message
    ? error.message
    : 'Could not split this expense. Please try again.';
};

/**
 * Turns a personal expense into a shared one: the same amount, description, time, place and labels,
 * in a group or a quick split, paid by the person and shared equally by whoever they ticked. The
 * personal expense is then deleted, so the money is not counted twice.
 *
 * The shared one is filed first, so a failure part-way never loses the expense; at worst both are
 * left, and the person is told to delete the personal one. Unlike a new expense, this is not kept on
 * the phone for later: it changes an existing expense, which needs the server there and then.
 */
export const useSplitPersonalExpense = (
  selectedExpense: Signal<ExpenseResponseItem | null>,
  errorMessage: Signal<string>
) => {
  const queryClient = useQueryClient();

  return useMutation<SplitResult, Error, SplitRequest>({
    meta: { errorHandled: true },
    networkMode: 'always',
    mutationFn: async ({ expense, destination, groups, me }) => {
      if (!onlineManager.isOnline()) {
        throw new Error(needsConnectionMessage('Splitting an expense'));
      }

      const result = draftForExpense(
        {
          id: newId(),
          amount: expense.amount,
          currency: expense.currency,
          description: expense.description,
          location: expense.location ?? null,
          occurred: expense.occurred,
          labels: expense.labels.map(({ text, color }) => ({ text, color })),
        },
        destination,
        { groups, me }
      );

      if ('error' in result) throw new Error(result.error);

      const { draft } = result;
      if (draft.kind !== 'groupExpense' && draft.kind !== 'nonGroupExpense') {
        throw new Error('Choose a group or people to split it with');
      }

      await apiClient.post(
        draft.kind === 'groupExpense'
          ? '/expenses/create'
          : '/expenses/create-non-group',
        draft.request
      );

      const groupId =
        draft.kind === 'groupExpense' ? draft.request.groupId : undefined;

      try {
        await apiClient.post('/expenses/delete-personal', {
          expenseId: expense.id,
        });
        return { kind: draft.kind, groupId, personalLeft: false };
      } catch {
        return { kind: draft.kind, groupId, personalLeft: true };
      }
    },
    onSuccess: async ({ kind, groupId, personalLeft }) => {
      await Promise.all([
        refreshAfterNewTransactions(queryClient, [{ kind, groupId }]),
        invalidateQueryKeys(queryClient, [
          'personalExpenses',
          'userTotals',
          'cumulativeArray',
        ]),
      ]);

      selectedExpense.value = null;

      if (personalLeft) {
        errorMessage.value =
          'It is split now, but the personal expense could not be removed. Delete it from your personal expenses so it is not counted twice.';
      }
    },
    onError: (error) => {
      errorMessage.value = messageOf(error);
    },
  });
};
