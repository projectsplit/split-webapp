import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useEditBudget = (navigate, serverErrors, menu) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationKey: ['budgets', 'update'],
        mutationFn: editBudget,
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
const editBudget = async (request) => {
    const response = await apiClient.post(`/budgets/edit`, request);
    return response.data;
};
