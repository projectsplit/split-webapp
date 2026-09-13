import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { UpdateMostRecentContextRequest } from '../../../types';
import { apiClient } from '../../apiClients';
import { invalidateQueryKeys } from '../helpers/invalidateQueryKeys';

export const useMostRecentContext = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    meta: { errorHandled: true },
    mutationFn: (contextId) => updateMostRecentContext({ contextId }),
    onSuccess: async () => {
      await invalidateQueryKeys(queryClient, [
        'getMe',
        'mostRecentGroup',
        'home',
        'shared',
      ]);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const updateMostRecentContext = async (
  req: UpdateMostRecentContextRequest
): Promise<void> => {
  const response = await apiClient.put<void, AxiosResponse<void>>(
    '/users/activity/recent-context',
    req
  );
  return response.data;
};
