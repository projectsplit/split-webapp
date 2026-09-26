import { CSSTransition } from 'react-transition-group';
import { GroupTotalsByCurrencyAnimationProps } from '../../interfaces';
import { useRef } from 'react';
import { GroupTotalsByCurrency } from '../../pages/TransactionsWrappers/GroupTotalsByCurrency/GroupTotalsByCurrency';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function GroupTotalsByCurrencyAnimation({
  menu,
  bar1Legend,
  bar2Legend,
  groupTotalsByCurrency,
  userTotalsByCurrency,
  mode,
  relation,
}: GroupTotalsByCurrencyAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'epensesByCurrency', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'epensesByCurrency'}
      classNames="infoBox"
      timeout={100}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <GroupTotalsByCurrency
        menu={menu}
        bar1Legend={bar1Legend}
        bar2Legend={bar2Legend}
        groupTotalsByCurrency={groupTotalsByCurrency}
        userTotalsByCurrency={userTotalsByCurrency}
        mode={mode}
        relation={relation}
      />
    </CSSTransition>
  );
}
