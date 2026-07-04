import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { appendNonGroupFilterToParams } from '../helpers/appendNonGroupFilterToParams';
export const useGetNonGroupExpenses = (expenseParsedFilters, pageSize, timeZoneId, enabled = true, jumpToken) => {
    const queryKey = [
        'nonGroupExpenses',
        pageSize,
        expenseParsedFilters.value,
        timeZoneId,
        jumpToken,
    ].filter(Boolean);
    const query = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam }) => {
            const { next, previous } = pageParam;
            return getNonGroupExpenses(pageSize, expenseParsedFilters.value, next, previous);
        },
        getNextPageParam: (lastPage) => lastPage?.next ? { next: lastPage.next } : undefined,
        getPreviousPageParam: (firstPage) => firstPage?.previous ? { previous: firstPage.previous } : undefined,
        initialPageParam: { next: jumpToken || '' },
        enabled,
    });
    return { ...query };
};
const getNonGroupExpenses = async (pageSize, parsedFilters = {}, next, previous) => {
    const { participantsIds = [], payersIds = [], labels = [], ...base } = parsedFilters;
    const params = appendNonGroupFilterToParams(base, {
        pageSize,
        next,
        previous,
        arrayMappings: [
            { key: 'participantIds', values: participantsIds },
            { key: 'payerIds', values: payersIds },
            { key: 'labelIds', values: labels },
        ],
    });
    const response = await apiClient.get('/expenses/non-group', { params });
    return response.data;
};
