import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Selection from './components/Selection/Selection';
import { AnalyticsSelectionAnimationProps } from '../../../interfaces';

export default function AnalyticsSelectionAnimation({
  menu,
  menuKey,
  header,
  children,
}: AnalyticsSelectionAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={menu.value === menuKey}
      timeout={100}
      classNames="bottomslide"
      unmountOnExit
    >
      <Selection header={header}>{children}</Selection>
    </CSSTransition>
  );
}
