import {
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { StyledGroup } from "./Group.styled";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { Signal, useSignal } from "@preact/signals-react";
import Spinner from "../../components/Spinner/Spinner";
import { ExpenseResponseItem, UserInfo } from "../../types";
import BottomMainMenu from "../../components/Menus/BottomMainMenu/BottomMainMenu";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import NewExpenseAnimation from "../../components/Menus/MenuAnimations/NewExpenseAnimation";
import GroupQuickActionsAnimation from "../../components/Menus/MenuAnimations/MenuWithOptionsToAddAnimation";
import AddNewUserAnimation from "../../components/Menus/MenuAnimations/AddNewUserAnimation";
import useGroup from "../../api/services/useGroup";
import { useEffect } from "react";
import NewTransferAnimation from "../../components/Menus/MenuAnimations/NewTransferAnimation";
import GroupOptions from "../Groups/GroupOptions/GroupOptions";
import { AxiosError } from "axios";
import { MdOutlineGroupOff } from "react-icons/md";

export default function Group() {
  const menu = useSignal<string | null>(null);
  const showBottomBar = useSignal<boolean>(false);
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "";
  const { groupid } = useParams();

  const { userInfo, topMenuTitle, openGroupOptionsMenu, shouldStyleBorder } =
    useOutletContext<{
      userInfo: UserInfo;
      topMenuTitle: Signal<string>;
      openGroupOptionsMenu: Signal<boolean>;
      shouldStyleBorder: Signal<boolean>;
    }>();

  const selectedExpense = useSignal<ExpenseResponseItem | null>(null);
  const timeZoneId = userInfo?.timeZone;
  const { data: group, isFetching, isError, error } = useGroup(groupid);
  const groupError = error as AxiosError;

  // console.log(String(groupError?.request.response));

  const groupName = group?.name;

  useEffect(() => {
    shouldStyleBorder.value = group?.isArchived || false;
    return () => {
      shouldStyleBorder.value = false;
    };
  }, [group, shouldStyleBorder.value]);

  useEffect(() => {
    topMenuTitle.value = group?.name || "";
  }, [group, showBottomBar.value]);

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
        <div className="group">
          <div className="noData">
            <div className="msg">No Group was found</div>
            <MdOutlineGroupOff className="icon" />
          </div>
          <div className="bottomMenu">
            {" "}
            {<BottomMainMenu onClick={() => (menu.value = null)} />}
          </div>
        </div>
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
          <Outlet context={{ userInfo, group, showBottomBar }} />
          {openGroupOptionsMenu.value && <GroupOptions group={group} />}

          <MenuAnimationBackground menu={menu} />
          {group && (
            <NewExpenseAnimation
              expense={null}
              group={group}
              timeZoneId={timeZoneId}
              menu={menu}
              selectedExpense={selectedExpense}
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
          <GroupQuickActionsAnimation menu={menu} />
          <div className="bottomMenu">
            {" "}
            {showBottomBar.value && (
              <BottomMainMenu
                onClick={() => (menu.value = "menuWithOptions")}
              />
            )}
          </div>
        </div>
      )}
    </StyledGroup>
  );
}
