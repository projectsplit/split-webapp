import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { Signal } from '@preact/signals-react';
import SupportMenu from '../Menus/SupportMenu/SupportMenu';

interface SupportMenuAnimationProps {
  supportMenu: Signal<string | null>;
}

export default function SupportMenuAnimation({
  supportMenu,
}: SupportMenuAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={supportMenu.value === 'support'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <SupportMenu supportMenu={supportMenu} nodeRef={nodeRef} />
    </CSSTransition>
  );
}
