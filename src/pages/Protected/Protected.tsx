import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import { StyledProtected } from "./Protected.styled";
import MenuAnimationBackground from "../../components/Menus/MenuAnimations/MenuAnimationBackground";
import NotificationsMenuAnimation from "../../components/Menus/MenuAnimations/NotificationsMenuAnimation";
import SettingsMenuAnimation from "../../components/Menus/MenuAnimations/SettingsMenuAnimation";
import { getMe } from "../../api/services/api";
import { useGetUserInvitations } from "../../api/services/useGetUserInvitations";
import TopMenu from "../../components/Menus/TopMenu/TopMenu";
import { useMemo } from "react";

const Protected: React.FC = () => {
  const location = useLocation();

  const { data: userInfo } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
    enabled: isUserAuthenticated(),
  });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetUserInvitations(10);

  const userInvitations = data?.pages.flatMap((p) => p.invitations);
  const hasNewerNotifications = userInfo?.hasNewerNotifications;

  const topMenuTitle = useSignal<string>("");
  const menu = useSignal<string | null>(null);

  const { latest } = useMemo(() => {
    const latest = getLatestCreated(userInvitations);

    return { latest };
  }, [userInvitations]);

  return isUserAuthenticated() ? (
    <StyledProtected>
      <TopMenu
        title={topMenuTitle.value}
        menu={menu}
        username={userInfo?.username}
        hasNewerNotifications={hasNewerNotifications || false}
        latestTimeStamp={latest}
      />
      <Outlet context={{ userInfo, topMenuTitle }} />
      <MenuAnimationBackground menu={menu} />
      <NotificationsMenuAnimation
        menu={menu}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        userInvitations={userInvitations}
        hasNewerNotifications={hasNewerNotifications || false}
        userInfo={userInfo}

      />
      <SettingsMenuAnimation menu={menu} userInfo={userInfo} />
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


function getLatestCreated<T extends { created: string }>(...arrays: (T[] | undefined)[]): string | undefined {

  const combinedItems = arrays.reduce<T[]>((acc, curr) => acc.concat(curr ?? []), []);

  if (combinedItems.length === 0) {
    return undefined; 
  }

  const latestTimestamp = Math.max(
    ...combinedItems.map(item => new Date(item.created).getTime())
  );

  return new Date(latestTimestamp).toISOString();
}