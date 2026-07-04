import { apiClient } from '../../apiClients';
import { useInfiniteQuery } from '@tanstack/react-query';
export const useSearchUsers = (keyword, pageSize) => {
    const queryKey = ['searchUsers', keyword, pageSize];
    const query = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam: next }) => searchUsers(keyword, pageSize, next),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
        placeholderData: (previousData) => previousData,
    });
    return { ...query };
};
const searchUsers = async (keyword, pageSize, next) => {
    const params = { pageSize, next, keyword };
    const response = await apiClient.get('/users/search-all-users', { params });
    return response.data;
};
