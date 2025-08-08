import React from "react";
import { useRedirectToBudget } from "../hooks/useRedirectToBudget";
import useBudgetInfo from "../api/services/useBudgetInfo";



export default function RedirectToBudget() {
  const { data, isFetching } = useBudgetInfo();
  useRedirectToBudget(data, isFetching);
  return <></>;
}
