import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useAcceptConnectionRequest = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (connectionId) => acceptConnectionRequest(connectionId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['connectionRequests'] });
            queryClient.invalidateQueries({ queryKey: ['connectionStatuses'] });
            queryClient.invalidateQueries({ queryKey: ['getMe'] });
        },
        onError: (error) => {
            console.error('Failed to accept connection request:', error.message);
        },
    });
};
const acceptConnectionRequest = async (connectionId) => {
    const response = await apiClient.post('/connections/accept', {
        connectionId,
    });
    return response.data;
};
