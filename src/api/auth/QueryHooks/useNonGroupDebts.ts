import { apiClient } from "@/api/apiClients";
import { DebtsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

const useNonGroupDebts = () => {
  return useQuery<DebtsResponse>({
    queryKey: ["nonGroupDebts"],
    queryFn: () => getNonGroupDebts(),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: true,
  });
};

const getNonGroupDebts = async (
): Promise<DebtsResponse> => {
  const response = await apiClient.get<void, AxiosResponse<DebtsResponse>>("/debts/non-group",);
  return response.data;
};
export default useNonGroupDebts;