import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { Mode } from '@/types';
const getNonGroupExpensesUsers = async () => {
    const response = apiClient.get('/users/search-non-group-expense-users');
    return response;
};
export const useGetNonGroupExpensesUsers = (mode) => {
    return useQuery({
        queryKey: ['non-group-expense-users'],
        queryFn: () => getNonGroupExpensesUsers(),
        enabled: mode === Mode.NonGroup,
    });
};
