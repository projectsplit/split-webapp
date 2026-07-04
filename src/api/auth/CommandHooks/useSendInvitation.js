import { apiClient } from '../../apiClients';
import { useMutation } from '@tanstack/react-query';
export const useSendInvitation = (userInvitationSent) => {
    return useMutation({
        mutationFn: ({ receiverId, groupId, guestId, guestName }) => sendInvitation({ receiverId, groupId, guestId, guestName }),
        onSuccess: (_, variables) => {
            variables.onSuccess();
            userInvitationSent.value = true;
        },
        onError: (error) => {
            console.error('Failed to send invitation', error);
        },
    });
};
const sendInvitation = async (req) => {
    await apiClient.post('/invitations/send', req);
};
