import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { NavigateFunction } from 'react-router-dom';
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

export const useRunMCSimulation = (
  navigate: NavigateFunction,
  serverErrors: Signal<any[]>,
 
) => {
  const queryClient = useQueryClient();

  return useMutation<any, any, SimulationRequest>({
    mutationKey: ['simulation'],
    mutationFn: runMCSimulation,
    onError: (error) => {
      const errorData = error.response?.data;
      serverErrors.value = errorData;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['simulation'] });
      navigate('/prometheus/simulations', {
        replace: true,
        state: { simulationResponse: data, simulationInput: variables },
      });
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
