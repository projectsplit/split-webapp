import { apiClient } from '../../apiClients';
import { useQuery } from '@tanstack/react-query';
export const useGetConnectionStatuses = (userIds) => {
    const sortedIds = [...userIds].sort();
    return useQuery({
        queryKey: ['connectionStatuses', sortedIds],
        queryFn: () => getConnectionStatuses(sortedIds),
        enabled: sortedIds.length > 0,
        staleTime: 30 * 1000,
    });
};
const getConnectionStatuses = async (userIds) => {
    const params = new URLSearchParams();
    userIds.forEach((id) => params.append('userIds', id));
    const response = await apiClient.get('/connections/statuses', { params });
    return response.data;
};
