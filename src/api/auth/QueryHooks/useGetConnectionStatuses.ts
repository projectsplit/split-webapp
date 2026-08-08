import { AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { useQuery } from '@tanstack/react-query';
import { GetConnectionStatusesResponse } from '../../../types';

// Sorted so that the same set of users hits the same cache entry no matter what order the search
// happened to return them in.
export const useGetConnectionStatuses = (userIds: string[]) => {
  const sortedIds = [...userIds].sort();

  return useQuery({
    queryKey: ['connectionStatuses', sortedIds],
    queryFn: () => getConnectionStatuses(sortedIds),
    enabled: sortedIds.length > 0,
    staleTime: 30 * 1000,
    // Paging a user list grows the id set, which is a new cache entry with no data of its own.
    // Without the previous answer to fall back on, every row on screen loses its status for the
    // length of that request and re-renders as a plain row, so the list visibly rewrites itself
    // mid-scroll. The stale statuses are right for the rows they came from; only the newly added
    // rows wait, and they were not on screen a moment ago anyway.
    placeholderData: (previousData) => previousData,
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
