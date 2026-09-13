import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { ConfirmArchiveGroupAnimationProps } from '../../interfaces';
import ConfirmUnArchiveGroup from '../Menus/Confirmations/ConfirmUnArchiveGroup';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function ConfirmUnArchiveGroupAnimation({
  menu,
  groupId,
  openGroupOptionsMenu,
  navigateToGroups,
}: ConfirmArchiveGroupAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'unarchiveGroup', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'unarchiveGroup'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ConfirmUnArchiveGroup
        menu={menu}
        groupId={groupId}
        openGroupOptionsMenu={openGroupOptionsMenu}
        navigateToGroups={navigateToGroups}
      />
    </CSSTransition>
  );
}
