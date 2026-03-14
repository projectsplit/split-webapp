import { useQuery } from '@tanstack/react-query';
import { Frequency, SpendingInfoResponse } from '../../../types';
import { apiClient } from '../../apiClients';

export const useSpendingInfo = (
  budgetFrequency: Frequency,
  currency: string
) => {
  return useQuery<SpendingInfoResponse>({
    queryKey: ['spending', budgetFrequency, currency],
    queryFn: () => getSpendingInfo(budgetFrequency, currency),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: true,
  });
};

const getSpendingInfo = async (
  budgetFrequency: Frequency,
  currency: string
): Promise<SpendingInfoResponse> => {
  const response = await apiClient.get<SpendingInfoResponse>(
    `/budget/spendinginfo?budgetFrequency=${budgetFrequency}&currency=${currency}`
  );
  return response.data;
};
