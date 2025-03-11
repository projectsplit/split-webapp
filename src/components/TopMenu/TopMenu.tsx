import { TopMenuProps } from "../../interfaces";
import UserOptionsButton from "../UserOptionsButton/UserOptionsButton";
import { StyledTopMenu } from "./TopMenu.styled";
import NotificationsBell from "../NotificationsBell/NotificationsBell";

export default function TopMenu({
  title,
  menu,
  username,
  numberOfNotifications,
}: TopMenuProps) {
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
      <div
        className="bellIconAndNumberOfNotifications"
        onClick={() => {
          menu.value = "notifications";
          numberOfNotifications.value = 0;
        }}
      >
        <NotificationsBell />
        {numberOfNotifications.value === 0 ? (
          ""
        ) : (
          <span className="notificationCount">
            {numberOfNotifications.value}
          </span>
        )}
      </div>
    </StyledTopMenu>
  );
}
