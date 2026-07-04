import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useDeleteUserLabel = (errorMessage, menu) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ labelId }) => deleteUserLabel({ labelId }),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['userLabels'],
                exact: false,
            });
        },
        onError: (err) => {
            const error = err;
            errorMessage.value = String(error.response?.data);
            menu.value = 'generalWarning';
        },
    });
};
const deleteUserLabel = async (req) => {
    const response = await apiClient.post('/users/delete-user-label', req);
    return response.data;
};
