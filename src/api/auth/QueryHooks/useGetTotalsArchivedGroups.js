import { apiClient } from '@/api/apiClients';
import { useInfiniteQuery } from '@tanstack/react-query';
export const useGetTotalsArchiveGroups = (pageSize) => {
    return useInfiniteQuery({
        queryKey: ['shared', 'archived'],
        queryFn: ({ pageParam: next }) => getGroupsTotalAmounts(pageSize, next, true),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
    });
};
const getGroupsTotalAmounts = async (pageSize, next, isArchived) => {
    const params = { pageSize, next, isArchived };
    const response = await apiClient.get('/groups/details', { params });
    return response.data;
};
