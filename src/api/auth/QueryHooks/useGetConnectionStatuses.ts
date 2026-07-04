import { AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { useQuery } from '@tanstack/react-query';
import { GetConnectionStatusesResponse } from '../../../types';

export const useGetConnectionStatuses = (userIds: string[]) => {
  const sortedIds = [...userIds].sort();

  return useQuery({
    queryKey: ['connectionStatuses', sortedIds],
    queryFn: () => getConnectionStatuses(sortedIds),
    enabled: sortedIds.length > 0,
    staleTime: 30 * 1000,
  });
};

const getConnectionStatuses = async (
  userIds: string[]
): Promise<GetConnectionStatusesResponse> => {
  const params = new URLSearchParams();
  userIds.forEach((id) => params.append('userIds', id));
  const response = await apiClient.get<
    void,
    AxiosResponse<GetConnectionStatusesResponse>
  >('/connections/statuses', { params });
  return response.data;
};
