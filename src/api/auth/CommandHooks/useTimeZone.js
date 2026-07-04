import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useTimeZone = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (timeZone) => updateTimeZone({ timeZone }),
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['getMe'],
                exact: false,
            });
        },
        onError: (error) => {
            console.log(error);
        },
    });
};
const updateTimeZone = async (req) => {
    const response = await apiClient.put('/users/preferences/time-zone', req);
    return response.data;
};
