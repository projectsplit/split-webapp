import { useNavigate } from 'react-router-dom';
import { ConfirmLeaveGroupProps } from '../../../interfaces';
import Confirmation from './Confirmation';
import { useSignal } from '@preact/signals-react';
import { useLeaveGroup } from '../../../api/auth/CommandHooks/useLeaveGroup';
import { useMostRecentContext } from '../../../api/auth/CommandHooks/useMostRecentContext';

export default function ConfirmLeaveGroup({
  menu,
  groupId,
  openGroupOptionsMenu,
}: ConfirmLeaveGroupProps) {
  const groupError = useSignal<string>('');
  const noMemberError = useSignal<string>('');
  const navigate = useNavigate();
  const { mutate: leaveGroupMutation, isPending } = useLeaveGroup(
    menu,
    groupId,
    groupError,
    navigate,
    openGroupOptionsMenu
  );

  useMostRecentContext();

  const handleConfirm = () => {
    if (groupError.value === '') {
      leaveGroupMutation();
    } else {
      openGroupOptionsMenu.value = false;
    }
  };

  return (
    <Confirmation
      menu={menu}
      isLoading={isPending}
      onClick={handleConfirm}
      header={groupError.value === '' ? 'Leave this group?' : 'Info'}
      confirmLabel={groupError.value === '' ? 'Leave group' : undefined}
    >
      <div className="leaveGroupText">
        {groupError.value === '' && noMemberError.value === '' ? (
          <span>Only possible once your balance is settled.</span>
        ) : groupError.value !== '' ? (
          <span>{groupError.value}</span>
        ) : (
          <span>Something went wrong. Please try again.</span>
        )}
      </div>
    </Confirmation>
  );
}
