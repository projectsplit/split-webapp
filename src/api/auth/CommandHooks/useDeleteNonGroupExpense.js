import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useDeleteNonGroupExpense = (menu, errorMessage, selectedExpense) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (expenseId) => deleteExpense({ expenseId }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['nonGroupDebts'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['nonGroupExpenses'],
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
    const response = await apiClient.post('/expenses/delete-non-group', req);
    return response.data;
};
