import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import PlusInfoMenu from '../Plus/PlusInfoMenu';
import { PlusBackdrop } from '../Plus/PlusInfoMenu.styled';
import { closePlusInfo, plusMenu } from '../Plus/plusMenu';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

/**
 * Mounted once, in Protected. Brings its own backdrop rather than using MenuAnimationBackground,
 * because that one sits at z-index 3 and the Plus mark can be tapped from inside settings or the
 * search sheet, both of which are above that.
 */
export default function PlusInfoAnimation() {
  const nodeRef = useRef(null);
  const isOpen = plusMenu.value === 'plus';

  useCloseOnBack(isOpen, closePlusInfo);

  return (
    <>
      {isOpen && <PlusBackdrop onClick={closePlusInfo} />}
      <CSSTransition
        in={isOpen}
        timeout={100}
        classNames="infoBox"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <PlusInfoMenu nodeRef={nodeRef} />
      </CSSTransition>
    </>
  );
}
