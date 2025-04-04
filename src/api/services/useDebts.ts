import { useQuery } from "@tanstack/react-query";
import { getGroupDebts } from "./api";
import { DebtsResponse } from "../../types";


const usePendingTransactions = (groupId: string | undefined) => {
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

export default usePendingTransactions;
