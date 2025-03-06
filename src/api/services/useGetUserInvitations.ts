import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetUserInvitations = (pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ["userInvitations", pageSize],
    queryFn: ({ pageParam: next }) => getUserInvitations(pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
  });
};

const getUserInvitations = async (pageSize: number, next?: string): Promise<GetUserInvitationsResponse> => {
  const params = { pageSize, next };
  const response = await apiClient.get<void, AxiosResponse<GetUserInvitationsResponse>>(
    "/invitations",
    { params });
  return response.data;
};

type GetUserInvitationsResponse = {
  invitations: GetUserInvitationsResponseItem[];
  next: string | null;
};

type GetUserInvitationsResponseItem = {
  id: string;
  created: string;
  senderId: string;
  receiverId: string;
  groupId: string;
  groupName: string;
  guestId: string | null;
};