import { CSSTransition } from 'react-transition-group';
import SearchTransactions from '../SearchTransactions/SearchTransactions';
import { SearchTransactionAnimationProps } from '../../interfaces';
import { useEffect, useRef } from 'react';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';
import { usePlus } from '../../hooks/usePlus';
import { openPlusInfo } from '../Plus/plusMenu';

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
  const { isLocked } = usePlus();

  const isAskedFor = menu.value === 'search';

  // Search is a Plus feature. For an account whose free days are over, asking for it opens the
  // Plus sheet in its place: every button that leads here does so by setting the same menu value,
  // so this is the one spot that catches them all.
  useEffect(() => {
    if (!isAskedFor || !isLocked) return;

    menu.value = null;
    openPlusInfo();
  }, [isAskedFor, isLocked, menu]);

  const isOpen = isAskedFor && !isLocked;

  useCloseOnBack(isOpen, () => (menu.value = null));
  return (
    <CSSTransition
      in={isOpen}
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
