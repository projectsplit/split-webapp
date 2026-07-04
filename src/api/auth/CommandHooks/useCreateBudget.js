import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useCreateBudget = (navigate, serverErrors, menu) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['budgets', 'create'],
        mutationFn: createBudget,
        onError: (error) => {
            const errorData = error.response?.data;
            serverErrors.value = errorData;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['budgets'] });
            menu.value = null;
            navigate('/budget/manage', { replace: true });
        },
    });
};
const createBudget = async (request) => {
    const response = await apiClient.post(`/budgets/create`, request);
    return response.data;
};
