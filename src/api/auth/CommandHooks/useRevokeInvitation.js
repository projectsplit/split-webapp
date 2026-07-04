import { apiClient } from '../../apiClients';
import { useMutation } from '@tanstack/react-query';
export const useRevokeInvitation = (userInvitationSent) => {
    return useMutation({
        mutationFn: ({ receiverId, groupId }) => revokeInvitation({ receiverId, groupId }),
        onSuccess: (_, variables) => {
            variables.onSuccess();
            userInvitationSent.value = false;
        },
        onError: (error) => {
            console.error('Failed to revoke invitation', error);
        },
    });
};
const revokeInvitation = async (req) => {
    await apiClient.post('/invitations/revoke', req);
};
