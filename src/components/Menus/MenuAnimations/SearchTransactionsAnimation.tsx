import { CSSTransition } from "react-transition-group";
import SearchTransactions from "../../SearchTransactions/SearchTransactions";
import { SearchTransactionAnimationProps } from "../../../interfaces";

export default function SearchTransactionsAnimation({
  menu,
  group,
  userInfo,
  timeZoneId
}: SearchTransactionAnimationProps) {
  return (
    <CSSTransition in={menu.value === "search"} timeout={0} unmountOnExit>
      <SearchTransactions menu={menu} group={group} userInfo={userInfo} timeZoneId={timeZoneId}/>
    </CSSTransition>
  );
}
