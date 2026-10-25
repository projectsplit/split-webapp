import { DeleteTransferConfirmationProps } from '../../../interfaces';
import Confirmation from './Confirmation';
import { onlineManager } from '@tanstack/react-query';
import { needsConnectionMessage } from '@/api/offline/connectivity';
import { showGlobalWarning } from '@/components/GlobalWarning/globalWarningState';
import { useDeleteTransferMutation } from '@/api/auth/CommandHooks/useDeleteTransferMutation';

export default function DeleteTransferConfirmation({
  menu,
  selectedTransfer,
  errorMessage,
}: DeleteTransferConfirmationProps) {
  const { mutate: deleteTransfer, isPending } = useDeleteTransferMutation(
    menu,
    errorMessage,
    selectedTransfer
  );

  const transferId = selectedTransfer.value?.id;

  const handleDelete = () => {
    if (!transferId) return;

    if (!onlineManager.isOnline()) {
      menu.value = null;
      showGlobalWarning(needsConnectionMessage('Deleting a transfer'));
      return;
    }

    deleteTransfer(transferId);
  };

  return (
    <Confirmation
      onClick={handleDelete}
      menu={menu}
      isLoading={isPending}
      header={'Confirmation'}
    >
      <div>Are you sure you want to delete this transfer?</div>
    </Confirmation>
  );
}
