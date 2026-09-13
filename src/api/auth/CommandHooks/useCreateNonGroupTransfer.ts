import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { CreateTransferRequest } from '../../../types';
import { Signal } from '@preact/signals-react';
import { NavigateFunction } from 'react-router-dom';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';
import routes from '@/routes';

export const useCreateNonGroupTransfer = (
  menu: Signal<string | null>,
  navigate: NavigateFunction,
  isSubmitting: Signal<boolean>,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, CreateTransferRequest>({
    meta: { errorHandled: true },
    mutationFn: (transfer) => submitTransfer(transfer),
    onSuccess: async () => {
      menu.value = null;
      if (window.location.pathname !== routes.NON_GROUP_TRANSFERS) {
        navigate(routes.NON_GROUP_TRANSFERS);
      }
      await invalidateQueryKeys(queryClient, [
        'nonGroupDebts',
        'nonGroupTransfers',
        'home',
        'shared',
        'home',
        'mostRecentGroup',
        'non-group-transfer-users',
      ]);
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

const submitTransfer = async (req: CreateTransferRequest): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    '/transfers/create-non-group',
    req
  );
  return response.data;
};
