import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useInfiniteQuery } from "@tanstack/react-query";
import { SearchUserResponse } from "../../types";

export const useSearchUsers = (
  keyword: string,
  pageSize: number,
) => {

  const queryKey = ["searchUsers", keyword, pageSize];
  const query = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam: next }) =>
      searchUsers(keyword, pageSize, next),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
    placeholderData: (previousData) => previousData,
  });

  return { ...query };
};

const searchUsers = async (
  keyword: string,
  pageSize: number,
  next?: string
): Promise<SearchUserResponse> => {
  const params = { pageSize, next, keyword };
  const response = await apiClient.get<
    void,
    AxiosResponse<SearchUserResponse>
  >("/users/search-all-users", { params });
  return response.data;
};
