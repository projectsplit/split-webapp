import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { PersonalExpenseRequest } from '../../../types';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
import routes from '@/routes';
import { newId } from '@/helpers/newId';
import {
  refreshAfterNewTransactions,
  sendOrKeep,
  SendOutcome,
} from '../../offline/pendingTransactionSync';

export const useCreatePersonalExpense = (
  menu: Signal<string | null>,
  navigate: NavigateFunction,
  setIsSubmitting: (value: boolean) => void,
  makePersonalClicked?: boolean,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<SendOutcome, AxiosError, PersonalExpenseRequest>({
    meta: { errorHandled: true },
    // Runs offline too: sendOrKeep decides between sending and keeping, where the default
    // mode would hold the submit behind a spinner until the connection came back.
    networkMode: 'always',
    mutationFn: (expense) => {
      const id = newId();

      return sendOrKeep({
        id,
        kind: 'personalExpense',
        request: { ...expense, expenseId: id },
        names: {},
      });
    },
    onSuccess: async (outcome) => {
      menu.value = null;
      if (makePersonalClicked) {
        sessionStorage.removeItem('submittedFromHomePersistData');
      }
      if (window.location.pathname !== routes.PERSONAL) {
        navigate(routes.PERSONAL);
      }
      // A kept expense changed nothing on the server yet; the sync refreshes once it has.
      if (outcome === 'sent') {
        await refreshAfterNewTransactions(queryClient, [
          { kind: 'personalExpense' },
        ]);
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
