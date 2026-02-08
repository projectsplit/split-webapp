import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { StyledGroup } from "./Group.styled";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { signal, Signal, useSignal } from "@preact/signals-react";
import {
  ExpenseParsedFilters,
  ExpenseResponseItem,
  TransactionType,
  TransferParsedFilters,
  UserInfo,
} from "../../types";
import BottomMainMenu from "../../components/Menus/BottomMainMenu/BottomMainMenu";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import NewExpenseAnimation from "../../components/Menus/MenuAnimations/NewExpenseAnimation";
import GroupQuickActionsAnimation from "../../components/Menus/MenuAnimations/MenuWithOptionsToAddAnimation";
import useGroup from "../../api/auth/QueryHooks/useGroup";
import { useEffect } from "react";
import NewTransferAnimation from "../../components/Menus/MenuAnimations/NewTransferAnimation";
import GroupOptions from "../Groups/GroupOptions/GroupOptions";
import ConfirmUnArchiveGroupAnimation from "../../components/Menus/MenuAnimations/ConfirmUnArchiveGroupAnimation";
import Spinner from "../../components/Spinner/Spinner";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import GroupError from "./GroupError";
import SearchTransactionsAnimation from "../../components/Menus/MenuAnimations/SearchTransactionsAnimation";
import { localStorageStringParser, getFilterStorageKey } from "../../components/SearchTransactions/helpers/localStorageStringParser";

type errorObject = {
  message: string;
  code: string | undefined;
  status: number | undefined;
  config: InternalAxiosRequestConfig<any> | undefined;
};

export default function Group() {
  const { groupid } = useParams();
  const menu = useSignal<string | null>(null);
  const showBottomBar = useSignal<boolean>(false);
  const groupError = useSignal<errorObject>();
  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);

  const { expenseFilter, transferFilter } = localStorageStringParser(
    localStorage.getItem(getFilterStorageKey("expense", groupid)),
    localStorage.getItem(getFilterStorageKey("transfer", groupid))
  );

  const expenseParsedFilters = useSignal<ExpenseParsedFilters>(expenseFilter);
  const transferParsedFilters = useSignal<TransferParsedFilters>(transferFilter);
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "";
  const navigate = useNavigate();
  const transactionType: TransactionType = "Group" as const;

  const {
    userInfo,
    topMenuTitle,
    openGroupOptionsMenu,
    groupIsArchived,
    confirmUnarchiveMenu,
  } = useOutletContext<{
    userInfo: UserInfo;
    topMenuTitle: Signal<string>;
    openGroupOptionsMenu: Signal<boolean>;
    groupIsArchived: Signal<boolean>;
    confirmUnarchiveMenu: Signal<string | null>;
  }>();

  const timeZoneId = userInfo?.timeZone;
  const timeZoneCoordinates = userInfo?.timeZoneCoordinates;
  const { data: group, isFetching, isError, error } = useGroup(groupid);

  useEffect(() => {
    groupIsArchived.value = group?.isArchived || false;
    return () => {
      groupIsArchived.value = false;
    };
  }, [group, groupIsArchived.value]);

  useEffect(() => {
    topMenuTitle.value = group?.name || "";
  }, [group, showBottomBar.value]);

  useEffect(() => {
    if (isError && error) {
      groupError.value = {
        message: error.message,
        code: error instanceof AxiosError ? error.code : undefined,
        status:
          error instanceof AxiosError ? error.response?.status : undefined,
        config: error instanceof AxiosError ? error.config : undefined,
      };
    } else {
      groupError.value = undefined;
    }
  }, [isError, error]);

  useEffect(() => {
    if (
      isError &&
      groupError.value &&
      typeof groupError.value.status === "number" &&
      groupError.value.status === 404
    ) {
      navigate("/shared");
    }
  }, [isError, groupError.value, navigate]);

  return (
    <StyledGroup>
      {isFetching ? (
        <div className="group">
          <div className="spinner">
            <Spinner />
          </div>
          <div className="bottomMenu">
            {" "}
            {<BottomMainMenu onClick={() => (menu.value = null)} />}
          </div>
          {openGroupOptionsMenu.value && <GroupOptions group={group} />}
        </div>
      ) : isError ? (
        <GroupError groupError={groupError} />
      ) : (
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
              group,
              showBottomBar,
              expenseParsedFilters,
              transferParsedFilters,
              transactionType
            }}
          />
          {openGroupOptionsMenu.value && <GroupOptions group={group} />}

          <MenuAnimationBackground menu={menu} />
          <MenuAnimationBackground menu={confirmUnarchiveMenu} />
          {group && (
            <NewExpenseAnimation
              expense={null}
              groupId={group.id}
              timeZoneId={timeZoneId}
              menu={menu}
              selectedExpense={selectedExpense}
              timeZoneCoordinates={timeZoneCoordinates}
              isPersonal={signal(false)}
              currency={group.currency}
              groupMembers={signal([...group.members, ...group.guests])}
              isnonGroupExpense={signal(false)}
              nonGroupUsers={signal([])}
            />
          )}
          {group && (
            <NewTransferAnimation
              groupId={group.id}
              timeZoneId={timeZoneId}
              menu={menu}
              currency={group.currency}
              groupMembers={signal([...group.members, ...group.guests])}
              isnonGroupTransfer={signal(false)}
              nonGroupUsers={signal([])}
            />
          )}

          {group && (
            <ConfirmUnArchiveGroupAnimation
              groupId={group.id}
              openGroupOptionsMenu={openGroupOptionsMenu}
              menu={confirmUnarchiveMenu}
              navigateToGroups={false}
            />
          )}
          <GroupQuickActionsAnimation menu={menu} />
          {group && (
            <SearchTransactionsAnimation
              menu={menu}
              group={group}
              userInfo={userInfo}
              timeZoneId={timeZoneId}
              expenseParsedFilters={expenseParsedFilters}
              transferParsedFilters={transferParsedFilters}
            />
          )}
          <div className="bottomMenu">
            {" "}
            <BottomMainMenu
              group={group}
              menu={menu}
              onClick={() => {
                if (group && !group.isArchived) {
                  menu.value = "quickActions";
                }
              }}
            />
          </div>
        </div>
      )}
    </StyledGroup>
  );
}
