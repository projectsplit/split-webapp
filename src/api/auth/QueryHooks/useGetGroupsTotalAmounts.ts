import { useInfiniteQuery } from "@tanstack/react-query";
import { Signal } from "@preact/signals-react";
import { GroupsTotalAmountsResponse } from "@/types";
import { apiClient } from "@/api/apiClients";

export const useGetGroupsTotalAmounts = (pageSize: number, keyword: string, activeGroupCatAsState: Signal<string>) => {
  return useInfiniteQuery({
    queryKey: ["shared", activeGroupCatAsState.value.toLowerCase(), keyword],
    queryFn: ({ pageParam: next }) =>
      getGroupsTotalAmounts(
        pageSize,
        keyword,
        next,
        activeGroupCatAsState.value === "Archived"
      ),
    getNextPageParam: (lastPage) => lastPage?.next || undefined,
    initialPageParam: "",
    staleTime: 0,
  });
}

const getGroupsTotalAmounts = async (
  pageSize: number,
  keyword: string,
  next: string,
  isArchived: boolean
): Promise<GroupsTotalAmountsResponse> => {
  const params = { pageSize, next, isArchived, keyword };
  const response = await apiClient.get<GroupsTotalAmountsResponse>(
    "/groups/details",
    { params }
  );
  return response.data;
};
