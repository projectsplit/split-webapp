import { CSSTransition } from 'react-transition-group';
import { SettingsMenuAnimationProps } from '../../interfaces';
import { useRef } from 'react';
import SettingsMenu from '../Menus/SettingsMenu/SettingsMenu';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function SettingsMenuAnimation({
  menu,
  userInfo,
}: SettingsMenuAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'settings', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'settings'}
      classNames="leftslide"
      timeout={100}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <SettingsMenu menu={menu} userInfo={userInfo} nodeRef={nodeRef} />
    </CSSTransition>
  );
}
