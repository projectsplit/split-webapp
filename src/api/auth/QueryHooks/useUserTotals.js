import { apiClient } from '@/api/apiClients';
import { Mode } from '@/types';
import { useQuery } from '@tanstack/react-query';
import { appendNonGroupFilterToParams } from '../helpers/appendNonGroupFilterToParams';
import { hasActiveExpenseFilters } from '@/helpers/hasActiveExpenseFilters';
const useUserTotals = (mode, expenseParsedFilters) => {
    return useQuery({
        queryKey: ['userTotals', expenseParsedFilters?.value],
        queryFn: () => getUserTotals({
            ...expenseParsedFilters?.value,
        }),
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        staleTime: 9000,
        enabled: mode === Mode.Personal &&
            (expenseParsedFilters?.value
                ? hasActiveExpenseFilters(expenseParsedFilters.value)
                : false),
    });
};
const getUserTotals = async (parsedFilters = {}) => {
    const { labels = [], ...base } = parsedFilters;
    const params = appendNonGroupFilterToParams(base, {
        arrayMappings: [{ key: 'labelIds', values: labels }],
    });
    const response = await apiClient.get('/expenses/user-totals', { params });
    return response.data;
};
export default useUserTotals;
