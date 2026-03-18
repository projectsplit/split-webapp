import { CSSTransition } from 'react-transition-group';
import { InfoBoxAnimationProps } from '../../interfaces';
import SpendingCycleInfo from '../../pages/Budget/SpendingCycleInfo/SpendingCycleInfo';
import { useRef } from 'react';

export default function InfoBoxAnimation({ menu,children }: InfoBoxAnimationProps) {
  const nodeRef = useRef(null);
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
