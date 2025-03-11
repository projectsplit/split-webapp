import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
import { StyledProtected } from "./Protected.styled";
import TopMenu from "../../components/TopMenu/TopMenu";
import MenuAnimationBackground from "../../components/MenuAnimations/MenuAnimationBackground";
import NotificationsMenuAnimation from "../../components/MenuAnimations/NotificationsMenuAnimation";
import SettingsMenuAnimation from "../../components/MenuAnimations/SettingsMenuAnimation";
import { getMe } from "../../api/services/api";
import { useGetUserInvitations } from "../../api/services/useGetUserInvitations";
import { useEffect } from "react";

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

  const topMenuTitle = useSignal<string>("");
  const menu = useSignal<string | null>(null);
  const numberOfNotifications = useSignal<number>(0);

  useEffect(() => {
    if (userInvitations && userInvitations?.length > 0) {
      numberOfNotifications.value = 1;
    }
  }, [userInvitations]);

  return isUserAuthenticated() ? (
    <StyledProtected>
      <TopMenu
        title={topMenuTitle.value}
        menu={menu}
        username={userInfo?.username || ""}
        numberOfNotifications={numberOfNotifications}
      />
      <Outlet context={{ userInfo, topMenuTitle }} />
      <MenuAnimationBackground menu={menu} />
      <NotificationsMenuAnimation
        menu={menu}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        userInvitations={userInvitations}
      />
      <SettingsMenuAnimation menu={menu} username={userInfo?.username || ""} />
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
