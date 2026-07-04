import { apiClient } from '../../apiClients';
import { useInfiniteQuery } from '@tanstack/react-query';
export const useSearchGroupsByName = (keyword, pageSize) => {
    const queryKey = ['searchGroupsByName', keyword, pageSize];
    const query = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam: next }) => searchGroupsByName(keyword, pageSize, next),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
    });
    return { ...query };
};
const searchGroupsByName = async (keyword, pageSize, next) => {
    const params = { pageSize, next, keyword };
    const response = await apiClient.get('/groups/search', { params });
    return response.data;
};
