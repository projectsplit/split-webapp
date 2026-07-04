import { apiClient } from '../../apiClients';
import { useQuery } from '@tanstack/react-query';
export const useGetGroupLabels = (groupId) => {
    return useQuery({
        queryKey: ['groupLabels', groupId],
        queryFn: () => getLabels(groupId),
        refetchOnMount: true,
        staleTime: 10000,
        enabled: !!groupId,
    });
};
const getLabels = async (groupId) => {
    const params = { groupId };
    if (!groupId) {
        return { labels: [] };
    }
    const response = await apiClient.get('/expenses/labels', { params });
    return response.data;
};
