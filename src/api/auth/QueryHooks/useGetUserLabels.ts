import { AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { useQuery } from '@tanstack/react-query';
import { GetLabelsResponse } from '../../../types';

export const useGetUserLabels = (
  userId: string | undefined,
  isPersonal: boolean | undefined
) => {
  return useQuery({
    queryKey: ['userLabels', userId],
    queryFn: () => getLabels(userId),
    refetchOnMount: true,
    staleTime: 10000,
    enabled: !!userId && !isPersonal,
  });
};

const getLabels = async (userId: string | undefined) => {
  const params = { userId };
  if (!userId) {
    return { labels: [] };
  }
  const response = await apiClient.get<void, AxiosResponse<GetLabelsResponse>>(
    '/users/user-labels',
    { params }
  );
  return response.data;
};
