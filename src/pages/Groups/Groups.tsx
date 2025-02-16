import { StyledGroups } from "./Groups.styled";
import { Outlet } from "react-router-dom";
import GroupsMainStripe from "./GroupsMainStripe/GroupsMainStripe";
import { useSignal } from "@preact/signals-react";
import Separator from "../../components/Separator/Separator";
import CategoryButton from "../../components/CategoryButton/CategoryButton";
import MenuAnimationBackground from "../../components/MenuAnimations/MenuAnimationBackground";
import CreateGroupAnimation from "../../components/MenuAnimations/CreateGroupAnimation";


export default function Groups() {

  const menu = useSignal<string | null>(null);

  return (
    <StyledGroups>
      <GroupsMainStripe menu={menu}/>
      <div className="groupCategories">
        <CategoryButton to="active">Active</CategoryButton>
        <CategoryButton to="archived">Archived</CategoryButton>
        <CategoryButton to="deleted">Deleted</CategoryButton>
      </div>
      <Separator />
      <Outlet />

      <MenuAnimationBackground menu={menu} />
      <CreateGroupAnimation menu={menu} />
    </StyledGroups>
  );
}
