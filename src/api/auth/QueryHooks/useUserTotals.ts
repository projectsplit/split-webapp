import { apiClient } from '@/api/apiClients';
import { DebtsResponse, Mode } from '@/types';
import { Signal } from '@preact/signals-react';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ExpenseParsedFilters } from '../../../types';
import { appendFilterToParams } from '../helpers/appendFilterToParams';
import { hasActiveExpenseFilters } from '@/helpers/hasActiveExpenseFilters';

const useUserTotals = (
  mode: Mode,
  expenseParsedFilters?: Signal<ExpenseParsedFilters>
) => {
  return useQuery<DebtsResponse>({
    queryKey: ['userTotals', expenseParsedFilters?.value],
    queryFn: () =>
      getUserTotals({
        ...expenseParsedFilters?.value,
      }),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 9000,
    placeholderData: keepPreviousData,
    enabled:
      mode === Mode.Personal &&
      (expenseParsedFilters?.value
        ? hasActiveExpenseFilters(expenseParsedFilters.value)
        : false),
  });
};

const getUserTotals = async (
  parsedFilters: ExpenseParsedFilters = {}
): Promise<DebtsResponse> => {
  const { labels = [], ...base } = parsedFilters;

  const params = appendFilterToParams(base, {
    arrayMappings: [{ key: 'labelIds', values: labels }],
  });

  const response = await apiClient.get<void, AxiosResponse<DebtsResponse>>(
    '/expenses/user-totals',
    { params }
  );
  return response.data;
};

export default useUserTotals;
