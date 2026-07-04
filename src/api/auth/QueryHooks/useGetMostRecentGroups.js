import { apiClient } from '@/api/apiClients';
import { useQuery } from '@tanstack/react-query';
export const useGetMostRecentGroups = (groupId) => {
    return useQuery({
        queryKey: ['mostRecentGroup', groupId],
        queryFn: () => getMostRecentGroup(groupId),
        enabled: groupId !== undefined && groupId !== null && groupId !== 'NON_GROUP',
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
};
const getMostRecentGroup = async (groupId) => {
    const response = await apiClient.get(`/groups/${groupId}/details`);
    return response.data;
};
