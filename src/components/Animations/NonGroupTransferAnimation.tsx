import { CSSTransition } from 'react-transition-group';

import { useRef } from 'react';
import { NonGroupTransferAnimationProps } from '../../interfaces';
import NonGroupTransferMenu from '../Menus/NonGroupUsersMenus/NonGroupTransferMenu/NonGroupTransferMenu';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function NonGroupTransferAnimation({
  nonGroupTransferMenu,
  fromHomeGroup,
  groupMembers,
}: NonGroupTransferAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(
    nonGroupTransferMenu.value.menu === 'nonGroupTransfer',
    () => {
      nonGroupTransferMenu.value = {
        ...nonGroupTransferMenu.value,
        menu: null,
      };
    }
  );
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={nonGroupTransferMenu.value.menu === 'nonGroupTransfer'}
      timeout={100}
      unmountOnExit
    >
      <NonGroupTransferMenu
        nonGroupTransferMenu={nonGroupTransferMenu}
        fromHomeGroup={fromHomeGroup}
        groupMembers={groupMembers}
      />
    </CSSTransition>
  );
}
