import { apiClient } from '../../apiClients';
import { useMutation } from '@tanstack/react-query';
export const useJoinWithCode = (errorMessage) => {
    return useMutation({
        mutationFn: ({ code }) => joinWithCode({ code }),
        onSuccess: (_, variables) => {
            variables.onSuccess();
        },
        onError: (err) => {
            const error = err;
            errorMessage.value = String(error.response?.data);
        },
    });
};
const joinWithCode = async (req) => {
    await apiClient.post('/join', req);
};
