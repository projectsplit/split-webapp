import { apiClient } from "@/api/apiClients";
import { GroupsTotalAmountsResponse } from "@/types";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useGetTotalsArchiveGroups = (pageSize: number) => {
    return useInfiniteQuery({
        queryKey: ["shared", "archived"],
        queryFn: ({ pageParam: next }) =>
            getGroupsTotalAmounts(pageSize, next, true),
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
