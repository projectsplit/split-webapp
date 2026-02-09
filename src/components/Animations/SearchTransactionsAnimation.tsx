import { CSSTransition } from "react-transition-group";
import SearchTransactions from "../SearchTransactions/SearchTransactions";
import { SearchTransactionAnimationProps } from "../../interfaces";
import { useRef } from "react";

export default function SearchTransactionsAnimation({
  menu,
  group,
  userInfo,
  timeZoneId,
  expenseParsedFilters,
  transferParsedFilters,
  // nonGroupUsers
}: SearchTransactionAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === "search"}
      timeout={0}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <div ref={nodeRef}>
        <SearchTransactions
          menu={menu}
          group={group}
          userInfo={userInfo}
          timeZoneId={timeZoneId}
          expenseParsedFilters={expenseParsedFilters}
          transferParsedFilters={transferParsedFilters}
        // nonGroupUsers={nonGroupUsers}
        />
      </div>
    </CSSTransition>
  );
}
