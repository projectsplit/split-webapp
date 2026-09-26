import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { CreateTransferRequest, Group } from '../../../types';
import { Signal } from '@preact/signals-react';
import { generatePath, NavigateFunction } from 'react-router-dom';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';
import routes from '@/routes';

export const useCreateGroupTransfer = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  navigate: NavigateFunction,
  isSubmitting: Signal<boolean>,
  fromHomeGroup?: Signal<Group | null>,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateTransferRequest>({
    meta: { errorHandled: true },
    mutationFn: (transfer) => submitTransfer(transfer),
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [
        'debts',
        'groupTransfers',
        'home',
        'shared',
        'mostRecentGroup',
      ]);
      await queryClient.invalidateQueries({
        queryKey: [groupId],
        exact: false,
      });
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

const submitTransfer = async (req: CreateTransferRequest): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    '/transfers/create',
    req
  );
  return response.data;
};
