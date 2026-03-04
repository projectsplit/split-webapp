import { AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { useQuery } from "@tanstack/react-query";

export const useGetUserLabels = (userId: string | undefined) => {

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
    "/users/user-labels",
    { params }
  );
  return response.data;
};

export type GetLabelsResponse = {
  labels: {
    id: string;
    text: string;
    color: string;
    count: number;
  }[];
};
