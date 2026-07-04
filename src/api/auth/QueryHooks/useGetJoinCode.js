import { apiClient } from '../../apiClients';
import { useQuery } from '@tanstack/react-query';
export const useGetJoinCode = (code) => {
    return useQuery({
        queryKey: ['joinCode', code],
        queryFn: () => getJoinCode(code),
    });
};
const getJoinCode = async (code) => {
    const response = await apiClient.get(`/join/${code}`);
    return response.data;
};
