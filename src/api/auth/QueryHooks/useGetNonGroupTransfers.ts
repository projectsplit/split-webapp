import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import {
  GetGroupTransfersResponse,
  TransferParsedFilters,
} from '../../../types';
import { apiClient } from '../../apiClients';
import { AxiosResponse } from 'axios';
import { Signal } from '@preact/signals-react';
import { appendFilterToParams } from '../helpers/appendFilterToParams';

type PageParam = { next?: string; previous?: string };

const useGetNonGroupTransfers = (
  transferParsedFilters: Signal<TransferParsedFilters>,
  pageSize: number,
  timeZoneId: string,
  enabled: boolean = true,
  jumpToken?: string
) => {
  const queryKey = [
    'nonGroupTransfers',
    pageSize,
    transferParsedFilters.value,
    timeZoneId,
    jumpToken,
  ].filter(Boolean);

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => {
      const { next, previous } = pageParam as PageParam;
      return getNonGroupTransfers(
        pageSize,
        transferParsedFilters.value,
        next,
        previous
      );
    },
    getNextPageParam: (lastPage): PageParam | undefined =>
      lastPage?.next ? { next: lastPage.next } : undefined,
    getPreviousPageParam: (firstPage): PageParam | undefined =>
      firstPage?.previous ? { previous: firstPage.previous } : undefined,
    initialPageParam: { next: jumpToken || '' } as PageParam,
    placeholderData: keepPreviousData,
    enabled,
  });

  return { ...query };
};

const getNonGroupTransfers = async (
  pageSize: number,
  parsedFilters: TransferParsedFilters = {},
  next?: string,
  previous?: string
): Promise<GetGroupTransfersResponse> => {
  const { sendersIds = [], receiversIds = [], ...base } = parsedFilters;

  const params = appendFilterToParams(base, {
    pageSize,
    next,
    previous,
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
