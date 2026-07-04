import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useSetPushNotificationsEnabled = () => {
    const queryClient = useQueryClient();
    const queryKey = ['getMe'];
    return useMutation({
        mutationFn: (enabled) => setPushNotificationsEnabled(enabled),
        onMutate: async (enabled) => {
            await queryClient.cancelQueries({ queryKey });
            const previousUserInfo = queryClient.getQueryData(queryKey);
            if (previousUserInfo) {
                queryClient.setQueryData(queryKey, {
                    ...previousUserInfo,
                    pushNotificationsEnabled: enabled,
                });
            }
            return { previousUserInfo };
        },
        onError: (err, _enabled, context) => {
            if (context?.previousUserInfo) {
                queryClient.setQueryData(queryKey, context.previousUserInfo);
            }
            console.error('Failed to update push notifications setting:', err);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });
};
const setPushNotificationsEnabled = async (enabled) => {
    const response = await apiClient.put('/notifications/preference', { enabled });
    return response.data;
};
