import { CSSTransition } from 'react-transition-group';
import NotificationsMenu from '../Menus/NotificationsMenu/NotificationsMenu';
import { useRef } from 'react';
import { NotificationsMenuAnimationProps } from '../../interfaces';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function NotificationsMenuAnimation({
  menu,
  userInfo,
}: NotificationsMenuAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'notifications', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'notifications'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <NotificationsMenu menu={menu} userInfo={userInfo} />
    </CSSTransition>
  );
}
