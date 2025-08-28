import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

export const useSearchUsersToInvite = (
  groupId: string,
  keyword: string,
  pageSize: number,
  guestId?: string
) => {
  const queryKey = ["searchUsersToInvite", groupId, keyword, pageSize];
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam: next }) =>
      searchUsersToinvite(groupId, keyword, pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
  });

  const updateUserInvitationStatus = (userId: string, isInvited: boolean) => {
    // Update cache for all query keys. 
    const queryKeys = queryClient
      .getQueryCache()
      .getAll()
      .map((query) => query.queryKey)
      .filter((key) => key[0] === "searchUsersToInvite" && key[1] === groupId);

    queryKeys.forEach((queryKey) => {
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData) return oldData;

        const updateUsers = (users: any[]) =>
          users.map((user) =>
            guestId && guestId !== "" && isInvited
              ? { ...user, isAlreadyInvited: user.userId === userId }
              : user.userId === userId
              ? { ...user, isAlreadyInvited: isInvited }
              : user
          );

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            users: updateUsers(page.users),
          })),
        };
      });
    });
  };

  return { ...query, updateUserInvitationStatus };
};

const searchUsersToinvite = async (
  groupId: string,
  keyword: string,
  pageSize: number,
  next?: string
): Promise<SearchUserToInviteResponse> => {
  const params = { pageSize, next, keyword, groupId };
  const response = await apiClient.get<
    void,
    AxiosResponse<SearchUserToInviteResponse>
  >("/invitations/search-users", { params });
  return response.data;
};

type SearchUserToInviteResponse = {
  users: SearchUserToInviteResponseItem[];
  next: string | null;
};

type SearchUserToInviteResponseItem = {
  userId: string;
  username: string;
  isGroupMember: boolean;
  isAlreadyInvited: boolean;
};
