import { useQuery } from "@tanstack/react-query";
import { GetTotalLentTotalBorrowedResponse } from "../../types";
import { apiClient } from "../apiClients";


export const useTotalLentBorrowedArrays = (startDate: string, endDate: string, currency:string) => {
  return useQuery<GetTotalLentTotalBorrowedResponse>({
    queryKey: ["totalLentBorrowed", startDate, endDate, currency],
    queryFn: () => getTotalLentBorrowedArrays(startDate, endDate, currency),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 10000,
    enabled: true,
  });
};

const getTotalLentBorrowedArrays = async (
  startDate: string,
  endDate: string,
  currency: string
): Promise<GetTotalLentTotalBorrowedResponse> => {
  const response = await apiClient.get<GetTotalLentTotalBorrowedResponse>(
    `/analytics/totallentborrowed?startDate=${startDate}&endDate=${endDate}&currency=${currency}`
  );
  return response.data;
};