import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { CreateTransfersRequest } from '../../../types';
import { Signal } from '@preact/signals-react';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';

export const useMultipleNonGroupTransfers = (
  menu: Signal<string | null>,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateTransfersRequest>({
    meta: { errorHandled: true },
    mutationFn: (transfers) => submitMultipleNonGroupTransfers(transfers),
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [
        'nonGroupDebts',
        'nonGroupTransfers',
        'home',
        'shared',
      ]);
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

const submitMultipleNonGroupTransfers = async (
  req: CreateTransfersRequest
): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    '/transfers/create-many-non-group',
    req
  );
  return response.data;
};
