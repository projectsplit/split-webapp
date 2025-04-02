import { StyledGroups } from "./Groups.styled";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import { Signal, useSignal } from "@preact/signals-react";
// import MenuAnimationBackground from "../../components/MenuAnimations/MenuAnimationBackground";
import CreateGroupAnimation from "../../components/Menus/MenuAnimations/CreateGroupAnimation";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import BottomMainMenu from "../../components/Menus/BottomMainMenu/BottomMainMenu";
import { useEffect } from "react";
import { Group } from "../../types";

export default function Groups() {
  const menu = useSignal<string | null>(null);
  const currencyMenu = useSignal<string | null>(null);
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "";
  const { topMenuTitle,group } = useOutletContext<{
    topMenuTitle: Signal<string>;
    group:Group;
  }>();

  useEffect(() => {
    topMenuTitle.value = "Groups";
  }, []);

  return (
    <StyledGroups>
      <CategorySelector
        activeCat={path}
        categories={{
          cat1: "Active",
          cat2: "Archived",
          cat3: "Deleted",
        }}
      />
      <Outlet />
      <BottomMainMenu onClick={() => (menu.value = "createGroup")} />
      <CreateGroupAnimation menu={menu} currencyMenu={currencyMenu}  />
    </StyledGroups>
  );
}
