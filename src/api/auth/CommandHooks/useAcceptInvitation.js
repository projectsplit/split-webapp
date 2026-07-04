import { apiClient } from '../../apiClients';
import { useMutation, useQueryClient } from '@tanstack/react-query';
export const useAcceptInvitation = (navigate, invitation, menu) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (invitationId) => acceptInvitation({ invitationId }),
        onMutate: async (invitationId) => {
            await queryClient.cancelQueries({ queryKey: ['userInvitations'] });
            const previousInvitations = queryClient.getQueryData(['userInvitations', 10]);
            queryClient.setQueryData(['userInvitations', 10], (old) => {
                if (!old)
                    return old;
                let newPages = old.pages.map((page) => ({
                    ...page,
                    invitations: page.invitations.filter((inv) => inv.id !== invitationId),
                }));
                newPages = newPages.filter((page) => page.invitations.length > 0);
                const newPageParams = old.pageParams.slice(0, newPages.length);
                return {
                    pages: newPages,
                    pageParams: newPageParams,
                };
            });
            return { previousInvitations };
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['userInvitations'],
                exact: false,
            });
            queryClient.invalidateQueries({ queryKey: ['home'], exact: false });
            queryClient.invalidateQueries({ queryKey: ['shared'], exact: false });
            navigate(`/shared/${invitation.groupId}/expenses`);
            menu.value = null;
        },
        onError: (error, invitationId, context) => {
            // Rollback to the previous state if the mutation fails
            queryClient.setQueryData(['userInvitations', 10], context?.previousInvitations);
            queryClient.invalidateQueries({
                queryKey: ['userInvitations'],
                exact: false,
            });
            console.error(error);
        },
        onSettled: () => {
            // Optionally refetch to ensure the data is fully up-to-date (runs in background)
            queryClient.refetchQueries({
                queryKey: ['userInvitations'],
                exact: false,
            });
        },
    });
};
const acceptInvitation = async (req) => {
    await apiClient.post('/invitations/accept', req);
};
