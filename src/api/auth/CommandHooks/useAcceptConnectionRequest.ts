import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '../../apiClients';

export const useAcceptConnectionRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
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

const acceptConnectionRequest = async (connectionId: string): Promise<void> => {
  const response = await apiClient.post('/connections/accept', {
    connectionId,
  });
  return response.data;
};
