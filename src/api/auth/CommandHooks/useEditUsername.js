import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useEditUsername = (groupId) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (username) => editUsername({ username }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['getMe'] });
            if (groupId) {
                await queryClient.invalidateQueries({
                    queryKey: [groupId],
                    exact: false,
                });
            }
            await queryClient.invalidateQueries({ queryKey: ['home'], exact: false });
        },
    });
};
const editUsername = async (req) => {
    await apiClient.put('/users/username', req);
};
