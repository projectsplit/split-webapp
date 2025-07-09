import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import { StyledProtected } from "./Protected.styled";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import NotificationsMenuAnimation from "../../components/Menus/MenuAnimations/NotificationsMenuAnimation";
import SettingsMenuAnimation from "../../components/Menus/MenuAnimations/SettingsMenuAnimation";
import { getMe } from "../../api/services/api";
import TopMenu from "../../components/Menus/TopMenu/TopMenu";

const Protected: React.FC = () => {
  const location = useLocation();

  const { data: userInfo } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    enabled: isUserAuthenticated(),
  });
  const groupIsArchived = useSignal<boolean>(false)
  
  const hasNewerNotifications = userInfo?.hasNewerNotifications;

  const topMenuTitle = useSignal<string>("");
  const menu = useSignal<string | null>(null);
  const openGroupOptionsMenu = useSignal<boolean>(false);
  const activeGroupCatAsState = useSignal<string>("Active");
  const confirmUnarchiveMenu = useSignal<string | null>(null);
  const excludeTopMenu = shouldExcludeTopMenu (['/analytics'])
  
  return isUserAuthenticated() ? (
    <StyledProtected $shouldStyleBorder={groupIsArchived.value}>
      {!excludeTopMenu&&<TopMenu
        title={topMenuTitle.value}
        menu={menu}
        username={userInfo?.username}
        hasNewerNotifications={hasNewerNotifications || false}
        openGroupOptionsMenu={openGroupOptionsMenu}
        groupIsArchived={groupIsArchived.value}
        confirmUnarchiveMenu={confirmUnarchiveMenu}
      />}
      <Outlet context={{ userInfo, topMenuTitle,openGroupOptionsMenu,activeGroupCatAsState,groupIsArchived,confirmUnarchiveMenu }} />
      <MenuAnimationBackground menu={menu} />
      <NotificationsMenuAnimation
        menu={menu}
        hasNewerNotifications={hasNewerNotifications || false}
        userInfo={userInfo}
      />
      <SettingsMenuAnimation menu={menu} userInfo={userInfo} />
      {/* <ConfirmUnArchiveGroupAnimation  /> */}
    </StyledProtected>
  ) : (
    <Navigate
      to={`/welcome?redirect=${encodeURIComponent(location.pathname)}`}
      replace
    />
  );
};

export default Protected;

const isUserAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};

const shouldExcludeTopMenu = (excludeRoutes: string[]): boolean => {
  const location = useLocation();
  return excludeRoutes.some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(`${route}/`)
  );
};