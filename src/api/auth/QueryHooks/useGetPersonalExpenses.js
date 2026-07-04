import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
import { appendPersonalFilterToParams } from '../helpers/appendPersonalFilterToParams';
export const useGetPersonalExpenses = (expenseParsedFilters, pageSize, timeZoneId, enabled = true) => {
    const queryKey = [
        'personalExpenses',
        pageSize,
        expenseParsedFilters.value,
        timeZoneId,
    ].filter(Boolean);
    const query = useInfiniteQuery({
        queryKey: queryKey,
        queryFn: ({ pageParam: next }) => getPersonalExpenses(pageSize, expenseParsedFilters.value, next),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        getPreviousPageParam: (firstPage) => firstPage?.previous || undefined,
        initialPageParam: '',
        enabled,
    });
    return { ...query };
};
const getPersonalExpenses = async (pageSize, parsedFilters = {}, next) => {
    const { labels = [], ...base } = parsedFilters;
    const params = appendPersonalFilterToParams(base, {
        pageSize,
        next,
        arrayMappings: [{ key: 'labelIds', values: labels }],
    });
    const response = await apiClient.get('/expenses/personal', { params });
    return response.data;
};
