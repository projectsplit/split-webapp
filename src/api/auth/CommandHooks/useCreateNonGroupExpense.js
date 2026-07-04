import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useCreateNonGroupExpense = (menu, navigate, setIsSubmitting, nonGroupUsers, fromHomeGroup, groupMembers, makePersonalClicked) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (expense) => createNonGroupExpense(expense),
        onSuccess: async () => {
            menu.value = null;
            navigate(`/shared/nongroup/expenses`);
            await queryClient.invalidateQueries({
                queryKey: ['nonGroupDebts'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['nonGroupExpenses'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['shared'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['mostRecentGroup'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['home'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['non-group-expense-users'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['cumulativeArray'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['personalExpenses'],
                exact: false,
            });
            const data = {
                nonGroupUsers: nonGroupUsers.value,
                fromHomeGroup: fromHomeGroup?.value,
                groupMembers: groupMembers.value,
            };
            if (groupMembers.value.length > 0 ||
                nonGroupUsers.value.length > 0 ||
                fromHomeGroup?.value) {
                localStorage.setItem('submittedFromHomePersistData', JSON.stringify(data));
            }
            if (makePersonalClicked) {
                localStorage.removeItem('submittedFromHomePersistData');
            }
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    });
};
const createNonGroupExpense = async (req) => {
    await apiClient.post('/expenses/create-non-group', req);
};
