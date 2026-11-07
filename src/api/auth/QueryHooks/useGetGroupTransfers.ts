import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import {
  GetGroupTransfersResponse,
  Group,
  TransferParsedFilters,
} from '../../../types';
import { apiClient } from '../../apiClients';
import { AxiosResponse } from 'axios';
import { Signal } from '@preact/signals-react';
import { appendFilterToParams } from '../helpers/appendFilterToParams';

type PageParam = { next?: string; previous?: string };

const useGetGroupTransfers = (
  group: Group,
  transferParsedFilters: Signal<TransferParsedFilters>,
  pageSize: number,
  timeZoneId: string,
  enabled: boolean = true,
  jumpToken?: string
) => {
  const queryKey = [
    'groupTransfers',
    group?.id,
    pageSize,
    transferParsedFilters.value,
    timeZoneId,
    jumpToken,
  ];

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => {
      const { next, previous } = pageParam as PageParam;
      return getGroupTransfers(
        group?.id!,
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
    enabled: enabled && !!group,
  });

  return { ...query };
};

const getGroupTransfers = async (
  groupId: string,
  pageSize: number,
  parsedFilters: TransferParsedFilters = {},
  next?: string,
  previous?: string
): Promise<GetGroupTransfersResponse> => {
  const { sendersIds = [], receiversIds = [], ...base } = parsedFilters;

  const params = appendFilterToParams(base, {
    groupId,
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
  >('/transfers', { params });
  return response.data;
};

export default useGetGroupTransfers;
