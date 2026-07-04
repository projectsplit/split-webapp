import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useToggleBudget = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['budgets', 'toggle'],
        mutationFn: toggleBudget,
        onError: (error) => {
            const errorData = error.response?.data;
            console.log(errorData);
        },
        onSuccess: () => {
            queryClient.removeQueries({ queryKey: ['budgets', 'active'], exact: true });
            queryClient.invalidateQueries({ queryKey: ['budgets'] });
        },
    });
};
const toggleBudget = async (request) => {
    const response = await apiClient.post(`/budgets/toggle-status`, request || '');
    return response.data;
};
