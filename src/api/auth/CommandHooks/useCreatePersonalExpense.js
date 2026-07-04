import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useCreatePersonalExpense = (menu, navigate, setIsSubmitting, makePersonalClicked) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (expense) => createPersonalExpense(expense),
        onSuccess: async () => {
            menu.value = null;
            if (makePersonalClicked) {
                localStorage.removeItem('submittedFromHomePersistData');
            }
            navigate(`/personal`);
            await queryClient.invalidateQueries({
                queryKey: ['personalExpenses'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['cumulativeArray'],
                exact: false,
            });
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    });
};
const createPersonalExpense = async (req) => {
    await apiClient.post('/expenses/create-personal', req);
};
