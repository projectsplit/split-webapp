import {
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { StyledGroup2 } from "./Group2.styled";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { useSignal } from "@preact/signals-react";
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

export default function Group2() {
  const menu = useSignal<string | null>(null);
  // const currencyMenu = useSignal<string | null>(null);
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "";
  const { groupid } = useParams();

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();

  const {
    data: group,
    isFetching,
    isSuccess,
  } = useQuery({
    queryKey: [groupid],
    queryFn: () =>
      groupid ? getGroup(groupid) : Promise.reject("No group ID"),
    enabled: !!groupid,
  });

  // if (!groupid || !isSuccess) {
  //   return <div>Error</div>;
  // }

  return (
    <StyledGroup2>
      {isFetching ? (
        <div className="spinner">
          <Spinner />
        </div>
      ) : (
        <div className="group">
          <TopMenu title={group?.name || ""} menu={menu} />
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
          <SettingsMenuAnimation menu={menu} />
          <GroupQuickActionsAnimation menu={menu}/>
          <BottomMainMenu onClick={() => (menu.value = "menuWithOptions")} />
        </div>
      )}
    </StyledGroup2>
  );
}
