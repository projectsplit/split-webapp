import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import {
  FairPremiumRequest,
  FairPremiumResponse,
} from '@/pages/Prometheus/WhatIf/interfaces';

export const useGetFairPremium = () => {
  return useMutation<FairPremiumResponse, Error, FairPremiumRequest>({
    mutationFn: getFairPremium,
  });
};

const getFairPremium = async (
  req: FairPremiumRequest,
): Promise<FairPremiumResponse> => {
  const response = await apiClient.post<FairPremiumResponse>(
    'risk-engine/fairpremium',
    req,
  );
  return response.data;
};
