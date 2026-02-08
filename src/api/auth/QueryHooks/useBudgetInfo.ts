import { useQuery } from "@tanstack/react-query";
import { BudgetInfoResponse } from "../../../types";
import { apiClient } from "../../apiClients";

const useBudgetInfo = () => {
  return useQuery<BudgetInfoResponse>({
    queryKey: ["budget"],
    queryFn: getBudgetInfo,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: true,
  });
};


const getBudgetInfo = async (): Promise<BudgetInfoResponse> => {
  const response = await apiClient.get<BudgetInfoResponse>(
    `/budget/budgetinfo`
  );
  return response.data;
};


export default useBudgetInfo;
