import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useMultipleGroupTransfers = (menu) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (transfers) => submitMultipleGroupTransfers(transfers),
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
            menu.value = null;
        },
    });
};
const submitMultipleGroupTransfers = async (req) => {
    const response = await apiClient.post('/transfers/create-many', req);
    return response.data;
};
