import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { appendGroupFilterToParams } from '../helpers/appendGroupFilterToParams';
const useGetGroupExpenses = (group, expenseParsedFilters, pageSize, timeZoneId, enabled = true, jumpToken) => {
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
            const { next, previous } = pageParam;
            return getGroupExpenses(group?.id, pageSize, expenseParsedFilters.value, next, previous);
        },
        getNextPageParam: (lastPage) => lastPage?.next ? { next: lastPage.next } : undefined,
        getPreviousPageParam: (firstPage) => firstPage?.previous ? { previous: firstPage.previous } : undefined,
        initialPageParam: { next: jumpToken || '' },
        enabled: enabled && !!group?.id,
    });
    return { ...query };
};
const getGroupExpenses = async (groupId, pageSize, parsedFilters = {}, next, previous) => {
    const { participantsIds = [], payersIds = [], labels = [], ...base } = parsedFilters;
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
    const response = await apiClient.get('/expenses', { params });
    return response.data;
};
export default useGetGroupExpenses;
