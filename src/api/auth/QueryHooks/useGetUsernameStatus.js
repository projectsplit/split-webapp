import { apiClient } from '../../apiClients';
import { useQuery } from '@tanstack/react-query';
export const useGetUsernameStatus = (username) => {
    return useQuery({
        queryKey: ['usernameStatus', username],
        queryFn: () => getUsernameStatus(username),
        staleTime: 0,
        gcTime: 0,
        enabled: !!username,
    });
};
const getUsernameStatus = async (username) => {
    const response = await apiClient.get(`/users/username/${username}`);
    return response.data;
};
