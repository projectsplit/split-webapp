import { useNavigate, useOutletContext } from 'react-router-dom';
import { ConfirmArchiveGroupProps } from '../../../interfaces';
import Confirmation from './Confirmation';
import { useArchiveGroup } from '../../../api/auth/CommandHooks/useArchiveGroup';
import { Signal, useSignal } from '@preact/signals-react';

export default function ConfirmArchiveGroup({
  menu,
  groupId,
  openGroupOptionsMenu,
  navigateToGroups,
}: ConfirmArchiveGroupProps) {
  const noGroupFoundError = useSignal<string>('');
  const navigate = useNavigate();

  const { activeGroupCatAsState } = useOutletContext<{
    activeGroupCatAsState: Signal<string>;
  }>();

  const { mutate: archiveGroup, isPending } = useArchiveGroup(
    groupId,
    noGroupFoundError,
    menu
  );

  // const handleConfirm = () => {
  //   archiveGroup(true, {
  //     onSuccess: () => {
  //       if (navigateToGroups) {
  //         openGroupOptionsMenu.value = false;
  //         navigate('/shared');
  //         activeGroupCatAsState.value = 'Archived';
  //       }
  //     },
  //   });
  // };
  const handleConfirm = () => {
    archiveGroup(true);
    if (navigateToGroups && isPending === false) {
      openGroupOptionsMenu.value = false;
      activeGroupCatAsState.value = 'Archived';
      // navigate('/shared');
    }
  };

  return (
    <Confirmation
      menu={menu}
      isLoading={isPending}
      onClick={handleConfirm}
      header={'Confirmation'}
    >
      <div className="archiveGroupText">
        <span>
          Are you sure you want to archive this group? Once archived, members
          won’t be able to add, edit, or delete expenses and transfers.{' '}
        </span>
        <span> You can always un-archive the group later if needed. </span>
        <span className="handshake">🤝</span>
      </div>
    </Confirmation>
  );
}
