import { apiClient } from "@/api/apiClients";
import { DebtsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { useOutletContext } from "react-router-dom";

const useNonGroupDebts = () => {
  const context = useOutletContext<any>();
  const isNonGroup = context
    ? context.activeGroupCatAsState?.value === "NonGroup" ||
    context.transactionType === "NonGroup"
    : true;

  return useQuery<DebtsResponse>({
    queryKey: ["nonGroupDebts"],
    queryFn: () => getNonGroupDebts(),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: isNonGroup,
  });
};

const getNonGroupDebts = async (
): Promise<DebtsResponse> => {
  const response = await apiClient.get<void, AxiosResponse<DebtsResponse>>("/debts/non-group",);
  return response.data;
};
export default useNonGroupDebts;