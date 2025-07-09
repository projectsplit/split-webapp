import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../apiClients";


export const useCumulativeSpendingArray = (startDate: string, endDate: string, currency: string) => {
  return useQuery<number[]>({
    queryKey: ["cumulativeSpending", startDate, endDate, currency],
    queryFn: () => getCumulativeSpendingArray(startDate, endDate, currency),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10000,
    enabled: true,
  });
};

const getCumulativeSpendingArray = async (
  startDate: string,
  endDate: string,
  currency: string
): Promise<number[]> => {
  const response = await  apiClient.get<number[]>(
    `/analytics/cumulativespending?startDate=${startDate}&endDate=${endDate}&currency=${currency}`
  );
  return response.data;
};
