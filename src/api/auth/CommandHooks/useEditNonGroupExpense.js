import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useEditNonGroupExpense = (menu, setIsSubmitting, nonGroupUsers, fromHomeGroup, groupMembers, makePersonalClicked, isNonGroupExpense, selectedExpense) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (expense) => editExpense(expense),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['nonGroupDebts'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['nonGroupExpenses'],
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
            await queryClient.invalidateQueries({
                queryKey: ['personalExpenses'],
                exact: false,
            });
            if (selectedExpense) {
                selectedExpense.value = null;
            }
            if (isNonGroupExpense && isNonGroupExpense.value) {
                const data = {
                    nonGroupUsers: nonGroupUsers.value,
                    fromHomeGroup: fromHomeGroup?.value,
                    groupMembers: groupMembers.value,
                };
                if (groupMembers.value.length > 0 ||
                    nonGroupUsers.value.length > 0 ||
                    fromHomeGroup?.value)
                    localStorage.setItem('submittedFromHomePersistData', JSON.stringify(data));
            }
            if (makePersonalClicked) {
                localStorage.removeItem('submittedFromHomePersistData');
            }
            menu.value = null;
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    });
};
const editExpense = async (req) => {
    await apiClient.post('/expenses/edit-non-group', req);
};
