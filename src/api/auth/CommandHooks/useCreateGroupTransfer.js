import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useCreateGroupTransfer = (menu, groupId, navigate, isSubmitting, fromHomeGroup) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (transfer) => submitTransfer(transfer),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['debts'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['groupTransfers'],
                exact: false,
            });
            await queryClient.invalidateQueries({ queryKey: ['home'], exact: false });
            await queryClient.invalidateQueries({
                queryKey: ['shared'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['mostRecentGroup'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: [groupId],
                exact: false,
            });
            isSubmitting.value = false;
            menu.value = null;
            if (fromHomeGroup?.value) {
                navigate(`/shared/${groupId}/transfers`);
            }
        },
    });
};
const submitTransfer = async (req) => {
    const response = await apiClient.post('/transfers/create', req);
    return response.data;
};
