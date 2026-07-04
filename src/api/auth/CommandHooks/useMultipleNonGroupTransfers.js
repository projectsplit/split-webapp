import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useMultipleNonGroupTransfers = (menu) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (transfers) => submitMultipleNonGroupTransfers(transfers),
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
            menu.value = null;
        },
    });
};
const submitMultipleNonGroupTransfers = async (req) => {
    const response = await apiClient.post('/transfers/create-many-non-group', req);
    return response.data;
};
