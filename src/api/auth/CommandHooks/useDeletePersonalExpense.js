import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useDeletePersonalExpense = (menu, errorMessage, selectedExpense) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (expenseId) => deleteExpense({ expenseId }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['personalExpenses'],
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
    const response = await apiClient.post('/expenses/delete-personal', req);
    return response.data;
};
