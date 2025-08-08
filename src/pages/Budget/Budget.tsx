import { Outlet, useOutletContext } from "react-router-dom";
// import useBudgetInfo from "../../hooks/useBudgetInfo";
import { useRedirectToBudget } from "../../hooks/useRedirectToBudget";
import { BudgetInfoResponse, UserInfo } from "../../types";
import { useMemo } from "react";

export default function Budget() {
  const isLoading = false;
const data = useMemo(
    () => ({
      budgetSubmitted: false,
      totalAmountSpent: "123",
      remainingDays: "5",
      averageSpentPerDay: "10",
      goal: "1300",
      currency: "USD",
      budgetType: 1,
      startDate: "0001-01-01T00:00:00",
      endDate: "0001-01-01T00:00:00",
    }),
    []
  );
  // const { data,isLoading } = useBudgetInfo();

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo | undefined;
  }>();

  useRedirectToBudget(data, isLoading,!!userInfo);

  return (
    <>
      <Outlet context={{ userInfo }} />
    </>
  );
}
