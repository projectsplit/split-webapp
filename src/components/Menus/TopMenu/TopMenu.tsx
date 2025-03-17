import { useNavigate } from "react-router-dom";
import { TopMenuProps } from "../../../interfaces";
import NotificationsBell from "../../NotificationsBell/NotificationsBell";
import UserOptionsButton from "../../UserOptionsButton/UserOptionsButton";
import { StyledTopMenu } from "./TopMenu.styled";
import { useLastViewedNotification } from "../../../api/services/useLastViewedNotification";
import { useState } from "react";

export default function TopMenu({
  title,
  menu,
  username,
  hasNewerNotifications,
  latestTimeStamp,
}: TopMenuProps) {
  const navigate = useNavigate();

  const [visuallyShowNotification, setVisuallyShowNotification] =
    useState<boolean>(true);

  const handleNavigate = (title: string) => {
    if (title !== "" && title !== "Groups") {
      navigate("/groups/active");
    }
  };
  const updateNotification = useLastViewedNotification();
  return (
    <StyledTopMenu>
      <div className="useOptionsContainer">
        {username?<UserOptionsButton
          username={username}
          onClick={() => (menu.value = "settings")}
        />:null}
      </div>
      <div className="titleStripe">
        <div
          className="title"
          onClick={() => handleNavigate(title)}
          style={{ cursor: title !== "Groups" ? "pointer" : "" }}
        >
          {title}
        </div>
      </div>
      <div
        className="bellIconAndNumberOfNotifications"
        onClick={() => {
          menu.value = "notifications";
          setVisuallyShowNotification(false);
          updateNotification.mutate(latestTimeStamp);
        }}
      >
         {username?<NotificationsBell />:null}
        {hasNewerNotifications &&visuallyShowNotification? <span className="notification" /> : ""}
      </div>
    </StyledTopMenu>
  );
}
