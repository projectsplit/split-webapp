import { useInfiniteQuery } from '@tanstack/react-query';
import { ExpenseParsedFilters, GetExpensesResponse } from '../../../types';
import { apiClient } from '../../apiClients';
import { AxiosResponse } from 'axios';
import { Signal } from '@preact/signals-react';
import { appendPersonalFilterToParams } from '../helpers/appendPersonalFilterToParams';

export const useGetPersonalExpenses = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  pageSize: number,
  timeZoneId: string,
  enabled: boolean = true
) => {
  const queryKey = [
    'personalExpenses',
    pageSize,
    expenseParsedFilters.value,
    timeZoneId,
  ].filter(Boolean);

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam: next }) =>
      getPersonalExpenses(pageSize, expenseParsedFilters.value, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    getPreviousPageParam: (firstPage) => firstPage?.previous || undefined,
    initialPageParam: '',
    enabled,
  });

  return { ...query };
};

const getPersonalExpenses = async (
  pageSize: number,
  parsedFilters: ExpenseParsedFilters = {},
  next?: string
): Promise<GetExpensesResponse> => {
  const { labels = [], ...base } = parsedFilters;

  const params = appendPersonalFilterToParams(base, {
    pageSize,
    next,
    arrayMappings: [{ key: 'labelIds', values: labels }],
  });

  const response = await apiClient.get<
    void,
    AxiosResponse<GetExpensesResponse>
  >('/expenses/personal', { params });
  return response.data;
};
