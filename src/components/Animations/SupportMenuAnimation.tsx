import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { Signal } from '@preact/signals-react';
import SupportMenu from '../Menus/SupportMenu/SupportMenu';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

interface SupportMenuAnimationProps {
  supportMenu: Signal<string | null>;
}

export default function SupportMenuAnimation({
  supportMenu,
}: SupportMenuAnimationProps) {
  const nodeRef = useRef(null);
  // Without its own history entry, back popped the one Settings pushed instead, closing Settings and
  // taking this sheet down with it. Registering here is what lets back close just the sheet.
  useCloseOnBack(supportMenu.value === 'support', () => (supportMenu.value = null));
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
