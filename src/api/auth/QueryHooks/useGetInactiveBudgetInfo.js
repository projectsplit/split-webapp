import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
const useGetInactiveBudgetInfo = () => {
    return useQuery({
        queryKey: ['budgets', 'inactive'],
        queryFn: getBudgetInfo,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 9000,
        enabled: true,
    });
};
const getBudgetInfo = async () => {
    const response = await apiClient.get(`/budgets/get-inactive`);
    return response.data;
};
export default useGetInactiveBudgetInfo;
