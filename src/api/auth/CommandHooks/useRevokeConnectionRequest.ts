import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '../../apiClients';

export const useRevokeConnectionRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: (connectionId) => revokeConnectionRequest(connectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectionStatuses'] });
    },
    onError: (error) => {
      console.error('Failed to revoke connection request:', error.message);
    },
  });
};

const revokeConnectionRequest = async (connectionId: string): Promise<void> => {
  const response = await apiClient.post('/connections/revoke', {
    connectionId,
  });
  return response.data;
};
