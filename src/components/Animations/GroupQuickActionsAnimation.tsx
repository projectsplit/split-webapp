import { CSSTransition } from 'react-transition-group';
import { GroupQuickActionsAnimationProps } from '../../interfaces';
import { useRef } from 'react';
import ActionsMenu from '../Menus/ActionsMenu/ActionsMenu';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function GroupQuickActionsAnimation({
  menu,
}: GroupQuickActionsAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'quickActions', () => (menu.value = null));
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={menu.value === 'quickActions'}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <ActionsMenu
        onClickTransfer={() => (menu.value = 'newTransfer')}
        onClickExpense={() => (menu.value = 'newExpense')}
        bottom={30}
      />
    </CSSTransition>
  );
}
