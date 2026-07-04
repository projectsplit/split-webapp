import { useInfiniteQuery } from '@tanstack/react-query';
import { apiClient } from '../../apiClients';
const useGetGroups = (userId, pageSize) => {
    const queryKey = ['getGroups', pageSize];
    const query = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam: next }) => getGroups(userId, pageSize, next),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
        refetchOnMount: false,
    });
    return { ...query };
};
const getGroups = async (userId, pageSize, next) => {
    const params = { userId, pageSize, next };
    const response = await apiClient.get('/groups', { params });
    return response.data;
};
export default useGetGroups;
