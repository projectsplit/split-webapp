import { useEffect } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { StyledPersonal } from "./Personal.styled";
import { ExpenseParsedFilters, ExpenseResponseItem, User, UserInfo } from "@/types";
import { useSignal, Signal, signal } from "@preact/signals-react";
import NewExpenseAnimation from "@/components/Animations/NewExpenseAnimation";
import MenuAnimationBackground from "@/components/Animations/MenuAnimationBackground";
import BottomMainMenu from "@/components/Menus/BottomMainMenu/BottomMainMenu";

export const Personal = () => {
  const { userInfo, topMenuTitle } = useOutletContext<{ userInfo: UserInfo; topMenuTitle: Signal<string> }>();
  const showBottomBar = useSignal<boolean>(true);
  const expenseParsedFilters = useSignal<ExpenseParsedFilters>({});
  const transferParsedFilters = useSignal({});
  const menu = useSignal<string | null>(null);
  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);
  const timeZoneId = userInfo?.timeZone;
  const timeZoneCoordinates = userInfo?.timeZoneCoordinates;
  const fromPersonal = useSignal<boolean>(true);

  useEffect(() => {
    topMenuTitle.value = "Your Expenses";
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
          transactionType: "Personal",
          group: null,
        }}

      /> <div className="bottomMenu">
        {" "}
        <BottomMainMenu
          menu={menu}
          onClick={() => {
            menu.value = "newExpense";
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