import { CSSTransition } from 'react-transition-group';
import SearchTransactions from '../SearchTransactions/SearchTransactions';
import { SearchTransactionAnimationProps } from '../../interfaces';
import { useRef } from 'react';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function SearchTransactionsAnimation({
  menu,
  group,
  userInfo,
  timeZoneId,
  expenseParsedFilters,
  transferParsedFilters,
  isPersonal,
}: SearchTransactionAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'search', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'search'}
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
          isPersonal={isPersonal}
        />
      </div>
    </CSSTransition>
  );
}
