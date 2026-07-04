import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { Mode } from '@/types';
const getNonGroupTransferUsers = async () => {
    const response = apiClient.get('/users/search-non-group-transfer-users');
    return response;
};
export const useGetNonGroupTransferUsers = (mode) => {
    return useQuery({
        queryKey: ['non-group-transfer-users'],
        queryFn: () => getNonGroupTransferUsers(),
        enabled: mode === Mode.NonGroup,
    });
};
