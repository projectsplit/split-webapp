import { useMultipleGroupTransfers } from './useMultipleGroupTransfers';
import { useMultipleNonGroupTransfers } from './useMultipleNonGroupTransfers';
import { Signal } from '@preact/signals-react';

export const useMultipleTransfers = (
  menu: Signal<string | null>,
  groupId?: string,
  onError?: (message: string) => void
) => {
  const groupTransfer = useMultipleGroupTransfers(menu, onError);
  const nonGroupTransfer = useMultipleNonGroupTransfers(menu, onError);

  return !!groupId ? groupTransfer : nonGroupTransfer;
};
