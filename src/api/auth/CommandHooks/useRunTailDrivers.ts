import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { Signal } from '@preact/signals-react';
import {
  TailDriversRequest,
  TailDriversResponse,
} from '@/pages/Prometheus/TailRisk/interfaces';

export const useRunTailDrivers = (serverErrors: Signal<any[]>) => {
  return useMutation<TailDriversResponse, any, TailDriversRequest>({
    mutationKey: ['tail-drivers'],
    mutationFn: runTailDrivers,
    onError: (error) => {
      const errorData = error.response?.data;
      serverErrors.value = errorData;
    },
  });
};

const runTailDrivers = async (
  request: TailDriversRequest,
): Promise<TailDriversResponse> => {
  const response = await apiClient.post<TailDriversResponse>(
    'risk-engine/taildrivers',
    request,
  );
  return response.data;
};
