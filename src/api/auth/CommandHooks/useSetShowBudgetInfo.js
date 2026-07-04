import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useSetShowBudgetInfo = () => {
    const queryClient = useQueryClient();
    const queryKey = ['getMe'];
    return useMutation({
        mutationFn: (showBudgetInfo) => {
            return setShowBudgetInfo({ showBudgetInfo });
        },
        onMutate: async (newSetting) => {
            await queryClient.cancelQueries({ queryKey });
            const previousUserInfo = queryClient.getQueryData(queryKey);
            if (previousUserInfo) {
                queryClient.setQueryData(queryKey, {
                    ...previousUserInfo,
                    showBudgetInfo: newSetting,
                });
            }
            return { previousUserInfo };
        },
        onError: (err, newSetting, context) => {
            if (context?.previousUserInfo) {
                queryClient.setQueryData(queryKey, context.previousUserInfo);
            }
            console.error("Failed to update budget info:", err);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        },
    });
};
const setShowBudgetInfo = async (req) => {
    const response = await apiClient.put('/users/activity/show-budget-info', req);
    return response.data;
};
