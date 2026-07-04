import { apiClient } from '../../apiClients';
import { useInfiniteQuery } from '@tanstack/react-query';
export const useGetConnectionRequests = (pageSize) => {
    return useInfiniteQuery({
        queryKey: ['connectionRequests', pageSize],
        queryFn: ({ pageParam: next }) => getConnectionRequests(pageSize, next),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
        refetchOnMount: true,
        gcTime: 0,
    });
};
const getConnectionRequests = async (pageSize, next) => {
    const params = { pageSize, next };
    const response = await apiClient.get('/connections/requests', { params });
    return response.data;
};
