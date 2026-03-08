import { AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { useQuery } from "@tanstack/react-query";
import { GetLabelsResponse } from "../../../types";


export const useGetUserAndGroupsLabels = (userId: string | undefined, isPersonal: boolean | undefined, groupId: string | undefined) => {

  return useQuery({
    queryKey: ["userAndGroupsLabels", userId],
    queryFn: () => getLabels(userId),
    refetchOnMount: true,
    staleTime: 10000,
    enabled: !!userId && (isPersonal || !!groupId)
  });
};

const getLabels = async (userId: string | undefined) => {
  const params = { userId };
  if (!userId) {
    return { labels: [] };
  }
  const response = await apiClient.get<void, AxiosResponse<GetLabelsResponse>>(
    "/users/user-group-labels",
    { params }
  );
  return response.data;
};
