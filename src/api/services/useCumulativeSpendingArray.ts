import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClients";
import { Frequency, SpendingChartsResponse } from "../../types";

export const useCumulativeSpendingArray = (
  startDate: string,
  endDate: string,
  currency: string,
  granularity: number
) => {
  return useQuery<SpendingChartsResponse>({
    queryKey: ["cumulativeArray", startDate, endDate, currency, granularity],
    queryFn: () =>
      getCumulativeSpendingArray(startDate, endDate, granularity, currency),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10000,
    enabled: true,
  });
};

const getCumulativeSpendingArray = async (
  startDate: string,
  endDate: string,
  granularity: number,
  currency: string
): Promise<SpendingChartsResponse> => {
  const frequencyMap: { [key: number]: string } = {
    [Frequency.Weekly]: "daily",
    [Frequency.Monthly]: "daily",
    [Frequency.Annually]: "monthly",
  };
  const granularityString = frequencyMap[granularity] || "daily";
  const response = await apiClient.get<SpendingChartsResponse>(
    `/analytics/spendings-chart?granularity=${granularityString}&startDate=${startDate}&endDate=${endDate}&currency=${currency}`
  );
  return response.data;
};
