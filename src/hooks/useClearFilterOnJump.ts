import { Signal } from '@preact/signals-react';
import { useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ExpenseParsedFilters, TransferParsedFilters } from '@/types';
import { hasActiveExpenseFilters } from '@/helpers/hasActiveExpenseFilters';
import { hasActiveTransferFilters } from '@/helpers/hasActiveTransferFilters';
import { localStorageStringParser } from '@/components/SearchTransactions/helpers/localStorageStringParser';
import { useJumpRequest } from './useJumpRequest';

/**
 * A jump link (?jumpTo=) opens a list on one particular item, so it has to show the whole list: a
 * filter left over from before could hide the very item the link is for. Links built inside the app
 * clear the stored filter before navigating, but a notification's link can be followed while this
 * screen is already open, where the filter is still held in the signal, or by reloading the page,
 * which reads it back from session storage.
 *
 * Each list only answers a jump into itself: a link to a transfer leaves the expense filter alone.
 * Following the same link again is another jump (see useJumpRequest), so a filter set since the
 * last one goes too.
 */
const useJumpFor = (list: 'expenses' | 'transfers') => {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  return useJumpRequest(
    pathname.endsWith(`/${list}`) ? searchParams.get('jumpTo') : null
  );
};

export const useClearExpenseFilterOnJump = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  storageKey: string
) => {
  const jump = useJumpFor('expenses');

  useEffect(() => {
    if (!jump) return;

    sessionStorage.removeItem(storageKey);

    if (hasActiveExpenseFilters(expenseParsedFilters.value)) {
      const { expenseFilter } = localStorageStringParser(null, null);
      expenseParsedFilters.value = expenseFilter;
    }
  }, [jump, storageKey, expenseParsedFilters]);
};

export const useClearTransferFilterOnJump = (
  transferParsedFilters: Signal<TransferParsedFilters>,
  storageKey: string
) => {
  const jump = useJumpFor('transfers');

  useEffect(() => {
    if (!jump) return;

    sessionStorage.removeItem(storageKey);

    if (hasActiveTransferFilters(transferParsedFilters.value)) {
      const { transferFilter } = localStorageStringParser(null, null);
      transferParsedFilters.value = transferFilter;
    }
  }, [jump, storageKey, transferParsedFilters]);
};
