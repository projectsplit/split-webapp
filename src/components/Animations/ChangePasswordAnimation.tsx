import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { Signal } from '@preact/signals-react';
import ChangePassword from '../Menus/ChangePassword/ChangePassword';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

interface ChangePasswordAnimationProps {
  changePasswordMenu: Signal<string | null>;
}

export default function ChangePasswordAnimation({
  changePasswordMenu,
}: ChangePasswordAnimationProps) {
  const nodeRef = useRef(null);
  const isOpen = changePasswordMenu.value === 'changePassword';
  useCloseOnBack(isOpen, () => (changePasswordMenu.value = null));
  return (
    <CSSTransition
      in={isOpen}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ChangePassword
        changePasswordMenu={changePasswordMenu}
        nodeRef={nodeRef}
      />
    </CSSTransition>
  );
}
