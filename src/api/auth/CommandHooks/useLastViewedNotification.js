import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useLastViewedNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (timestamp) => {
            if (!timestamp) {
                return Promise.resolve(null); // or simply return null
            }
            return updateLastViewedNotification({ timestamp });
        },
        onSuccess: async () => {
            const currentUserInfo = queryClient.getQueryData(['getMe']);
            if (currentUserInfo) {
                queryClient.setQueryData(['getMe'], {
                    ...currentUserInfo,
                    hasNewerNotifications: false,
                });
            }
        },
        onError: (error) => {
            console.log(error);
        },
    });
};
const updateLastViewedNotification = async (req) => {
    const response = await apiClient.put('/users/activity/last-viewed-notification', req);
    return response.data;
};
