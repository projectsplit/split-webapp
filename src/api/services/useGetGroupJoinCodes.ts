import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Signal } from "@preact/signals-react";
import { GetJoinCodesResponse } from "../../types";

export const useGetGroupJoinCodes = (groupId: string, pageSize: number, categorySwitched:Signal<boolean>) => {
  const queryKey = ["getGroupJoinCodes", groupId, pageSize, categorySwitched.value];

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam: next }) =>
      getGroupJoinCodes(groupId, pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
    refetchOnMount: "always",
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


