import { AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetNotificationsResponse } from '../../../types';

export const useGetNotifications = (pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ['notifications', pageSize],
    queryFn: ({ pageParam: next }) => getNotifications(pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: '',
    refetchOnMount: true,
    gcTime: 0,
  });
};

const getNotifications = async (
  pageSize: number,
  next?: string
): Promise<GetNotificationsResponse> => {
  const params = { pageSize, next };
  const response = await apiClient.get<
    void,
    AxiosResponse<GetNotificationsResponse>
  >('/notifications', { params });
  return response.data;
};
