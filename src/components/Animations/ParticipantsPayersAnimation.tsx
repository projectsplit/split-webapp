import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { ParticipantsPayersAnimationProps } from '../../interfaces';
import ParticipantsPayersErrorMenu from '../Menus/ParticipantsPayersErrorMenu/ParticipantsPayersErrorMenu';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function ParticipantsPayersAnimation({
  menu,
  error,
}: ParticipantsPayersAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'amountsError', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'amountsError'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <ParticipantsPayersErrorMenu menu={menu} error={error} />
    </CSSTransition>
  );
}
