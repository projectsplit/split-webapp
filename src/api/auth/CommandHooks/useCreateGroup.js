import { apiClient } from '@/api/apiClients';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useCreateGroup = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['group', 'create'],
        mutationFn: createGroupFn,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['group'], exact: false });
            queryClient.invalidateQueries({ queryKey: ['shared'], exact: false });
            return data;
        },
    });
};
const createGroupFn = async (request) => {
    const response = await apiClient.post('/groups/create', request);
    return response.data;
};
