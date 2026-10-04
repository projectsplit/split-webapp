import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { Signal } from '@preact/signals-react';
import DeleteAccount from '../Menus/DeleteAccount/DeleteAccount';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

interface DeleteAccountAnimationProps {
  deleteAccountMenu: Signal<string | null>;
  username: string | undefined;
  hasActiveMonthly: boolean | undefined;
}

export default function DeleteAccountAnimation({
  deleteAccountMenu,
  username,
  hasActiveMonthly,
}: DeleteAccountAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(
    deleteAccountMenu.value === 'deleteAccount',
    () => (deleteAccountMenu.value = null)
  );
  return (
    <CSSTransition
      in={deleteAccountMenu.value === 'deleteAccount'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <DeleteAccount
        deleteAccountMenu={deleteAccountMenu}
        username={username}
        hasActiveMonthly={hasActiveMonthly}
        nodeRef={nodeRef}
      />
    </CSSTransition>
  );
}
