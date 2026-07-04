import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClients';
export const useGetTotalsActiveGroups = (pageSize) => {
    return useInfiniteQuery({
        queryKey: ['shared', 'active'],
        queryFn: ({ pageParam: next }) => getGroupsTotalAmounts(pageSize, next, false),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
    });
};
const getGroupsTotalAmounts = async (pageSize, next, isArchived) => {
    const params = { pageSize, next, isArchived };
    const response = await apiClient.get('/groups/details', { params });
    return response.data;
};
