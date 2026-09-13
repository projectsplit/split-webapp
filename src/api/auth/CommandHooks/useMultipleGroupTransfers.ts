import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { CreateTransfersRequest } from '../../../types';
import { Signal } from '@preact/signals-react';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';

export const useMultipleGroupTransfers = (
  menu: Signal<string | null>,
  onError?: (message: string) => void
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateTransfersRequest>({
    meta: { errorHandled: true },
    mutationFn: (transfers) => submitMultipleGroupTransfers(transfers),
    onSuccess: async (_data, request) => {
      await invalidateQueryKeys(queryClient, [
        'debts',
        'groupTransfers',
        'home',
        'shared',
        'mostRecentGroup',
      ]);
      await queryClient.invalidateQueries({
        queryKey: [request.groupId],
        exact: false,
      });
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

const submitMultipleGroupTransfers = async (
  req: CreateTransfersRequest
): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    '/transfers/create-many',
    req
  );
  return response.data;
};
