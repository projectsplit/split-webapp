import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetGroupJoinCodes = (groupId: string, pageSize: number) => {
  const queryKey = ["getGroupJoinCodes", groupId, pageSize];

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam: next }) =>
      getGroupJoinCodes(groupId, pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
  });

  return { ...query };
};

const getGroupJoinCodes = async (
  groupId: string,
  pageSize: number,
  next?: string
): Promise<GetJoinCodesResponse> => {
  const params = { pageSize, next, groupId };
  const response = await apiClient.get<
    void,
    AxiosResponse<GetJoinCodesResponse>
  >(`/join/group/${groupId}`, { params });
  return response.data;
};

type GetJoinCodesResponse = {
  codes: JoinCode[];
  next: string | null;
};

type JoinCode = {
  created: string;
  creatorId: string;
  expires: string;
  groupId: string;
  id: string;
  maxUses: number;
  timesUsed: number;
  updated: string;
};
