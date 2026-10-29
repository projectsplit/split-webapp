import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { Signal } from '@preact/signals-react';
import EditEmail from '../Menus/EditEmail/EditEmail';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

interface EditEmailAnimationProps {
  editEmailMenu: Signal<string | null>;
  existingEmail: string | null | undefined;
  emailVerified: boolean | undefined;
}

/**
 * Opened as 'editEmail' from the Email row, or as 'verifyEmail' from an unverified Verification
 * row, which lands on the code step straight away.
 */
export default function EditEmailAnimation({
  editEmailMenu,
  existingEmail,
  emailVerified,
}: EditEmailAnimationProps) {
  const nodeRef = useRef(null);
  const isOpen =
    editEmailMenu.value === 'editEmail' ||
    editEmailMenu.value === 'verifyEmail';
  useCloseOnBack(isOpen, () => (editEmailMenu.value = null));
  return (
    <CSSTransition
      in={isOpen}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <EditEmail
        existingEmail={existingEmail}
        emailVerified={emailVerified}
        editEmailMenu={editEmailMenu}
        startAtVerify={editEmailMenu.value === 'verifyEmail'}
      />
    </CSSTransition>
  );
}
