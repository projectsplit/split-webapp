import { useNavigate } from "react-router-dom";
import { TopMenuProps } from "../../../interfaces";
import NotificationsBell from "../../NotificationsBell/NotificationsBell";
import UserOptionsButton from "../../UserOptionsButton/UserOptionsButton";
import { StyledTopMenu } from "./TopMenu.styled";
import { useLastViewedNotification } from "../../../api/services/useLastViewedNotification";
import { useState } from "react";
import IonIcon from "@reacticons/ionicons";

export default function TopMenu({
  title,
  menu,
  username,
  hasNewerNotifications,
  openGroupOptionsMenu,
}: TopMenuProps) {
  const navigate = useNavigate();

  const [visuallyShowNotification, setVisuallyShowNotification] =
    useState<boolean>(true);

  const handleNavigate = (title: string) => {
    if (title !== "" && title !== "Groups") {
      navigate("/groups");
    }
  };
  const isInGroup = title !== "" && title !== "Groups";
  //const updateNotification = useLastViewedNotification(10);

  return (
    <StyledTopMenu title={title}>
      <div className="useOptionsContainer">
        {username ? (
          <UserOptionsButton
            username={username}
            onClick={() => (menu.value = "settings")}
          />
        ) : null}

        {isInGroup ? (
          <div className="titleStripe">
            <div
              className="title"
              onClick={() => handleNavigate(title)}
              style={{ cursor: title !== "Groups" ? "pointer" : "" }}
            >
              {title}
            </div>
          </div>
        ) : null}
      </div>

      {!isInGroup ? (
        <div className="titleStripe">
          <div
            className="title"
            onClick={() => handleNavigate(title)}
            style={{ cursor: title !== "Groups" ? "pointer" : "" }}
          >
            {title}
          </div>
        </div>
      ) : null}

      <div className="bellAndCog">
        {" "}
        {isInGroup ? (
          <div
            className="cogContainer"
            onClick={() => (openGroupOptionsMenu.value = true)}
          >
            {" "}
            <IonIcon name="settings-outline" className="cog" />
          </div>
        ) : null}
        <div
          className="bellIconAndNumberOfNotifications"
          onClick={() => {
            menu.value = "notifications";
            setVisuallyShowNotification(false);
          }}
        >
          {username ? <NotificationsBell /> : null}

          {hasNewerNotifications && visuallyShowNotification ? (
            <span className="notification" />
          ) : (
            ""
          )}
        </div>
      </div>
    </StyledTopMenu>
  );
}
