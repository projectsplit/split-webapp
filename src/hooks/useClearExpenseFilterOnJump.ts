import { Signal } from '@preact/signals-react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ExpenseParsedFilters } from '@/types';
import { hasActiveExpenseFilters } from '@/helpers/hasActiveExpenseFilters';
import { localStorageStringParser } from '@/components/SearchTransactions/helpers/localStorageStringParser';

/**
 * A jump link (?jumpTo=) opens the list on one particular expense, so it has to show the whole
 * list: a filter left over from before could hide the very expense the link is for. Links built
 * inside the app clear the stored filter before navigating, but a notification's link can be
 * followed while this screen is already open, where the filter is still held in the signal, or by
 * reloading the page, which reads it back from session storage.
 */
export const useClearExpenseFilterOnJump = (
  expenseParsedFilters: Signal<ExpenseParsedFilters>,
  storageKey: string
) => {
  const [searchParams] = useSearchParams();
  const jumpToken = searchParams.get('jumpTo');

  useEffect(() => {
    if (!jumpToken) return;

    sessionStorage.removeItem(storageKey);

    if (hasActiveExpenseFilters(expenseParsedFilters.value)) {
      const { expenseFilter } = localStorageStringParser(null, null);
      expenseParsedFilters.value = expenseFilter;
    }
  }, [jumpToken, storageKey, expenseParsedFilters]);
};
