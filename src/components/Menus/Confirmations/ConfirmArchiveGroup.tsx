import { useOutletContext } from 'react-router-dom';
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

  const { activeGroupCatAsState } = useOutletContext<{
    activeGroupCatAsState: Signal<string>;
  }>();

  const { mutate: archiveGroup, isPending } = useArchiveGroup(
    groupId,
    noGroupFoundError,
    menu
  );

  const handleConfirm = () => {
    archiveGroup(true);
    if (navigateToGroups && isPending === false) {
      openGroupOptionsMenu.value = false;
      activeGroupCatAsState.value = 'Archived';
    }
  };

  return (
    <Confirmation
      menu={menu}
      isLoading={isPending}
      onClick={handleConfirm}
      header="Archive this group?"
      confirmLabel="Archive group"
    >
      <div className="archiveGroupText">
        Once archived, members won’t be able to add, edit, or delete expenses
        and transfers. You can un-archive it later.
      </div>
    </Confirmation>
  );
}
