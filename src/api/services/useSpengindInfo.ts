import { useQuery } from "@tanstack/react-query";
import { Frequency, SpendingInfoResponse } from "../../types";
import { apiClient } from "../apiClients";


export const useSpendingInfo = (budgetType: Frequency, currency: string) => {
  return useQuery<SpendingInfoResponse>({
    queryKey: ["spending", budgetType, currency],
    queryFn: () => getSpendingInfo(budgetType, currency),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 9000,
    enabled: true,
  });
};


const getSpendingInfo = async (
  budgetType: Frequency,
  currency: string
): Promise<SpendingInfoResponse> => {
  const response = await apiClient.get<SpendingInfoResponse>(
    `/budget/spendinginfo?budgettype=${budgetType}&currency=${currency}`
  );
  return response.data;
};