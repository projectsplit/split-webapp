import { AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { useQuery } from "@tanstack/react-query";
import { GetLabelsResponse } from "../../../types";

export const useGetGroupLabels = (groupId: string | undefined) => {

  return useQuery({
    queryKey: ["groupLabels", groupId],
    queryFn: () => getLabels(groupId),
    refetchOnMount: true,
    staleTime: 10000,
    enabled: !!groupId
  });
};

const getLabels = async (groupId: string | undefined) => {
  const params = { groupId };
  if (!groupId) {
    return { labels: [] };
  }
  const response = await apiClient.get<void, AxiosResponse<GetLabelsResponse>>(
    "/expenses/labels",
    { params }
  );
  return response.data;
};
