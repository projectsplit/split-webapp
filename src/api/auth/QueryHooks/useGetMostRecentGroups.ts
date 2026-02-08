import { apiClient } from "@/api/apiClients";
import { MostRecentGroupDetailsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetMostRecentGroups = (groupId: string) => {
    return useQuery<MostRecentGroupDetailsResponse>({
        queryKey: ["mostRecentGroup", groupId],
        queryFn: () => getMostRecentGroup(groupId),
        enabled: groupId !== undefined && groupId !== null,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
    });
}

const getMostRecentGroup = async (
  groupId: string
): Promise<MostRecentGroupDetailsResponse> => {
  const response = await apiClient.get<MostRecentGroupDetailsResponse>(
    `/groups/${groupId}/details`
  );
  return response.data;
};

