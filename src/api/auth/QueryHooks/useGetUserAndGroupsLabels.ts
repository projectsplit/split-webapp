import { AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { useQuery } from "@tanstack/react-query";
import { GetLabelsResponse } from "../../../types";

export const useGetUserAndGroupsLabels = (userId: string | undefined) => {

  return useQuery({
    queryKey: ["userLabels", userId],
    queryFn: () => getLabels(userId),
    refetchOnMount: true,
    staleTime: 10000,
    enabled: !!userId
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
