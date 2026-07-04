import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useUpdateGroupName = (groupId, changeNameError, menu) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (name) => {
            if (!groupId) {
                changeNameError.value = 'No group found';
                return Promise.reject(new Error('No group found'));
            }
            return updateGroupName({ name }, groupId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['home'], exact: false });
            await queryClient.invalidateQueries({
                queryKey: [groupId],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['shared'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['mostRecentGroup'],
                exact: false,
            });
            menu.value = null;
        },
        onError: (err) => {
            const error = err;
            changeNameError.value = String(error.response?.data);
        },
    });
};
const updateGroupName = async (req, groupId) => {
    const response = await apiClient.put(`/groups/${groupId}/name`, req);
    return response.data;
};
