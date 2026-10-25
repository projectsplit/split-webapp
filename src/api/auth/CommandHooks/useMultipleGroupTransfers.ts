import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CreateTransfersRequest, Group, TruncatedMember } from '../../../types';
import { Signal } from '@preact/signals-react';
import { newId } from '@/helpers/newId';
import { getSignedInUserId } from '@/helpers/isUserAuthenticated';
import {
  refreshAfterNewTransactions,
  sendOrKeep,
  SendOutcome,
} from '../../offline/pendingTransactionSync';

export const useMultipleGroupTransfers = (
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
      const groupId = request.groupId ?? '';
      const group = queryClient.getQueryData<Group>([groupId]);
      const userId = getSignedInUserId();

      return sendOrKeep({
        id: newId(),
        kind: 'groupSettleUp',
        // An id for every transfer, so a resend of the batch stores none of them twice.
        request: {
          ...request,
          groupId,
          transfers: request.transfers.map((t) => ({
            ...t,
            transferId: newId(),
          })),
        },
        groupName: group?.name ?? '',
        memberId: group?.members.find((m) => m.userId === userId)?.id ?? '',
        names: Object.fromEntries(members.map((m) => [m.id, m.name])),
      });
    },
    onSuccess: async (outcome, request) => {
      // A kept settle-up changed nothing on the server yet; the sync refreshes once it has.
      if (outcome === 'sent') {
        await refreshAfterNewTransactions(queryClient, [
          { kind: 'groupSettleUp', groupId: request.groupId },
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
