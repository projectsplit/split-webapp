import { useQuery } from '@tanstack/react-query';
import { InactiveBudgetsInfoResponse } from '../../../types';
import { apiClient } from '../../apiClients';

const useGetInactiveBudgetInfo = () => {
  return useQuery<InactiveBudgetsInfoResponse>({
    queryKey: ['inactiveBudgets'],
    queryFn: getBudgetInfo,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: true,
  });
};

const getBudgetInfo = async (): Promise<InactiveBudgetsInfoResponse> => {
  const response =
    await apiClient.get<InactiveBudgetsInfoResponse>(`/budgets/get-inactive`);
  return response.data;
};  

export default useGetInactiveBudgetInfo;
