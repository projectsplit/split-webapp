import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useInfiniteQuery } from "@tanstack/react-query";
import { GetGroupsResponse } from "../../types";

export const useSearchGroupsByName = (
  keyword: string,
  pageSize: number,

) => {
  const queryKey = ["searchGroupsByName", keyword, pageSize];
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam: next }) =>
      searchGroupsByName(keyword, pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
  });


  return { ...query };
};

const searchGroupsByName = async (
  keyword: string,
  pageSize: number,
  next?: string
): Promise<GetGroupsResponse> => {
  const params = { pageSize, next, keyword };
  const response = await apiClient.get<
    void,
    AxiosResponse<GetGroupsResponse>
  >("/groups/search", { params });
  return response.data;
};


