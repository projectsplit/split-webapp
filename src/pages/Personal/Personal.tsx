import { useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { StyledPersonal } from './Personal.styled';
import {
  ExpenseParsedFilters,
  ExpenseResponseItem,
  Mode,
  UserInfo,
} from '../../types';
import { useSignal, Signal, signal } from '@preact/signals-react';
import NewExpenseAnimation from '@/components/Animations/NewExpenseAnimation';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import BottomMainMenu from '@/components/Menus/BottomMainMenu/BottomMainMenu';
import SearchTransactionsAnimation from '@/components/Animations/SearchTransactionsAnimation';
import {
  getFilterStorageKey,
  localStorageStringParser,
} from '@/components/SearchTransactions/helpers/localStorageStringParser';

export const Personal = () => {
  const { userInfo, topMenuTitle } = useOutletContext<{
    userInfo: UserInfo;
    topMenuTitle: Signal<string>;
  }>();
  const showBottomBar = useSignal<boolean>(true);
  const transferParsedFilters = useSignal({});
  const menu = useSignal<string | null>(null);
  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);
  const timeZoneId = userInfo?.timeZone;
  const timeZoneCoordinates = userInfo?.timeZoneCoordinates;
  const fromPersonal = useSignal<boolean>(true);

  const { expenseFilter } = localStorageStringParser(
    localStorage.getItem(getFilterStorageKey('expense', undefined, true)),
    null
  );

  const expenseParsedFilters = useSignal<ExpenseParsedFilters>(expenseFilter);

  useEffect(() => {
    topMenuTitle.value = 'Your Expenses';
  }, []);

  return (
    <StyledPersonal>
      <Outlet
        context={{
          userInfo,
          topMenuTitle,
          showBottomBar,
          expenseParsedFilters,
          transferParsedFilters,
          mode: Mode.Personal,
          group: null,
        }}
      />
      <SearchTransactionsAnimation
        menu={menu}
        group={null}
        userInfo={userInfo}
        timeZoneId={timeZoneId}
        expenseParsedFilters={expenseParsedFilters}
        transferParsedFilters={transferParsedFilters}
        isPersonal={true}
        // nonGroupUsers={nonGroupUsers}
      />
      <div className="bottomMenu">
        {' '}
        <BottomMainMenu
          menu={menu}
          onClick={() => {
            menu.value = 'newExpense';
          }}
        />
      </div>

      <MenuAnimationBackground menu={menu} />
      <NewExpenseAnimation
        expense={null}
        timeZoneId={timeZoneId}
        menu={menu}
        selectedExpense={selectedExpense}
        timeZoneCoordinates={timeZoneCoordinates}
        isPersonal={signal(true)}
        currency={userInfo?.currency}
        groupMembers={signal([])}
        isnonGroupExpense={signal(false)}
        nonGroupUsers={signal([])}
        fromPersonal={fromPersonal}
      />
    </StyledPersonal>
  );
};
