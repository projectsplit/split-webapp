import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { EditUsernameAnimationProps } from '../../interfaces';
import EditUsername from '../Menus/EditUsername/EditUsername';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function EditUsernameAnimation({
  editUsernameMenu,
  existingUsername,
}: EditUsernameAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(editUsernameMenu.value === 'editUsername', () => (editUsernameMenu.value = null));
  return (
    <CSSTransition
      in={editUsernameMenu.value === 'editUsername'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <EditUsername
        existingUsername={existingUsername}
        editUsernameMenu={editUsernameMenu}
      />
    </CSSTransition>
  );
}
