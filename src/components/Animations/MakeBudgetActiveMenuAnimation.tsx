import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { MakeBudgetActiveMenuAnimationProps } from '../../interfaces';
import MakeBudgetActiveMenu from '../Menus/MakeBudgetActiveMenu/MakeBudgetActiveMenu';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function MakeBudgetActiveMenuAnimation({
  menu,
  hasActiveBudgetData,
  hasInactiveBudgetData,
  onConfirm,
}: MakeBudgetActiveMenuAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'makeBudgetActive', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'makeBudgetActive'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <MakeBudgetActiveMenu
        menu={menu}
        title="Budget Status"
        hasActiveBudgetData={hasActiveBudgetData}
        hasInactiveBudgetData={hasInactiveBudgetData}
        onConfirm={onConfirm}
      />
    </CSSTransition>
  );
}
