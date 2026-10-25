import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  CreateTransfersRequest,
  TruncatedMember,
  UserInfo,
} from '../../../types';
import { Signal } from '@preact/signals-react';
import { newId } from '@/helpers/newId';
import {
  refreshAfterNewTransactions,
  sendOrKeep,
  SendOutcome,
} from '../../offline/pendingTransactionSync';

export const useMultipleNonGroupTransfers = (
  menu: Signal<string | null>,
  onError?: (message: string) => void,
  members: TruncatedMember[] = []
) => {
  const queryClient = useQueryClient();

  return useMutation<SendOutcome, AxiosError, CreateTransfersRequest>({
    meta: { errorHandled: true },
    // Runs offline too: sendOrKeep decides between sending and keeping, where the default mode
    // would hold the submit behind a spinner until the connection came back.
    networkMode: 'always',
    mutationFn: (request) => {
      const me = queryClient.getQueryData<UserInfo>(['getMe']);

      return sendOrKeep({
        id: newId(),
        kind: 'nonGroupSettleUp',
        // An id for every transfer, so a resend of the batch stores none of them twice.
        request: {
          ...request,
          transfers: request.transfers.map((t) => ({
            ...t,
            transferId: newId(),
          })),
        },
        names: Object.fromEntries([
          ...members.map((m) => [m.id, m.name]),
          ...(me ? [[me.userId, me.username]] : []),
        ]),
      });
    },
    onSuccess: async (outcome) => {
      // A kept settle-up changed nothing on the server yet; the sync refreshes once it has.
      if (outcome === 'sent') {
        await refreshAfterNewTransactions(queryClient, [
          { kind: 'nonGroupSettleUp' },
        ]);
      }
      menu.value = null;
    },
    onError: (err) => {
      onError?.(
        err.response?.data
          ? String(err.response.data)
          : 'Could not record the transfers. Please try again.'
      );
    },
  });
};
