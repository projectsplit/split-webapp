import { apiClient } from '../../apiClients';
import { useQuery } from '@tanstack/react-query';
export const useGetUserAndGroupsLabels = (userId, isPersonal, groupId) => {
    return useQuery({
        queryKey: ['userAndGroupsLabels', userId],
        queryFn: () => getLabels(userId),
        refetchOnMount: true,
        staleTime: 10000,
        enabled: !!userId && (isPersonal || !!groupId),
    });
};
const getLabels = async (userId) => {
    const params = { userId };
    if (!userId) {
        return { labels: [] };
    }
    const response = await apiClient.get('/users/user-group-labels', { params });
    return response.data;
};
