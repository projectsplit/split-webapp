import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useCreateGroupExpense = (menu, groupId, navigate, setIsSubmitting, makePersonalClicked, nonGroupUsers, fromHomeGroup, groupMembers, fromHome) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (expense) => createGroupExpense(expense),
        onSuccess: async () => {
            menu.value = null;
            if (groupId) {
                navigate(`/shared/${groupId}/expenses`);
            }
            await queryClient.invalidateQueries({
                queryKey: ['debts'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['groupExpenses'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['home'],
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
                queryKey: ['cumulativeArray'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: ['personalExpenses'],
                exact: false,
            });
            await queryClient.invalidateQueries({
                queryKey: [groupId],
                exact: false,
            });
            if (fromHome) {
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
        },
        onSettled: () => {
            setIsSubmitting(false);
        },
    });
};
const createGroupExpense = async (req) => {
    await apiClient.post('/expenses/create', req);
};
