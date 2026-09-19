import { signal, Signal, useSignal } from '@preact/signals-react';
import { useEffect, useMemo } from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import {
  ExpenseParsedFilters,
  ExpenseResponseItem,
  Mode,
  TransferParsedFilters,
  User,
  UserInfo,
} from '../../types';
import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import { useCategorySwipe } from '../../components/CategorySelector/useCategorySwipe';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import BottomMainMenu from '../../components/Menus/BottomMainMenu/BottomMainMenu';
import SearchTransactionsAnimation from '../../components/Animations/SearchTransactionsAnimation';
import GroupQuickActionsAnimation from '../../components/Animations/GroupQuickActionsAnimation';
import NewExpenseAnimation from '../../components/Animations/NewExpenseAnimation';
import NewTransferAnimation from '../../components/Animations/NewTransferAnimation';
import { StyledGroup } from './Group.styled';
import NonGroupExpenseUsersAnimation from '../../components/Animations/NonGroupExpenseUsersAnimation';
import NonGroupTransferAnimation from '../../components/Animations/NonGroupTransferAnimation';
import {
  localStorageStringParser,
  getFilterStorageKey,
} from '../../components/SearchTransactions/helpers/localStorageStringParser';
import { transactionCategories } from '@/constants';

export default function NonGroup() {
  const menu = useSignal<string | null>(null);
  const showBottomBar = useSignal<boolean>(false);
  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);
  const nonGroupMenu = useSignal<string | null>(null);
  const nonGroupTransferMenu = useSignal<{
    attribute: string;
    menu: string | null;
    senderId: string;
    senderName: string;
    receiverId: string;
    receiverName: string;
  }>({
    attribute: '',
    menu: null,
    senderId: '',
    senderName: '',
    receiverId: '',
    receiverName: '',
  });

  const { expenseFilter, transferFilter } = localStorageStringParser(
    sessionStorage.getItem(getFilterStorageKey('expense', undefined)),
    sessionStorage.getItem(getFilterStorageKey('transfer', undefined))
  );

  const expenseParsedFilters = useSignal<ExpenseParsedFilters>(expenseFilter);
  const transferParsedFilters =
    useSignal<TransferParsedFilters>(transferFilter);
  const location = useLocation();
  const path = location.pathname.split('/').pop() || '';
  const nonGroupUsers = useSignal<User[]>([]);

  const { userInfo, topMenuTitle } = useOutletContext<{
    userInfo: UserInfo;
    topMenuTitle: Signal<string>;
  }>();

  const timeZoneId = userInfo?.timeZone;
  const timeZoneCoordinates = userInfo?.timeZoneCoordinates;
  const mode: Mode = Mode.NonGroup;

  const swipeHandlers = useCategorySwipe({
    categories: transactionCategories,
    activeCat: path,
    navLinkUse: true,
  });

  useEffect(() => {
    topMenuTitle.value = 'Non Group Transactions';
  }, [showBottomBar.value, topMenuTitle]);

  useEffect(() => {
    const saved = sessionStorage.getItem('submittedFromHomePersistData');
    if (saved) {
      const { nonGroupUsers: u } = JSON.parse(saved);
      nonGroupUsers.value = u ?? [];
    }
  }, [nonGroupUsers]);

  useEffect(() => {
    if (!userInfo?.userId) return;
    nonGroupTransferMenu.value = {
      attribute: '',
      menu: null,
      senderId: userInfo.userId,
      senderName: 'You',
      receiverId: '',
      receiverName: '',
    };
  }, [userInfo?.userId, nonGroupTransferMenu]);

  const outletContext = useMemo(
    () => ({
      userInfo,
      showBottomBar,
      expenseParsedFilters,
      transferParsedFilters,
      mode,
    }),
    [userInfo, showBottomBar, expenseParsedFilters, transferParsedFilters, mode]
  );

  return (
    <StyledGroup>
      <div className="group" {...swipeHandlers}>
        <CategorySelector
          activeCat={path}
          categories={transactionCategories}
          navLinkUse={true}
        />
        <Outlet context={outletContext} />

        <MenuAnimationBackground menu={menu} />

        <NewExpenseAnimation
          expense={null}
          timeZoneId={timeZoneId}
          menu={menu}
          selectedExpense={selectedExpense}
          timeZoneCoordinates={timeZoneCoordinates}
          isPersonal={signal(false)}
          currency={userInfo?.currency}
          groupMembers={signal([])}
          nonGroupUsers={nonGroupUsers}
          isnonGroupExpense={signal(true)}
          nonGroupMenu={nonGroupMenu}
        />

        <NewTransferAnimation
          timeZoneId={timeZoneId}
          menu={menu}
          currency={userInfo?.currency}
          groupMembers={signal([])}
          nonGroupMenu={nonGroupTransferMenu}
          fromHomeGroup={signal(null)}
          fromHome={false}
        />

        <GroupQuickActionsAnimation menu={menu} />

        <SearchTransactionsAnimation
          menu={menu}
          group={null}
          userInfo={userInfo}
          timeZoneId={timeZoneId}
          expenseParsedFilters={expenseParsedFilters}
          transferParsedFilters={transferParsedFilters}
        />

        <div className="bottomMenu">
          {' '}
          <BottomMainMenu
            menu={menu}
            onClick={() => {
              menu.value = 'quickActions';
            }}
          />
        </div>
      </div>
      <NonGroupExpenseUsersAnimation
        menu={nonGroupMenu}
        nonGroupUsers={nonGroupUsers}
        isPersonal={signal(false)}
        groupMembers={signal([])}
        fromHomeGroup={signal(null)}
        isNonGroupExpense={signal(true)}
        fromNonGroup={true}
      />
      <NonGroupTransferAnimation
        nonGroupTransferMenu={nonGroupTransferMenu}
        fromHomeGroup={signal(null)}
        groupMembers={signal([])}
      />
    </StyledGroup>
  );
}
