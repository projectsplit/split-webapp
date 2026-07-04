import { apiClient } from '../../apiClients';
import { useInfiniteQuery } from '@tanstack/react-query';
export const useGetGroupJoinCodes = (groupId, pageSize) => {
    const queryKey = ['getGroupJoinCodes', groupId, pageSize];
    const query = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam: next }) => getGroupJoinCodes(groupId, pageSize, next),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
        refetchOnMount: 'always',
    });
    return { ...query };
};
const getGroupJoinCodes = async (groupId, pageSize, next) => {
    const params = { pageSize, next, groupId };
    const response = await apiClient.get(`/join/group/${groupId}`, { params });
    return response.data;
};
