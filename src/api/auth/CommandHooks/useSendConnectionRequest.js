import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useSendConnectionRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (receiverId) => sendConnectionRequest(receiverId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['connectionStatuses'] });
        },
        onError: (error) => {
            console.error('Failed to send connection request:', error.message);
        },
    });
};
const sendConnectionRequest = async (receiverId) => {
    const response = await apiClient.post('/connections/request', {
        receiverId,
    });
    return response.data;
};
