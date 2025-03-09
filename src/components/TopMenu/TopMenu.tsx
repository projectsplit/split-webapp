import { TopMenuProps } from "../../interfaces";
import UserOptionsButton from "../UserOptionsButton/UserOptionsButton";
import { StyledTopMenu } from "./TopMenu.styled";
import NotificationsBell from "../NotificationsBell/NotificationsBell";

export default function TopMenu({ title, menu, username }: TopMenuProps) {
  return (
    <StyledTopMenu>
      <div className="useOptionsContainer">
        <UserOptionsButton
          username={username}
          onClick={() => (menu.value = "settings")}
        />
      </div>
      <div className="titleStripe">
        <div className="title">{title}</div>
      </div>
      <NotificationsBell />
    </StyledTopMenu>
  );
}
