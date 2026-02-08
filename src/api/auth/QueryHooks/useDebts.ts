import { useQuery } from "@tanstack/react-query";
import { DebtsResponse } from "../../../types";
import { apiClient } from "../../apiClients";
import { AxiosResponse } from "axios";


const useDebts = (groupId: string | undefined) => {
  return useQuery<DebtsResponse>({
    queryKey: ["debts", groupId],
    queryFn: () =>
      groupId
        ? getGroupDebts(groupId)
        : Promise.reject(new Error("No groupId")),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: true,
  });
};

const getGroupDebts = async (
  groupId: string
): Promise<DebtsResponse> => {
  const params = { groupId };
  const response = await apiClient.get<void, AxiosResponse<DebtsResponse>>("/debts", { params });

  return response.data;
};
export default useDebts;
