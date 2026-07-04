import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
const useGroup = (groupId) => {
    const navigate = useNavigate();
    return useQuery({
        queryKey: [groupId],
        queryFn: async () => {
            if (!groupId) {
                throw new Error('No group ID provided');
            }
            return await getGroup(groupId, navigate);
        },
        enabled: !!groupId,
    });
};
const getGroup = async (groupId, navigate) => {
    try {
        const response = await apiClient.get(`/groups/${groupId}`);
        return response.data;
    }
    catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            navigate('/shared');
        }
        throw error;
    }
};
export default useGroup;
