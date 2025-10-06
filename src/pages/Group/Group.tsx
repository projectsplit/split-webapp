import {
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { StyledGroup } from "./Group.styled";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { Signal, useSignal } from "@preact/signals-react";
import {
  ExpenseParsedFilters,
  ExpenseResponseItem,
  TransferParsedFilters,
  UserInfo,
} from "../../types";
import BottomMainMenu from "../../components/Menus/BottomMainMenu/BottomMainMenu";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import NewExpenseAnimation from "../../components/Menus/MenuAnimations/NewExpenseAnimation";
import GroupQuickActionsAnimation from "../../components/Menus/MenuAnimations/MenuWithOptionsToAddAnimation";
import AddNewUserAnimation from "../../components/Menus/MenuAnimations/AddNewUserAnimation";
import useGroup from "../../api/services/useGroup";
import { useEffect, useRef } from "react";
import NewTransferAnimation from "../../components/Menus/MenuAnimations/NewTransferAnimation";
import GroupOptions from "../Groups/GroupOptions/GroupOptions";
import ConfirmUnArchiveGroupAnimation from "../../components/Menus/MenuAnimations/ConfirmUnArchiveGroupAnimation";
import Spinner from "../../components/Spinner/Spinner";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import GroupError from "./GroupError";
import SearchTransactionsAnimation from "../../components/Menus/MenuAnimations/SearchTransactionsAnimation";

type errorObject = {
  message: string;
  code: string | undefined;
  status: number | undefined;
  config: InternalAxiosRequestConfig<any> | undefined;
};
export default function Group() {
  const menu = useSignal<string | null>(null);
  const showBottomBar = useSignal<boolean>(false);
  const groupError = useSignal<errorObject>();
  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);
  const expenseParsedFilters = useSignal<ExpenseParsedFilters>({})
  const transferParsedFilters = useSignal<TransferParsedFilters>({})
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "";
  const { groupid } = useParams();
  const navigate = useNavigate();

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

  const groupName = group?.name;

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
      navigate("/groups");
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
          <Outlet context={{ userInfo, group, showBottomBar,expenseParsedFilters,transferParsedFilters }} />
          {openGroupOptionsMenu.value && <GroupOptions group={group} />}

          <MenuAnimationBackground menu={menu} />
          <MenuAnimationBackground menu={confirmUnarchiveMenu} />
          {group && (
            <NewExpenseAnimation
              expense={null}
              group={group}
              timeZoneId={timeZoneId}
              menu={menu}
              selectedExpense={selectedExpense}
              timeZoneCoordinates={timeZoneCoordinates}

            />
          )}
          {group && (
            <NewTransferAnimation
              group={group}
              timeZoneId={timeZoneId}
              menu={menu}
            />
          )}
          {group && <AddNewUserAnimation menu={menu} groupName={groupName} />}
          {group && (
            <ConfirmUnArchiveGroupAnimation
              groupId={group.id}
              openGroupOptionsMenu={openGroupOptionsMenu}
              menu={confirmUnarchiveMenu}
              navigateToGroups={false}
            />
          )}
          <GroupQuickActionsAnimation menu={menu} />
          {group && <SearchTransactionsAnimation menu={menu} group={group} userInfo={userInfo} timeZoneId={timeZoneId} expenseParsedFilters={expenseParsedFilters} transferParsedFilters={transferParsedFilters}/>}
          <div className="bottomMenu">
            {" "}
            <BottomMainMenu
              group={group}
              menu={menu}
              onClick={() => {
                if (group && !group.isArchived) {
                  menu.value = "menuWithOptions";
                } else {
                }
              }}
            />
          </div>
        </div>
      )}
    </StyledGroup>
  );
}
