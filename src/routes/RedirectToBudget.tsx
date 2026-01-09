import { useRedirectToBudget } from "../hooks/useRedirectToBudget";
import useBudgetInfo from "../api/services/useBudgetInfo";
import { useOutletContext } from "react-router-dom";
import { UserInfo } from "../types";



export default function RedirectToBudget() {
  const { data, isFetching } = useBudgetInfo();
  const { userInfo } = useOutletContext<{ userInfo: UserInfo }>();
  useRedirectToBudget(data, isFetching, !!userInfo);
  return <></>;
}
