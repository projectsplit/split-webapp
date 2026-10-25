import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { CreateTransferRequest, Group } from '../../../types';
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

export const useCreateGroupTransfer = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  navigate: NavigateFunction,
  isSubmitting: Signal<boolean>,
  fromHomeGroup?: Signal<Group | null>,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<SendOutcome, AxiosError, CreateTransferRequest>({
    meta: { errorHandled: true },
    // Runs offline too: sendOrKeep decides between sending and keeping, where the default mode
    // would hold the submit behind a spinner until the connection came back.
    networkMode: 'always',
    mutationFn: (transfer) => {
      const id = newId();
      const transferGroupId = transfer.groupId ?? groupId ?? '';
      const group =
        fromHomeGroup?.value ??
        queryClient.getQueryData<Group>([transferGroupId]);
      const userId = getSignedInUserId();

      return sendOrKeep({
        id,
        kind: 'groupTransfer',
        request: { ...transfer, groupId: transferGroupId, transferId: id },
        groupName: group?.name ?? '',
        memberId: group?.members.find((m) => m.userId === userId)?.id ?? '',
        names: Object.fromEntries(
          [...(group?.members ?? []), ...(group?.guests ?? [])].map((m) => [
            m.id,
            m.name,
          ])
        ),
      });
    },
    onSuccess: async (outcome) => {
      // A kept transfer changed nothing on the server yet; the sync refreshes once it has.
      if (outcome === 'sent') {
        await refreshAfterNewTransactions(queryClient, [
          { kind: 'groupTransfer', groupId },
        ]);
      }
      isSubmitting.value = false;
      menu.value = null;
      if (fromHomeGroup?.value) {
        navigate(generatePath(routes.GROUP_TRANSFERS, { groupid: groupId }));
      }
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
