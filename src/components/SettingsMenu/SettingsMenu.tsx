import React from "react";
import { StyledSettingsMenu } from "./SettingsMenu.styled";
import { SettingsMenuProps } from "../../interfaces";
import { IoClose } from "react-icons/io5";
import { StyledUserOptionsButton } from "../UserOptionsButton/UserOptionsButton.styled";
import { useNavigate, useOutletContext } from "react-router-dom";
import { UserInfo } from "../../types";
import Separator from "../Separator/Separator";
import { TbLogout2 } from "react-icons/tb";

export default function SettingsMenu({ menu, nodeRef }: SettingsMenuProps) {
  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/welcome");
  };
  return (
    <StyledSettingsMenu ref={nodeRef}>
      {" "}
      <div className="headerWrapper">
        <div className="header">
          <StyledUserOptionsButton>{"CK"}</StyledUserOptionsButton>
          <div className="name">{userInfo?.username}</div>
          <div
            className="closeButtonContainer"
            onClick={() => (menu.value = null)}
          >
            <IoClose className="closeButton" />
          </div>
        </div>
        <Separator />
      </div>
      <div className="optionsContainer">
        <div className="option" onClick={handleLogout}>
          <TbLogout2 className="icon" />
          <div className="description">Log out</div>
        </div>
      </div>
    </StyledSettingsMenu>
  );
}
