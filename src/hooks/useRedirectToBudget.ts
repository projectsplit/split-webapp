import { useNavigate, useLocation } from "react-router-dom";
import { BudgetInfoResponse } from "../types";
import { useEffect } from "react";

export const useRedirectToBudget = (
  data: BudgetInfoResponse | undefined,
  isLoading: boolean
) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (
      (isLoading && location.pathname === "/budget/create") ||
      (!isLoading && location.pathname === "/budget/create")
    ) {
      navigate(location.pathname);
    
    } else if (isLoading) {
      navigate(location.pathname);
     
    } else if (data && data.budgetSubmitted) {
      navigate(`/budget/current`);
      
    } else {
      navigate(`/budget/create`);
     
    }
  }, [isLoading]);

  return null;
};
