import { apiClient } from '../../apiClients';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useRevokeInvitationCode = (groupId, pageSize, invitationCode, mostRecentCodeHasBeenRevoked) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ code }) => revokeInvitationCode({ code }),
        onSuccess: (_, { code }) => {
            const url = new URL(window.location.href);
            if (code === invitationCode) {
                url.searchParams.delete('invitationcode');
                window.history.replaceState({}, '', url);
                mostRecentCodeHasBeenRevoked.value = true;
            }
            queryClient.setQueryData(['getGroupJoinCodes', groupId, pageSize], (oldData) => {
                if (!oldData)
                    return oldData;
                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        codes: page.codes.filter((item) => item.id !== code),
                    })),
                };
            });
        },
        onError: (error) => {
            console.error(error);
        },
    });
};
const revokeInvitationCode = async (req) => {
    const response = await apiClient.post('/join/revoke', req);
    return response.data.code;
};
