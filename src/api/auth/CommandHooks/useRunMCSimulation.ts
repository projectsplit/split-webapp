import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { Signal } from '@preact/signals-react';

import {
  Financials,
  RiskToggles,
  CustomRisk,
  Correlations,
} from '@/pages/Prometheus/interfaces';

type SimulationRequest = {
  economy: string;
  financials: Financials;
  risk_toggles: RiskToggles;
  custom_risks: CustomRisk[];
  correlations?: Correlations;
};

export const useRunMCSimulation = (serverErrors: Signal<any[]>) => {
  return useMutation<any, any, SimulationRequest>({
    mutationKey: ['simulation'],
    mutationFn: runMCSimulation,
    onError: (error) => {
      const errorData = error.response?.data;
      serverErrors.value = errorData;
    },
  });
};

const runMCSimulation = async (request: SimulationRequest) => {
  const response = await apiClient.post<SimulationRequest>(
    `risk-engine/simulate`,
    request
  );
  return response.data;
};
