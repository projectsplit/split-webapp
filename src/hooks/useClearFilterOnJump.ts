import { Signal } from '@preact/signals-react';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ExpenseParsedFilters, TransferParsedFilters } from '@/types';
import { hasActiveExpenseFilters } from '@/helpers/hasActiveExpenseFilters';
import { hasActiveTransferFilters } from '@/helpers/hasActiveTransferFilters';
import { localStorageStringParser } from '@/components/SearchTransactions/helpers/localStorageStringParser';

/**
 * A jump link (?jumpTo=) opens a list on one particular item, so it has to show the whole list: a
 * filter left over from before could hide the very item the link is for. Links built inside the app
 * clear the stored filter before navigating, but a notification's link can be followed while this
 * screen is already open, where the filter is still held in the signal, or by reloading the page,
 * which reads it back from session storage.
 *
 * Each list only answers a jump into itself: a link to a transfer leaves the expense filter alone.
 */
const useJumpTokenFor = (list: 'expenses' | 'transfers') => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  return pathname.endsWith(`/${list}`) ? searchParams.get('jumpTo') : null;
};

export const useClearExpenseFilterOnJump = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  storageKey: string
) => {
  const jumpToken = useJumpTokenFor('expenses');

  useEffect(() => {
    if (!jumpToken) return;

    sessionStorage.removeItem(storageKey);

    if (hasActiveExpenseFilters(expenseParsedFilters.value)) {
      const { expenseFilter } = localStorageStringParser(null, null);
      expenseParsedFilters.value = expenseFilter;
    }
  }, [jumpToken, storageKey, expenseParsedFilters]);
};

export const useClearTransferFilterOnJump = (
  transferParsedFilters: Signal<TransferParsedFilters>,
  storageKey: string
) => {
  const jumpToken = useJumpTokenFor('transfers');

  useEffect(() => {
    if (!jumpToken) return;

    sessionStorage.removeItem(storageKey);

    if (hasActiveTransferFilters(transferParsedFilters.value)) {
      const { transferFilter } = localStorageStringParser(null, null);
      transferParsedFilters.value = transferFilter;
    }
  }, [jumpToken, storageKey, transferParsedFilters]);
};
