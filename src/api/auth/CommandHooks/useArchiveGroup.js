import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useArchiveGroup = (groupId, noGroupFoundError, menu) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (isArchived) => {
            if (!groupId) {
                noGroupFoundError.value = 'No group found';
                return Promise.reject(new Error('No group found'));
            }
            return archiveGroup({ isArchived }, groupId);
        },
        onSuccess: async () => {
            //await queryClient.invalidateQueries({ queryKey:["groups"], exact:false});
            await queryClient.invalidateQueries({ queryKey: ['shared', 'active'] });
            await queryClient.invalidateQueries({ queryKey: ['shared', 'archived'] });
            await queryClient.invalidateQueries({
                queryKey: ['mostRecentGroup'],
                exact: false,
            });
            await queryClient.invalidateQueries({ queryKey: ['searchGroupsByName'], exact: false });
            await queryClient.invalidateQueries({
                queryKey: [groupId],
                exact: false,
            });
            menu.value = null;
        },
    });
};
const archiveGroup = async (req, groupId) => {
    const response = await apiClient.put(`/groups/${groupId}/archive`, req);
    return response.data;
};
