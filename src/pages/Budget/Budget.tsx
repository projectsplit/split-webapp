import { Outlet } from "react-router-dom";
// import useBudgetInfo from "../../hooks/useBudgetInfo";
import { useRedirectToBudget } from "../../hooks/useRedirectToBudget";
import { BudgetInfoResponse } from "../../types";

export default function Budget() {

  const isLoading=false;
  const data:BudgetInfoResponse = {
    "budgetSubmitted": false,
    "totalAmountSpent": '123',
    "remainingDays": '5',
    "averageSpentPerDay": '10',
    "goal": '1300',
    "currency": 'USD',
    "budgetType": 1,
    "startDate": "0001-01-01T00:00:00",
    "endDate": "0001-01-01T00:00:00"
}
  // const { data,isLoading } = useBudgetInfo();

  useRedirectToBudget(data, isLoading);
  
  return (
    <>
      <Outlet />
    </>
  );
}
