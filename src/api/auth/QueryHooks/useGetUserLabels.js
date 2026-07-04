import { apiClient } from '../../apiClients';
import { useQuery } from '@tanstack/react-query';
export const useGetUserLabels = (userId, isPersonal) => {
    return useQuery({
        queryKey: ['userLabels', userId],
        queryFn: () => getLabels(userId),
        refetchOnMount: true,
        staleTime: 10000,
        enabled: !!userId && !isPersonal,
    });
};
const getLabels = async (userId) => {
    const params = { userId };
    if (!userId) {
        return { labels: [] };
    }
    const response = await apiClient.get('/users/user-labels', { params });
    return response.data;
};
