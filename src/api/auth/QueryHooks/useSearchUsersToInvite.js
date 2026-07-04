import { apiClient } from '../../apiClients';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
export const useSearchUsersToInvite = (groupId, keyword, pageSize, guestId) => {
    const queryKey = ['searchUsersToInvite', groupId, keyword, pageSize];
    const queryClient = useQueryClient();
    const query = useInfiniteQuery({
        queryKey,
        queryFn: ({ pageParam: next }) => searchUsersToinvite(groupId, keyword, pageSize, next),
        getNextPageParam: (lastPage) => lastPage?.next || undefined,
        initialPageParam: '',
        // enabled:!!keyword && keyword.length > 1
    });
    const updateUserInvitationStatus = (userId, isInvited) => {
        // Update cache for all query keys.
        const queryKeys = queryClient
            .getQueryCache()
            .getAll()
            .map((query) => query.queryKey)
            .filter((key) => key[0] === 'searchUsersToInvite' && key[1] === groupId);
        queryKeys.forEach((queryKey) => {
            queryClient.setQueryData(queryKey, (oldData) => {
                if (!oldData)
                    return oldData;
                const updateUsers = (users) => users.map((user) => guestId && guestId !== '' && isInvited
                    ? { ...user, isAlreadyInvited: user.userId === userId }
                    : user.userId === userId
                        ? { ...user, isAlreadyInvited: isInvited }
                        : user);
                return {
                    ...oldData,
                    pages: oldData.pages.map((page) => ({
                        ...page,
                        users: updateUsers(page.users),
                    })),
                };
            });
        });
    };
    return { ...query, updateUserInvitationStatus };
};
const searchUsersToinvite = async (groupId, keyword, pageSize, next) => {
    const params = { pageSize, next, keyword, groupId };
    const response = await apiClient.get('/invitations/search-users', { params });
    return response.data;
};
