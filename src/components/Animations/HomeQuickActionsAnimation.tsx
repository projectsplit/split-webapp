import { CSSTransition } from 'react-transition-group';
import { HomeQuickActionsAnimationProps } from '../../interfaces';
import { useRef } from 'react';
import ActionsMenu from '../Menus/ActionsMenu/ActionsMenu';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

export default function HomeQuickActionsAnimation({
  quickActionsMenu,
  isNonGroupExpense,
  nonGroupTransferMenu,
  fromHomeGroup,
  userInfo,
}: HomeQuickActionsAnimationProps) {
  const nodeRef = useRef(null);
  useCloseOnBack(quickActionsMenu.value === 'quickActions', () => (quickActionsMenu.value = null));

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={quickActionsMenu.value === 'quickActions'}
      timeout={100}
      classNames="quick-actions"
      unmountOnExit
    >
      <ActionsMenu
        onClickGroup={() => (quickActionsMenu.value = 'createGroup')}
        onClickExpense={() => {
          quickActionsMenu.value = 'newExpense';
          if (!fromHomeGroup.value?.id) {
            isNonGroupExpense.value = true;
          }
        }}
        onClickTransfer={() => {
          quickActionsMenu.value = 'newTransfer';
          nonGroupTransferMenu.value = {
            attribute: '',
            menu: null,
            senderId: userInfo.userId,
            senderName: 'You',
            receiverId: '',
            receiverName: '',
          };
        }}
        bottom={100}
      />
    </CSSTransition>
  );
}
