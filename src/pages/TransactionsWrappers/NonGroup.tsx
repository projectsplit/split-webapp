import { signal, Signal, useSignal } from '@preact/signals-react';
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { ExpenseParsedFilters, ExpenseResponseItem, TransactionType, TransferParsedFilters, User, UserInfo } from '../../types';
import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import Spinner from '../../components/Spinner/Spinner';
import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import MenuAnimationBackground from '../../components/Menus/MenuAnimations/MenuAnimationBackground';
import BottomMainMenu from '../../components/Menus/BottomMainMenu/BottomMainMenu';
import SearchTransactionsAnimation from '../../components/Menus/MenuAnimations/SearchTransactionsAnimation';
import GroupQuickActionsAnimation from '../../components/Menus/MenuAnimations/MenuWithOptionsToAddAnimation';
import NewExpenseAnimation from '../../components/Menus/MenuAnimations/NewExpenseAnimation';
import NewTransferAnimation from '../../components/Menus/MenuAnimations/NewTransferAnimation';
import { StyledGroup } from './Group.styled';
import NonGroupExpenseUsersAnimation from '../../components/Menus/MenuAnimations/NonGroupExpenseUsersAnimation';
import NonGroupTransferAnimation from '../../components/Menus/MenuAnimations/NonGroupTransferAnimation';



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
    attribute: "",
    menu: null,
    senderId: "",
    senderName: "",
    receiverId: "",
    receiverName: "",
  });
  const expenseParsedFilters = useSignal<ExpenseParsedFilters>({});
  const transferParsedFilters = useSignal<TransferParsedFilters>({});
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "";
  const nonGroupUsers = useSignal<User[]>([]);

  const {
    userInfo,
    topMenuTitle,
  } = useOutletContext<{
    userInfo: UserInfo;
    topMenuTitle: Signal<string>;
  }>();

  const timeZoneId = userInfo?.timeZone;
  const timeZoneCoordinates = userInfo?.timeZoneCoordinates;
  const transactionType: TransactionType = 'NonGroup' as const

  useEffect(() => {
    topMenuTitle.value = 'Non Group Transactions';
  }, [showBottomBar.value]);

  useEffect(() => {

    const saved = localStorage.getItem("submittedFromHomePersistData");
    if (saved) {
      const {
        nonGroupUsers: u,
      } = JSON.parse(saved);
      nonGroupUsers.value = u ?? [];

    }
    nonGroupTransferMenu.value = {
      attribute: "",
      menu: null,
      senderId: userInfo?.userId,
      senderName: "You",
      receiverId: "",
      receiverName: "",
    };
  }, []);

  return (
    <StyledGroup>
      <div className="group">
        <CategorySelector
          activeCat={path}
          categories={{
            cat1: "Expenses",
            cat2: "Transfers",
            cat3: "Debts",
          }}
          navLinkUse={true}
        />
        <Outlet
          context={{
            userInfo,
            showBottomBar,
            expenseParsedFilters,
            transferParsedFilters,
            transactionType

          }}
        />

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
          isnonGroupExpense={signal(true)}
          nonGroupUsers={nonGroupUsers}
          nonGroupMenu={nonGroupMenu}
        />


        <NewTransferAnimation
          timeZoneId={timeZoneId}
          menu={menu}
          currency={userInfo?.currency}
          groupMembers={signal([])}
          isnonGroupTransfer={signal(true)}
          nonGroupUsers={nonGroupUsers}
          nonGroupMenu={nonGroupTransferMenu}
          nonGroupGroup={signal(null)}
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
          // nonGroupUsers={nonGroupUsers}
        />

        <div className="bottomMenu">
          {" "}
          <BottomMainMenu
            menu={menu}
            onClick={() => {
              menu.value = "quickActions";
            }}
          />
        </div>
      </div>
      <NonGroupExpenseUsersAnimation
        menu={nonGroupMenu}
        nonGroupUsers={nonGroupUsers}
        isPersonal={signal(false)}
        groupMembers={signal([])}
        nonGroupGroup={signal(null)}
        isNonGroupExpense={signal(true)}
        fromNonGroup={true}

      />
      <NonGroupTransferAnimation
        nonGroupTransferMenu={nonGroupTransferMenu}
        nonGroupGroup={signal(null)}
        groupMembers={signal([])}
        isNonGroupTransfer={signal(true)}
      />
    </StyledGroup>
  );
}
