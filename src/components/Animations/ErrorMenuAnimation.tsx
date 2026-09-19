import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import ErrorMenu from '../Menus/ErrorMenu/ErrorMenu';
import { ErrorMenuAnimationProps } from '../../interfaces';

export default function ErrorMenuAnimation({
  menu,
  type,
}: ErrorMenuAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={menu.value === 'error'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ErrorMenu menu={menu} type={type} />
    </CSSTransition>
  );
}
