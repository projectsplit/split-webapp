import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useChangeGroupCurrency = (groupId, noGroupFoundError, refetchQueries) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (currency) => {
            if (!groupId) {
                noGroupFoundError.value = 'No group found';
                return Promise.reject(new Error('No group found'));
            }
            return updateGroupCurrency({ currency }, groupId);
        },
        onMutate: (currency) => {
            const currentGroup = queryClient.getQueryData([groupId]);
            if (currentGroup) {
                queryClient.setQueryData([groupId], {
                    ...currentGroup,
                    currency: currency,
                });
            }
        },
        onSuccess: () => {
            refetchQueries.value = true;
        },
        onError: (error) => {
            console.log(error);
        },
    });
};
const updateGroupCurrency = async (req, groupId) => {
    const response = await apiClient.put(`/groups/${groupId}/currency`, req);
    return response.data;
};
