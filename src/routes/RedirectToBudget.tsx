import { useRedirectToBudget } from "../hooks/useRedirectToBudget";
import useBudgetInfo from "../api/auth/QueryHooks/useBudgetInfo";
import { useOutletContext } from "react-router-dom";
import { UserInfo } from "../types";



export default function RedirectToBudget() {
  const { data, isFetching } = useBudgetInfo();
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();
  useRedirectToBudget(data, isFetching, !!userInfo);
  return <></>;
}
