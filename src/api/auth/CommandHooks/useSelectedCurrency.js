import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useSelectedCurrency = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (currency) => updateSelectedCurrency({ currency }),
        onMutate: (currency) => {
            const currentUserInfo = queryClient.getQueryData(['getMe']);
            if (currentUserInfo) {
                queryClient.setQueryData(['getMe'], {
                    ...currentUserInfo,
                    currency: currency,
                });
            }
        },
        onSuccess: async () => {
            queryClient.invalidateQueries({
                queryKey: ['getMe'],
                exact: false,
            });
            queryClient.invalidateQueries({
                queryKey: ['debts'],
                exact: false,
            });
            queryClient.invalidateQueries({
                queryKey: ['nonGroupDebts'],
                exact: false,
            });
            queryClient.invalidateQueries({
                queryKey: ['userTotals'],
                exact: false,
            });
        },
        onError: (error) => {
            console.log(error);
        },
    });
};
const updateSelectedCurrency = async (req) => {
    const response = await apiClient.put('/users/preferences/currency', req);
    return response.data;
};
