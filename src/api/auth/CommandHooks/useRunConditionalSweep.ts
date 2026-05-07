import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { Signal } from '@preact/signals-react';
import {
  ConditionalSweepRequest,
  ConditionalSweepResponse,
} from '@/pages/Prometheus/ThresholdSensitivity/interfaces';

export const useRunConditionalSweep = (serverErrors: Signal<any[]>) => {
  return useMutation<ConditionalSweepResponse, any, ConditionalSweepRequest>({
    mutationKey: ['conditional-sweep'],
    mutationFn: runConditionalSweep,
    onError: (error) => {
      const errorData = error.response?.data;
      serverErrors.value = errorData;
    },
  });
};

const runConditionalSweep = async (
  request: ConditionalSweepRequest,
): Promise<ConditionalSweepResponse> => {
  const response = await apiClient.post<ConditionalSweepResponse>(
    'risk-engine/conditionalsweep',
    request,
  );
  return response.data;
};
