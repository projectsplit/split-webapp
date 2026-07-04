import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useCreateNonGroupTransfer = (menu, navigate, isSubmitting) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (transfer) => submitTransfer(transfer),
        onSuccess: async () => {
            menu.value = null;
            navigate(`/shared/nongroup/transfers`);
            await queryClient.invalidateQueries({
                queryKey: ['nonGroupDebts'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['nonGroupTransfers'],
                exact: false,
            });
            await queryClient.invalidateQueries({ queryKey: ['home'], exact: false });
            await queryClient.invalidateQueries({
                queryKey: ['shared'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['home'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['mostRecentGroup'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['non-group-transfer-users'],
                exact: false,
            });
            isSubmitting.value = false;
        },
    });
};
const submitTransfer = async (req) => {
    const response = await apiClient.post('/transfers/create-non-group', req);
    return response.data;
};
