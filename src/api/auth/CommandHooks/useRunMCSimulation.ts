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

type SimulationCache = {
  input: SimulationRequest;
  response: any;
};

export const SIMULATION_CACHE_KEY = ['simulation-cache'] as const;

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
      queryClient.setQueryData<SimulationCache>(
        SIMULATION_CACHE_KEY,
        { input: variables, response: data },
      );
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
