import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { FactorsResponse } from '@/pages/Prometheus/WhatIf/interfaces';

export const useGetRiskFactors = () => {
  return useQuery<FactorsResponse>({
    queryKey: ['riskFactors'],
    queryFn: getRiskFactors,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    gcTime: Infinity,
  });
};

const getRiskFactors = async (): Promise<FactorsResponse> => {
  const response = await apiClient.get<FactorsResponse>('risk-engine/factors');
  return response.data;
};
