import { CSSTransition } from 'react-transition-group';
import { NonGroupExpenseUsersAnimationProps } from '../../interfaces';
import { useRef } from 'react';
import { NonGroupExpenseUsersMenu } from '../Menus/NonGroupUsersMenus/NonGroupExpenseUsersMenu/NonGroupExpenseUsersMenu';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function NonGroupExpenseUsersAnimation({
  menu,
  nonGroupUsers,
  isPersonal,
  groupMembers,
  fromHomeGroup,
  isNonGroupExpense,
  fromNonGroup,
}: NonGroupExpenseUsersAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'nonGroupExpenseUsers', () => (menu.value = null));
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={menu.value === 'nonGroupExpenseUsers'}
      timeout={100}
      unmountOnExit
    >
      <NonGroupExpenseUsersMenu
        menu={menu}
        nonGroupUsers={nonGroupUsers}
        isPersonal={isPersonal}
        groupMembers={groupMembers}
        fromHomeGroup={fromHomeGroup}
        isNonGroupExpense={isNonGroupExpense}
        fromNonGroup={fromNonGroup}
      />
    </CSSTransition>
  );
}
