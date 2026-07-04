import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '@/api/apiClients';
export const useGetGroupsTotalAmounts = (pageSize, keyword, activeGroupCatAsState) => {
    return useInfiniteQuery({
        queryKey: [
            'shared',
            activeGroupCatAsState.value.toLowerCase(),
            keyword,
            pageSize,
        ],
        queryFn: ({ pageParam: next }) => getGroupsTotalAmounts(pageSize, keyword, next, activeGroupCatAsState.value === 'Archived'),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
        staleTime: Infinity,
    });
};
const getGroupsTotalAmounts = async (pageSize, keyword, next, isArchived) => {
    const params = { pageSize, next, isArchived, keyword };
    const response = await apiClient.get('/groups/details', { params });
    return response.data;
};
