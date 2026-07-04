import { apiClient } from '@/api/apiClients';
import { useQuery } from '@tanstack/react-query';
export const useGetUserId = () => {
    return useQuery({
        queryKey: ['getUserId'],
        queryFn: getUserId,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
};
const getUserId = async () => {
    const response = await apiClient.get('/');
    return response.data;
};
