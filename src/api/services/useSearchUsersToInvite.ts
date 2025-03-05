import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

export const useSearchUsersToInvite = (groupId: string, keyword: string, pageSize: number) => {
  
  const key = "searchUsersToInvite";
  const queryClient = useQueryClient();

  const query = useInfiniteQuery({
    queryKey: [key, groupId, keyword, pageSize],
    queryFn: ({ pageParam: next }) => searchUsersToinvite(groupId, keyword, pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
  });

  const updateUserInvitationStatus = (userId: string, isInvited: boolean) => {
    queryClient.setQueryData([key, groupId, keyword, pageSize], (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          users: page.users.map((user: any) =>
            user.userId === userId ? { ...user, isAlreadyInvited: isInvited } : user
          )
        }))
      };
    });
  };
  
  return { ...query, updateUserInvitationStatus };
};

const searchUsersToinvite = async (groupId: string, keyword: string, pageSize: number, next?: string): Promise<SearchUserToInviteResponse> => {
  const params = { pageSize, next, keyword, groupId };
  const response = await apiClient.get<void, AxiosResponse<SearchUserToInviteResponse>>(
    "/invitations/search-users",
    { params });
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