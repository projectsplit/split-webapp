import { CSSTransition } from 'react-transition-group';
import CreateGroup from '../../pages/Groups/CreateGroup/CreateGroup';
import { CreateGroupAnimationProps } from '../../interfaces';
import { useRef } from 'react';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function CreateGroupAnimation({
  menu,
  currencyMenu,
}: CreateGroupAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'createGroup', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'createGroup'}
      classNames="infoBox"
      timeout={100}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <CreateGroup menu={menu} currencyMenu={currencyMenu} nodeRef={nodeRef} />
    </CSSTransition>
  );
}
