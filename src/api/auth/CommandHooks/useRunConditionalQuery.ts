import { useMutation } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { Signal } from '@preact/signals-react';
import {
  ConditionalQueryRequest,
  ConditionalQueryResponse,
} from '@/pages/Prometheus/Conditional/interfaces';

export const useRunConditionalQuery = (serverErrors: Signal<any[]>) => {
  return useMutation<ConditionalQueryResponse, any, ConditionalQueryRequest>({
    mutationKey: ['conditional-query'],
    mutationFn: runConditionalQuery,
    onError: (error) => {
      const errorData = error.response?.data;
      serverErrors.value = errorData;
    },
  });
};

const runConditionalQuery = async (
  request: ConditionalQueryRequest,
): Promise<ConditionalQueryResponse> => {
  const response = await apiClient.post<ConditionalQueryResponse>(
    'risk-engine/conditional',
    request,
  );
  return response.data;
};
