import { useInfiniteQuery } from '@tanstack/react-query';
import { ExpenseParsedFilters, GetExpensesResponse } from '../../../types';
import { apiClient } from '../../apiClients';
import { AxiosResponse } from 'axios';
import { Signal } from '@preact/signals-react';
import { appendPersonalFilterToParams } from '../helpers/appendPersonalFilterToParams';

type PageParam = { next?: string; previous?: string };

export const useGetPersonalExpenses = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  pageSize: number,
  timeZoneId: string,
  enabled: boolean = true,
  jumpToken?: string
) => {
  const queryKey = [
    'personalExpenses',
    pageSize,
    expenseParsedFilters.value,
    timeZoneId,
    jumpToken,
  ].filter(Boolean);

  const query = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: ({ pageParam }) => {
      const { next, previous } = pageParam as PageParam;
      return getPersonalExpenses(
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
    // A jump token is just a starting cursor that asks the server to centre on that expense.
    initialPageParam: { next: jumpToken || '' } as PageParam,
    enabled,
  });

  return { ...query };
};

const getPersonalExpenses = async (
  pageSize: number,
  parsedFilters: ExpenseParsedFilters = {},
  next?: string,
  previous?: string
): Promise<GetExpensesResponse> => {
  const { labels = [], ...base } = parsedFilters;

  const params = appendPersonalFilterToParams(base, {
    pageSize,
    next,
    previous,
    arrayMappings: [{ key: 'labelIds', values: labels }],
  });

  const response = await apiClient.get<
    void,
    AxiosResponse<GetExpensesResponse>
  >('/expenses/personal', { params });
  return response.data;
};
