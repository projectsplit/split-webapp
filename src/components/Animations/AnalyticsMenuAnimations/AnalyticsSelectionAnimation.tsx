import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import Selection from './components/Selection/Selection';
import { AnalyticsSelectionAnimationProps } from '../../../interfaces';
import { useCloseOnBack } from '../../../hooks/useCloseOnBack';

export default function AnalyticsSelectionAnimation({
  menu,
  menuKey,
  header,
  children,
}: AnalyticsSelectionAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === menuKey, () => (menu.value = null));
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
