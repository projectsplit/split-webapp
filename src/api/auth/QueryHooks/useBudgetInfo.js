import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
const useBudgetInfo = () => {
    return useQuery({
        queryKey: ['budgets', 'active'],
        queryFn: getBudgetInfo,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 9000,
        enabled: true,
    });
};
const getBudgetInfo = async () => {
    const response = await apiClient.get(`/budgets/get-active`);
    return response.data;
};
export default useBudgetInfo;
