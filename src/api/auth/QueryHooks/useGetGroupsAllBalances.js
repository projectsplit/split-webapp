import { apiClient } from '@/api/apiClients';
import { useQuery } from '@tanstack/react-query';
export const useGetGroupsAllBalances = () => {
    return useQuery({
        queryKey: ['home'],
        queryFn: getGroupsAllBalances,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
};
const getGroupsAllBalances = async () => {
    const response = await apiClient.get(`/groups/all-balances`);
    return response.data;
};
