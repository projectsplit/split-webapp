import { useInfiniteQuery } from "@tanstack/react-query";
import { GroupsTotalAmountsResponse } from "@/types";
import { apiClient } from "@/api/apiClients";

export const useGetTotalsActiveGroups = (pageSize: number) => {
   return useInfiniteQuery({
      queryKey: ["shared", "active"],
      queryFn: ({ pageParam: next }) => getGroupsTotalAmounts(pageSize, next, false),
      getNextPageParam: (lastPage) => lastPage?.next || undefined,
      initialPageParam: "",
    });
}
const getGroupsTotalAmounts = async (
  pageSize: number,
  next: string,
  isArchived: boolean
): Promise<GroupsTotalAmountsResponse> => {
  const params = { pageSize, next, isArchived };
  const response = await apiClient.get<GroupsTotalAmountsResponse>(
    "/groups/details",
    { params }
  );
  return response.data;
};
