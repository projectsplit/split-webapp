import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
export const useTotalLentBorrowedArrays = (startDate, endDate, currency) => {
    return useQuery({
        queryKey: ['totalLentBorrowed', startDate, endDate, currency],
        queryFn: () => getTotalLentBorrowedArrays(startDate, endDate, currency),
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 10000,
        enabled: true,
    });
};
const getTotalLentBorrowedArrays = async (startDate, endDate, currency) => {
    const response = await apiClient.get(`/analytics/totallentborrowed?startDate=${startDate}&endDate=${endDate}&currency=${currency}`);
    return response.data;
};
