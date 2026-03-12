import { useInfiniteQuery } from '@tanstack/react-query';
import {
  GetGroupTransfersResponse,
  TransferParsedFilters,
} from '../../../types';
import { apiClient } from '../../apiClients';
import { AxiosResponse } from 'axios';
import { Signal } from '@preact/signals-react';
import { appendNonGroupFilterToParams } from '../helpers/appendNonGroupFilterToParams';

const useGetNonGroupTransfers = (
  transferParsedFilters: Signal<TransferParsedFilters>,
  pageSize: number,
  timeZoneId: string,
  enabled: boolean = true
) => {
  const queryKey = [
    'nonGroupTransfers',
    pageSize,
    transferParsedFilters.value,
    timeZoneId,
  ].filter(Boolean);

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam: next }) =>
      getNonGroupTransfers(pageSize, transferParsedFilters.value, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: '',
    enabled,
  });

  return { ...query };
};

const getNonGroupTransfers = async (
  pageSize: number,
  parsedFilters: TransferParsedFilters = {},
  next?: string
): Promise<GetGroupTransfersResponse> => {
  const { sendersIds = [], receiversIds = [], ...base } = parsedFilters;

  const params = appendNonGroupFilterToParams(base, {
    pageSize,
    next,
    arrayMappings: [
      { key: 'senderIds', values: sendersIds },
      { key: 'receiverIds', values: receiversIds },
    ],
  });

  const response = await apiClient.get<
    void,
    AxiosResponse<GetGroupTransfersResponse>
  >('/transfers/non-group', { params });
  return response.data;
};

export default useGetNonGroupTransfers;
