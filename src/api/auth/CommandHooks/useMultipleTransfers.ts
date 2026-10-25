import { useMultipleGroupTransfers } from './useMultipleGroupTransfers';
import { useMultipleNonGroupTransfers } from './useMultipleNonGroupTransfers';
import { Signal } from '@preact/signals-react';
import { TruncatedMember } from '../../../types';

export const useMultipleTransfers = (
  menu: Signal<string | null>,
  groupId?: string,
  onError?: (message: string) => void,
  // The names the settle-up shows, kept with a batch filed offline so it can still be shown.
  members: TruncatedMember[] = []
) => {
  const groupTransfer = useMultipleGroupTransfers(menu, onError, members);
  const nonGroupTransfer = useMultipleNonGroupTransfers(menu, onError, members);

  return !!groupId ? groupTransfer : nonGroupTransfer;
};
