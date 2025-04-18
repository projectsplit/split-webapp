import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useQuery } from "@tanstack/react-query";

export const useGetGroupLabels = (groupId: string) => {

  return useQuery({
    queryKey: ["groupLabels", groupId],
    queryFn: () => getLabels(groupId),
    refetchOnMount: true,
    staleTime: 10000,
  });
};

const getLabels = async (groupId: string) => {
  const params = { groupId };
  const response = await apiClient.get<void, AxiosResponse<GetLabelsResponse>>(
    "/expenses/labels",
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
