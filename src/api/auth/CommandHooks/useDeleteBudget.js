import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useDeleteBudget = (menu, errorMessage) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (budgetId) => deleteBudget({ budgetId }),
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: ['budgets', 'active'], exact: true });
            await queryClient.invalidateQueries({
                queryKey: ['budgets'],
            });
            menu.value = null;
        },
        onError: (err) => {
            const error = err;
            errorMessage.value = String(error.response?.data);
        },
    });
};
const deleteBudget = async (req) => {
    const response = await apiClient.post('/budgets/delete', req);
    return response.data;
};
