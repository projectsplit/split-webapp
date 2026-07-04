import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useDeleteNonGroupTransfer = (menu, errorMessage, selectedTransfer) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (transferId) => deleteTransfer({ transferId }),
        onSuccess: async () => {
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
                queryKey: ['mostRecentGroup'],
                exact: false,
            });
            selectedTransfer.value = null;
            menu.value = null;
        },
        onError: (err) => {
            const error = err;
            errorMessage.value = String(error.response?.data);
            selectedTransfer.value = null;
        },
    });
};
const deleteTransfer = async (req) => {
    const response = await apiClient.post('/transfers/delete-non-group', req);
    return response.data;
};
