import { apiClient } from '../../apiClients';
import { useMutation } from '@tanstack/react-query';
export const useGenerateInvitationCode = () => {
    return useMutation({
        mutationFn: ({ groupId }) => generateInvitationCode({ groupId }),
        onError: (error) => {
            console.error(error);
        },
    });
};
const generateInvitationCode = async (req) => {
    const response = await apiClient.post('/join/create', req);
    return response.data.code;
};
