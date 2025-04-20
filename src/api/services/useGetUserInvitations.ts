import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetUserInvitationsResponse } from "../../types";

export const useGetUserInvitations = (pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ["userInvitations", pageSize],
    queryFn: ({ pageParam: next }) => getUserInvitations(pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
    refetchOnMount: true,
    gcTime: 0
  });
};

const getUserInvitations = async (pageSize: number, next?: string): Promise<GetUserInvitationsResponse> => {
  const params = { pageSize, next };
  const response = await apiClient.get<void, AxiosResponse<GetUserInvitationsResponse>>(
    "/invitations",
    { params });
  return response.data;
};

