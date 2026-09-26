import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import { DeleteTransferAnimationProps } from '../../interfaces';
import DeleteTransferConfirmation from '../Menus/Confirmations/DeleteTransferConfirmation';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function DeleteTransferAnimation({
  menu,
  selectedTransfer,
  errorMessage,
}: DeleteTransferAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'deleteTransfer', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'deleteTransfer'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <DeleteTransferConfirmation
        menu={menu}
        selectedTransfer={selectedTransfer}
        errorMessage={errorMessage}
      />
    </CSSTransition>
  );
}
