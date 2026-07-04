import { apiClient } from '../../apiClients';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useDeleteGroupLabel = (errorMessage, menu) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ groupId, labelId }) => removeLabel(groupId, labelId),
        onSuccess: (_, { groupId, labelId }) => {
            queryClient.setQueryData(['groupLabels', groupId], (oldData) => {
                if (!oldData)
                    return oldData;
                return {
                    ...oldData,
                    labels: oldData.labels.filter((label) => label.id !== labelId),
                };
            });
        },
        onError: (err) => {
            const error = err;
            errorMessage.value = String(error.response?.data);
            menu.value = 'generalWarning';
        },
    });
};
const removeLabel = async (groupId, labelId) => {
    if (!groupId) {
        throw new Error('groupId is undefined');
    }
    await apiClient.post(`/groups/${groupId}/remove-label`, { labelId });
};
