import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClient } from '../../apiClients';

export const useSendConnectionRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, string>({
    mutationFn: (receiverId) => sendConnectionRequest(receiverId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['connectionStatuses'] });
    },
    onError: (error) => {
      console.error('Failed to send connection request:', error.message);
    },
  });
};

const sendConnectionRequest = async (receiverId: string): Promise<void> => {
  const response = await apiClient.post('/connections/request', {
    receiverId,
  });
  return response.data;
};
