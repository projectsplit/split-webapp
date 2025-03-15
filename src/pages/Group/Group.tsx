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
import { UserInfo } from "../../types";
import BottomMainMenu from "../../components/Menus/BottomMainMenu/BottomMainMenu";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import NewExpenseAnimation from "../../components/Menus/MenuAnimations/NewExpenseAnimation";
import GroupQuickActionsAnimation from "../../components/Menus/MenuAnimations/MenuWithOptionsToAddAnimation";
import AddNewUserAnimation from "../../components/Menus/MenuAnimations/AddNewUserAnimation";
import useGroup from "../../hooks/useGroup";
import { useEffect } from "react";

export default function Group() {
  const menu = useSignal<string | null>(null);
  const showBottomBar = useSignal<boolean>(false);
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "";
  const { groupid } = useParams();
  
  const { userInfo, topMenuTitle } = useOutletContext<{
    userInfo: UserInfo;
    topMenuTitle: Signal<string>;
  }>();

  const { data: group, isFetching } = useGroup(groupid);

  useEffect(() => {
    topMenuTitle.value = group?.name || "";
  }, [group,showBottomBar.value]);



  return (
    <StyledGroup>
      {isFetching ? (
        <div className="spinner">
          <Spinner />
    
        </div>
      ) : (
        <div className="group">
          <CategorySelector
            activeCat={path}
            categories={{
              cat1: "Expenses",
              cat2: "Transfers",
              cat3: "Members",
            }}
          />
          <Outlet context={{ userInfo, group, showBottomBar }} />

          <MenuAnimationBackground menu={menu} />
          {group && (
            <NewExpenseAnimation
              expense={null}
              group={group}
              timeZoneId="Europe/Athens"
              menu={menu}
            />
          )}
          {group && <AddNewUserAnimation menu={menu} />}
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
