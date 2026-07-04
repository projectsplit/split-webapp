import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useSpendingInfo = (budgetFrequency, currency) => {
    return useQuery({
        queryKey: ['spending', budgetFrequency, currency],
        queryFn: () => getSpendingInfo(budgetFrequency, currency),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 9000,
        enabled: true,
    });
};
const getSpendingInfo = async (budgetFrequency, currency) => {
    const response = await apiClient.get(`/budget/spendinginfo?budgetFrequency=${budgetFrequency}&currency=${currency}`);
    return response.data;
};
