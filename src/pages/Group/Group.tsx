import {
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { StyledGroup } from "./Group.styled";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { Signal, useSignal } from "@preact/signals-react";
import { useQuery } from "@tanstack/react-query";
import { getGroup } from "../../api/services/api";
import Spinner from "../../components/Spinner/Spinner";
import { UserInfo } from "../../types";
import BottomMainMenu from "../../components/BottomMainMenu/BottomMainMenu";
import TopMenu from "../../components/TopMenu/TopMenu";
import SettingsMenuAnimation from "../../components/MenuAnimations/SettingsMenuAnimation";
import MenuAnimationBackground from "../../components/MenuAnimations/MenuAnimationBackground";
import NewExpenseAnimation from "../../components/MenuAnimations/NewExpenseAnimation";
import GroupQuickActionsAnimation from "../../components/MenuAnimations/MenuWithOptionsToAddAnimation";
import AddNewUserAnimation from "../../components/MenuAnimations/AddNewUserAnimation";
import useGroup from "../../hooks/useGroup";
import { useEffect } from "react";

export default function Group() {
  const menu = useSignal<string | null>(null);
  // const currencyMenu = useSignal<string | null>(null);
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "";
  const { groupid } = useParams();

  const { userInfo,topMenuTitle } = useOutletContext<{
    userInfo: UserInfo;
    topMenuTitle: Signal<string>;
  }>();

  const { data: group, isFetching } = useGroup(groupid);


 useEffect(()=>{
   topMenuTitle.value = group?.name||""
 },[group])

  // if (!groupid || !isSuccess) {
  //   return <div>Error</div>;
  // }

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
          <Outlet context={{ userInfo }} />

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
          {group &&<GroupQuickActionsAnimation menu={menu} />}
          <div className="bottomMenu">
            {" "}
            <BottomMainMenu onClick={() => (menu.value = "menuWithOptions")} />
          </div>
        </div>
      )}
    </StyledGroup>
  );
}
