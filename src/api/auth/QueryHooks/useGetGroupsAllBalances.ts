import { apiClient } from "@/api/apiClients";
import { GroupsAllBalancesResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetGroupsAllBalances = () => {
    return useQuery<GroupsAllBalancesResponse>({
        queryKey: ["home"],
        queryFn: getGroupsAllBalances,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
}

const getGroupsAllBalances = async ()
    : Promise<GroupsAllBalancesResponse> => {
    const response = await apiClient.get<GroupsAllBalancesResponse>(
        `/groups/all-balances`
    );
    return response.data;
};