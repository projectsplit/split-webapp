import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { apiClient } from '../../apiClients';
import { ExpensesExportRequest, ExpensesExportResponse } from '../../../types';

/**
 * Everything in the chosen window and scope, unpaginated, so the export page can both preview the
 * totals and write the file from the same answer. Null disables the query: there is nothing to
 * ask for until a scope is chosen.
 */
export const useGetExpensesForExport = (
  request: ExpensesExportRequest | null
) => {
  return useQuery({
    queryKey: ['expensesExport', request],
    queryFn: () => getExpensesForExport(request!),
    enabled: request !== null,
    // Each change of period or scope would otherwise blank the preview before refilling it.
    placeholderData: keepPreviousData,
    staleTime: 60_000,
  });
};

const getExpensesForExport = async (
  request: ExpensesExportRequest
): Promise<ExpensesExportResponse> => {
  const params = new URLSearchParams();
  params.append('startDate', request.startDate);
  params.append('endDate', request.endDate);
  params.append('scope', String(request.scope));
  request.targetGroupIds.forEach((id) => params.append('targetGroupIds', id));

  const response = await apiClient.get<
    void,
    AxiosResponse<ExpensesExportResponse>
  >('/expenses/export', { params });

  return response.data;
};
