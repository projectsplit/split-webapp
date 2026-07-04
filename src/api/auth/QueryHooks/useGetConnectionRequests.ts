import { AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { useInfiniteQuery } from '@tanstack/react-query';
import { GetConnectionRequestsResponse } from '../../../types';

export const useGetConnectionRequests = (pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ['connectionRequests', pageSize],
    queryFn: ({ pageParam: next }) => getConnectionRequests(pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: '',
    refetchOnMount: true,
    gcTime: 0,
  });
};

const getConnectionRequests = async (
  pageSize: number,
  next?: string
): Promise<GetConnectionRequestsResponse> => {
  const params = { pageSize, next };
  const response = await apiClient.get<
    void,
    AxiosResponse<GetConnectionRequestsResponse>
  >('/connections/requests', { params });
  return response.data;
};
