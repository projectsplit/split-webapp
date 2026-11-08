import { createContext, useContext } from 'react';
import { useOutletContext } from 'react-router-dom';

type TabPage = { context: unknown; inView: boolean };

const TabPageContext = createContext<TabPage | null>(null);

export const TabPageProvider = TabPageContext.Provider;

/**
 * What an expenses, transfers or debts page is given by the screen around it. The group and
 * quick-split screens keep all three side by side, to be swiped between, so they hand it over
 * here; the personal screen shows expenses alone, through its outlet.
 */
export const useTransactionsPageContext = <T>(): T => {
  const tab = useContext(TabPageContext);
  const outlet = useOutletContext<T>();
  return tab ? (tab.context as T) : outlet;
};

/** False for a page swiped out of view. A page shown on its own is always in view. */
export const useTabInView = () => useContext(TabPageContext)?.inView ?? true;
