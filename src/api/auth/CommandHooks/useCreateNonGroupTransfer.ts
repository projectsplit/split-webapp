import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CreateTransferRequest, UserInfo } from '../../../types';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
import routes from '@/routes';
import { newId } from '@/helpers/newId';
import {
  refreshAfterNewTransactions,
  sendOrKeep,
  SendOutcome,
} from '../../offline/pendingTransactionSync';

type Parties = {
  senderId: string;
  senderName: string;
  receiverId: string;
  receiverName: string;
};

export const useCreateNonGroupTransfer = (
  menu: Signal<string | null>,
  navigate: NavigateFunction,
  isSubmitting: Signal<boolean>,
  onError?: (message: string) => void,
  // Who the form had on each side, by name, so a transfer kept offline can still say who it is with.
  parties?: Signal<Parties>
) => {
  const queryClient = useQueryClient();
  return useMutation<SendOutcome, AxiosError, CreateTransferRequest>({
    meta: { errorHandled: true },
    // Runs offline too: sendOrKeep decides between sending and keeping, where the default mode
    // would hold the submit behind a spinner until the connection came back.
    networkMode: 'always',
    mutationFn: (transfer) => {
      const id = newId();
      const me = queryClient.getQueryData<UserInfo>(['getMe']);
      const named = parties?.value;

      return sendOrKeep({
        id,
        kind: 'nonGroupTransfer',
        request: { ...transfer, transferId: id },
        // The form calls the person themselves "You"; their own username is the name to keep.
        names: Object.fromEntries(
          [
            ...(me ? [[me.userId, me.username]] : []),
            ...(named
              ? [
                  [named.senderId, named.senderName],
                  [named.receiverId, named.receiverName],
                ]
              : []),
          ].filter(([, name]) => name && name !== 'You')
        ),
      });
    },
    onSuccess: async (outcome) => {
      menu.value = null;
      if (window.location.pathname !== routes.NON_GROUP_TRANSFERS) {
        navigate(routes.NON_GROUP_TRANSFERS);
      }
      // A kept transfer changed nothing on the server yet; the sync refreshes once it has.
      if (outcome === 'sent') {
        await refreshAfterNewTransactions(queryClient, [
          { kind: 'nonGroupTransfer' },
        ]);
      }
      isSubmitting.value = false;
    },
    onError: (err) => {
      isSubmitting.value = false;
      onError?.(
        err.response?.data
          ? String(err.response.data)
          : 'Could not create the transfer. Please try again.'
      );
    },
  });
};
