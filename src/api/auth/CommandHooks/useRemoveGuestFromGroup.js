import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useRemoveGuestFromGroup = (groupId, noGroupError, noMemberError) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (guestId) => {
            if (!groupId) {
                noGroupError.value = 'No group found';
                return Promise.reject(new Error('No group found'));
            }
            if (!guestId) {
                noMemberError.value = 'No member found';
                return Promise.reject(new Error('No member found'));
            }
            return removeGuest({ guestId }, groupId);
        },
        onSuccess: async (_, guestId) => {
            const previousGroup = queryClient.getQueryData([
                groupId,
            ]);
            if (previousGroup) {
                queryClient.setQueryData([groupId], {
                    ...previousGroup,
                    guests: previousGroup.guests.filter((m) => m.id !== guestId),
                });
            }
            await queryClient.invalidateQueries({ queryKey: ['home'], exact: false });
            await queryClient.invalidateQueries({
                queryKey: ['debts', groupId],
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
        },
        onError: (error) => {
            console.error('Failed to remove guest:', error.message);
            noMemberError.value = 'Failed to remove guest. Please try again.';
        },
    });
};
const removeGuest = async (req, groupId) => {
    const response = await apiClient.post(`/groups/${groupId}/remove-guest`, req);
    return response.data;
};
