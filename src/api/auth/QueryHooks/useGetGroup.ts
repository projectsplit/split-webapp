import { useInfiniteQuery } from "@tanstack/react-query";
import { GetGroupsResponse } from "../../../types";
import { apiClient } from "../../apiClients";
import { AxiosResponse } from "axios";

const useGetGroups = (userId: string, pageSize: number) => {
  const queryKey = ["getGroups", pageSize];

  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam: next }) => getGroups(userId, pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
    refetchOnMount: false,
  });

  return { ...query };
};

const getGroups = async (
  userId: string,
  pageSize: number,
  next?: string
): Promise<GetGroupsResponse> => {
  const params = { userId, pageSize, next };
  const response = await apiClient.get<void, AxiosResponse<GetGroupsResponse>>(
    "/groups",
    { params }
  );
  return response.data;
};

export default useGetGroups;
