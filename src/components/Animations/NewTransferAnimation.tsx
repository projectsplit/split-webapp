import { CSSTransition } from 'react-transition-group';
import { NewTransferAnimationProps } from '../../interfaces';
import TransferForm from '../TransferForm/TransferForm';
import { useRef } from 'react';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function NewTransferAnimation({
  timeZoneId,
  menu,
  groupMembers,
  currency,
  groupId,
  nonGroupMenu,
  fromHomeGroup,
  fromHome,
}: NewTransferAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'newTransfer', () => (menu.value = null));
  return (
    <CSSTransition
      in={menu.value === 'newTransfer'}
      timeout={0}
      unmountOnExit
      nodeRef={nodeRef}
    >
      <TransferForm
        groupId={groupId}
        timeZoneId={timeZoneId}
        menu={menu}
        groupMembers={groupMembers}
        currency={currency}
        nonGroupMenu={nonGroupMenu}
        fromHomeGroup={fromHomeGroup}
        fromHome={fromHome}
      />
    </CSSTransition>
  );
}
