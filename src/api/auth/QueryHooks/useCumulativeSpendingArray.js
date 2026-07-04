import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { Frequency } from '../../../types';
export const useCumulativeSpendingArray = (startDate, endDate, currency, granularity) => {
    return useQuery({
        queryKey: ['cumulativeArray', startDate, endDate, currency, granularity],
        queryFn: () => getCumulativeSpendingArray(startDate, endDate, granularity, currency),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 10000,
        enabled: !!currency,
    });
};
const getCumulativeSpendingArray = async (startDate, endDate, granularity, currency) => {
    const frequencyMap = {
        [Frequency.Weekly]: 'daily',
        [Frequency.Monthly]: 'daily',
        [Frequency.Annually]: 'monthly',
    };
    const granularityString = frequencyMap[granularity] || 'daily';
    const response = await apiClient.get(`/analytics/spendings-chart?granularity=${granularityString}&startDate=${startDate}&endDate=${endDate}&currency=${currency}`);
    return response.data;
};
