import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { Signal } from '@preact/signals-react';
import EditEmail from '../Menus/EditEmail/EditEmail';

interface EditEmailAnimationProps {
  editEmailMenu: Signal<string | null>;
  existingEmail: string | null | undefined;
  emailVerified: boolean | undefined;
}

export default function EditEmailAnimation({
  editEmailMenu,
  existingEmail,
  emailVerified,
}: EditEmailAnimationProps) {
  const nodeRef = useRef(null);
  return (
    <CSSTransition
      in={editEmailMenu.value === 'editEmail'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <EditEmail
        existingEmail={existingEmail}
        emailVerified={emailVerified}
        editEmailMenu={editEmailMenu}
      />
    </CSSTransition>
  );
}
