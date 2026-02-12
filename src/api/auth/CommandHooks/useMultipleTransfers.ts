import { useMultipleGroupTransfers } from "./useMultipleGroupTransfers";
import { useMultipleNonGroupTransfers } from "./useMultipleNonGroupTransfers";
import { Signal } from "@preact/signals-react";

export const useMultipleTransfers = (menu: Signal<string | null>, groupId?: string) => {
  const groupTransfer = useMultipleGroupTransfers(menu);
  const nonGroupTransfer = useMultipleNonGroupTransfers(menu);

  return !!groupId ? groupTransfer : nonGroupTransfer;
};