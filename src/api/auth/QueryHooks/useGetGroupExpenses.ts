import { useInfiniteQuery } from '@tanstack/react-query';
import {
  ExpenseParsedFilters,
  GetExpensesResponse,
  Group,
} from '../../../types';
import { apiClient } from '../../apiClients';
import { AxiosResponse } from 'axios';
import { Signal } from '@preact/signals-react';
import { appendGroupFilterToParams } from '../helpers/appendGroupFilterToParams';

type PageParam = { next?: string; previous?: string };

const useGetGroupExpenses = (
  group: Group,
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  pageSize: number,
  timeZoneId: string,
  enabled: boolean = true,
  jumpToken?: string
) => {
  const queryKey = [
    'groupExpenses',
    group?.id,
    pageSize,
    expenseParsedFilters.value,
    timeZoneId,
    jumpToken,
  ];

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) => {
      const { next, previous } = pageParam as PageParam;
      return getGroupExpenses(
        group?.id!,
        pageSize,
        expenseParsedFilters.value,
        next,
        previous
      );
    },
    getNextPageParam: (lastPage): PageParam | undefined =>
      lastPage?.next ? { next: lastPage.next } : undefined,
    getPreviousPageParam: (firstPage): PageParam | undefined =>
      firstPage?.previous ? { previous: firstPage.previous } : undefined,
    initialPageParam: { next: jumpToken || '' } as PageParam,
    enabled: enabled && !!group?.id,
  });

  return { ...query };
};

const getGroupExpenses = async (
  groupId: string,
  pageSize: number,
  parsedFilters: ExpenseParsedFilters = {},
  next?: string,
  previous?: string
): Promise<GetExpensesResponse> => {
  const {
    participantsIds = [],
    payersIds = [],
    labels = [],
    ...base
  } = parsedFilters;

  const params = appendGroupFilterToParams(groupId, base, {
    pageSize,
    next,
    previous,
    arrayMappings: [
      { key: 'participantIds', values: participantsIds },
      { key: 'payerIds', values: payersIds },
      { key: 'labelIds', values: labels },
    ],
  });

  const response = await apiClient.get<
    void,
    AxiosResponse<GetExpensesResponse>
  >('/expenses', { params });

  return response.data;
};

export default useGetGroupExpenses;
