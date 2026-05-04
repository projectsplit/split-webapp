import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { SimulationResponse } from '@/pages/Prometheus/Simulation/interfaces';

export const useGetCalculatedWealth = () => {
  return useQuery<SimulationResponse | null>({
    queryKey: ['simulation', 'calculatedWealth'],
    queryFn: getCalculatedWealth,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

const getCalculatedWealth = async (): Promise<SimulationResponse | null> => {
  const response = await apiClient.get<SimulationResponse>(`/risk-engine/calculatedwealth`);
  return response.data ?? null;
};
