import { apiClient } from "../apiClients";
import { useQuery } from "@tanstack/react-query";
import { FilterResponse } from "../../types";

export const useGetGroupFilters = (groupId:string | undefined) => {
  return useQuery<FilterResponse>({
    queryKey: ['filters'],
    queryFn: () => groupId ? getGroupFilters(groupId) : Promise.reject(new Error('No groupId')),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10000,
    enabled: !!groupId,
  });
};

const getGroupFilters = async (groupId: string): Promise<FilterResponse> => {
  const response = await apiClient.get<FilterResponse>(
    `/filters/getfilters?groupId=${groupId}`
  );
  return response.data;
};