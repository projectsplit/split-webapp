import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useDeleteExpense = (menu, errorMessage, selectedExpense) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (expenseId) => deleteExpense({ expenseId }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['debts'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['groupExpenses'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['personalExpenses'],
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
                queryKey: ['cumulativeArray'],
                exact: false,
            });
            selectedExpense.value = null;
            menu.value = null;
        },
        onError: (err) => {
            const error = err;
            errorMessage.value = String(error.response?.data);
            selectedExpense.value = null;
        },
    });
};
const deleteExpense = async (req) => {
    const response = await apiClient.post('/expenses/delete', req);
    return response.data;
};
