import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { Correlations, CustomRisk, Financials, RiskToggles } from '@/pages/Prometheus/interfaces';

export const useGetMostRecentRiskSetup = () => {
  return useQuery<MostRecentSetupResponse>({
    queryKey: ['simulation', 'mostRecentRiskSetup'],
    queryFn: getMostRecentRiskSetup,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: true,
  });
};

const getMostRecentRiskSetup = async (): Promise<MostRecentSetupResponse> => {
  const response =
    await apiClient.get<MostRecentSetupResponse>(`/risk-engine/mostrecentsetup`);
  return response.data;
};  

type MostRecentSetupResponse = {
  economy: string;
  financials: Financials;
  risk_toggles: RiskToggles;
  custom_risks: CustomRisk[];
  correlations?: Correlations;
};