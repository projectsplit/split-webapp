import { CSSTransition } from 'react-transition-group';
import { InfoBoxAnimationProps } from '../../interfaces';
import { useRef } from 'react';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function InfoBoxAnimation({ menu,children }: InfoBoxAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'infoBox', () => (menu.value = null));
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={menu.value === 'infoBox'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
    >
     {children}
    </CSSTransition>
  );
}
