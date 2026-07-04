import { apiClient } from '../../apiClients';
import { useInfiniteQuery } from '@tanstack/react-query';
export const useGetUserInvitations = (pageSize) => {
    return useInfiniteQuery({
        queryKey: ['userInvitations', pageSize],
        queryFn: ({ pageParam: next }) => getUserInvitations(pageSize, next),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
        refetchOnMount: true,
        gcTime: 0,
    });
};
const getUserInvitations = async (pageSize, next) => {
    const params = { pageSize, next };
    const response = await apiClient.get('/invitations', { params });
    return response.data;
};
