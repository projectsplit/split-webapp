import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useLeaveGroup = (menu, groupId, groupError, navigate, openGroupOptionsMenu) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            if (!groupId) {
                groupError.value = 'Could not find your group. Please try again.';
                return Promise.reject(new Error('No group found'));
            }
            return leaveGroup(groupId);
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ['home'], exact: false });
            await queryClient.invalidateQueries({
                queryKey: ['shared'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['mostRecentGroup'],
                exact: false,
            });
            menu.value = null;
            openGroupOptionsMenu.value = false;
            navigate('/shared');
        },
        onError: (error) => {
            // console.log("Error response data:", error.response?.data);
            if (error.response?.status === 400) {
                // console.log( typeof error.response.data === "string", error.response.data)
                groupError.value =
                    typeof error.response.data === 'string'
                        ? (groupError.value = error.response.data)
                        : (groupError.value = 'Something went wrong. Please try again');
            }
        },
    });
};
const leaveGroup = async (groupId) => {
    const response = await apiClient.post(`/groups/${groupId}/leave`);
    return response.data;
};
