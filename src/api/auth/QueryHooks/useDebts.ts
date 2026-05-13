import { Signal } from '@preact/signals-react';
import useGroupDebts from './useGroupDebts';
import useNonGroupDebts from './useNonGroupDebts';
import {
  ExpenseParsedFilters,
  Mode,
  TransferParsedFilters,
} from '../../../types';
import useUserTotals from './useUserTotals';

export const useDebts = (
  mode: Mode,
  groupId?: string,
  expenseParsedFilters?: Signal<ExpenseParsedFilters>,
  transferParsedFilters?: Signal<TransferParsedFilters>
) => {
  const normal = useGroupDebts(
    groupId,
    expenseParsedFilters,
    transferParsedFilters
  );
  const nonGroup = useNonGroupDebts(
    mode,
    expenseParsedFilters,
    transferParsedFilters
  );
  const personal = useUserTotals(mode, expenseParsedFilters);

  return mode === Mode.Group
    ? normal
    : mode === Mode.NonGroup
      ? nonGroup
      : personal;
};
