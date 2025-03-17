import { useQuery } from "@tanstack/react-query";
import { BudgetInfoResponse } from "../../types";
import { getBudgetInfo } from "./api";

const useBudgetInfo = () => {
  return useQuery<BudgetInfoResponse>({
    queryKey: ["budget"],
    queryFn:  getBudgetInfo,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 9000,
    enabled: true,
  });
};

export default useBudgetInfo;
