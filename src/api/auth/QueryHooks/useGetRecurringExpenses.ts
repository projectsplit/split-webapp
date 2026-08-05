import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { GetRecurringExpensesResponse } from '@/types';
import { apiClient } from '@/api/apiClients';

export const useGetRecurringExpenses = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ['recurringExpenses'],
    queryFn: getRecurringExpenses,
    enabled,
  });
};

const getRecurringExpenses = async () => {
  const response = await apiClient.get<
    void,
    AxiosResponse<GetRecurringExpensesResponse>
  >('/recurring-expenses');

  return response.data;
};
