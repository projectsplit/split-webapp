import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useDeclineConnectionRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (connectionId) => declineConnectionRequest(connectionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['connectionRequests'] });
            queryClient.invalidateQueries({ queryKey: ['connectionStatuses'] });
            queryClient.invalidateQueries({ queryKey: ['getMe'] });
        },
        onError: (error) => {
            console.error('Failed to decline connection request:', error.message);
        },
    });
};
const declineConnectionRequest = async (connectionId) => {
    const response = await apiClient.post('/connections/decline', {
        connectionId,
    });
    return response.data;
};
