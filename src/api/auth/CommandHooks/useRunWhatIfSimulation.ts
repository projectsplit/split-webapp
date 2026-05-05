import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { Signal } from '@preact/signals-react';
import {
  WhatIfRequest,
  WhatIfResponse,
} from '@/pages/Prometheus/WhatIf/interfaces';

export interface WhatIfSnapshot {
  request: WhatIfRequest;
  response: WhatIfResponse;
  equitySplit: number;
}

const STORAGE_KEY = 'whatif-snapshot';
const SNAPSHOT_KEY = ['whatif-last-snapshot'];

const buildCacheKey = (req: WhatIfRequest) => [
  'whatif-result',
  JSON.stringify(req),
];

const readSessionSnapshot = (): WhatIfSnapshot | undefined => {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as WhatIfSnapshot;
  } catch {
    return undefined;
  }
};

const writeSessionSnapshot = (snapshot: WhatIfSnapshot) => {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // quota exceeded — silently ignore
  }
};

export const clearWhatIfCache = (queryClient: ReturnType<typeof useQueryClient>) => {
  queryClient.removeQueries({ queryKey: SNAPSHOT_KEY });
  queryClient.removeQueries({ queryKey: ['whatif-result'] });
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
};

export const useRunWhatIfSimulation = (serverErrors: Signal<any[]>) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<WhatIfResponse, any, WhatIfRequest>({
    mutationKey: ['whatif-simulation'],
    mutationFn: runWhatIfSimulation,
    onSuccess: (data, variables) => {
      queryClient.setQueryData(buildCacheKey(variables), data);
    },
    onError: (error) => {
      const errorData = error.response?.data;
      serverErrors.value = errorData;
    },
  });

  const runWithCache = async (req: WhatIfRequest): Promise<WhatIfResponse> => {
    const cached = queryClient.getQueryData<WhatIfResponse>(buildCacheKey(req));
    if (cached) return cached;
    return mutation.mutateAsync(req);
  };

  const saveSnapshot = (snapshot: WhatIfSnapshot) => {
    queryClient.setQueryData(SNAPSHOT_KEY, snapshot);
    writeSessionSnapshot(snapshot);
  };

  const getSnapshot = (): WhatIfSnapshot | undefined => {
    const memCached = queryClient.getQueryData<WhatIfSnapshot>(SNAPSHOT_KEY);
    if (memCached) return memCached;

    const stored = readSessionSnapshot();
    if (stored) {
      queryClient.setQueryData(SNAPSHOT_KEY, stored);
      queryClient.setQueryData(buildCacheKey(stored.request), stored.response);
    }
    return stored;
  };

  return { ...mutation, runWithCache, saveSnapshot, getSnapshot };
};

const runWhatIfSimulation = async (
  request: WhatIfRequest,
): Promise<WhatIfResponse> => {
  const response = await apiClient.post<WhatIfResponse>(
    'risk-engine/whatif',
    request,
  );
  return response.data;
};
