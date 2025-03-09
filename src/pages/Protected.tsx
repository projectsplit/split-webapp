import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import { getMe } from "../api/services/api";
import TopMenu from "../components/TopMenu/TopMenu";
import { useSignal } from "@preact/signals-react";
import MenuAnimationBackground from "../components/MenuAnimations/MenuAnimationBackground";
import SettingsMenuAnimation from "../components/MenuAnimations/SettingsMenuAnimation";
import { StyledProtected } from "./Protected.styled";

const Protected: React.FC = () => {
  const { data: userInfo } = useQuery({
    queryKey: ["getMe"],
    queryFn: getMe,
  });
  const topMenuTitle = useSignal<string>("");

  const menu = useSignal<string | null>(null);

  const isUserAuthenticated = () => {
    return !!localStorage.getItem("accessToken");
  };

  return isUserAuthenticated() ? (
    <StyledProtected>
      <TopMenu
        title={topMenuTitle.value}
        menu={menu}
        username={userInfo?.username || ""}
      />
      <Outlet context={{ userInfo, topMenuTitle }} />
      <MenuAnimationBackground menu={menu} />
      <SettingsMenuAnimation menu={menu} username={userInfo?.username || ""} />
    </StyledProtected>
  ) : (
    <Navigate to="/welcome" />
  );
};

export default Protected;
