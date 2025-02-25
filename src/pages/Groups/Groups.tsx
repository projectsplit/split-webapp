import { StyledGroups } from "./Groups.styled";
import { Outlet, useLocation } from "react-router-dom";
import { useSignal } from "@preact/signals-react";
// import MenuAnimationBackground from "../../components/MenuAnimations/MenuAnimationBackground";
import CreateGroupAnimation from "../../components/MenuAnimations/CreateGroupAnimation";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import BottomMainMenu from "../../components/BottomMainMenu/BottomMainMenu";
import TopMenu from "../../components/TopMenu/TopMenu";



export default function Groups() {
  const menu = useSignal<string | null>(null);
  const currencyMenu = useSignal<string | null>(null);
  const location = useLocation();
  const path = location.pathname.split("/").pop() || "";
  

  return (
    <StyledGroups>
      <TopMenu title="Groups" />
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
      {/* <MenuAnimationBackground menu={menu} /> */}
      <CreateGroupAnimation menu={menu} currencyMenu={currencyMenu} />
    </StyledGroups>
  );
}
