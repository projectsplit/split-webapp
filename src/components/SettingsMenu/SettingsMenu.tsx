import { useState } from "react";
import { StyledSettingsMenu } from "./SettingsMenu.styled";
import { SettingsMenuProps } from "../../interfaces";
import { IoClose } from "react-icons/io5";
import { StyledUserOptionsButton } from "../UserOptionsButton/UserOptionsButton.styled";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Currency, UserInfo } from "../../types";
import Separator from "../Separator/Separator";
import { TbLogout2 } from "react-icons/tb";
import packackageJson from "../../../package.json";
import { FaCoins } from "react-icons/fa";
import MenuAnimationBackground from "../MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../MenuAnimations/CurrencyOptionsAnimation";
import { useSignal } from "@preact/signals-react";
import { currencyData } from "../../helpers/openExchangeRates";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { logOut } from "../../api/auth/api";
import routes from "../../routes";
import { useMutation } from "@tanstack/react-query";

export default function SettingsMenu({ menu, nodeRef }: SettingsMenuProps) {
  const version = packackageJson.version;
  const currency = useSignal<string>(localStorage.getItem("currency") || "USD");
  const currencyMenu = useSignal<string | null>(null);

  const handldeCurrencyOptionsClick = (curr: string) => {
    currency.value = curr;
    localStorage.setItem("currency", curr);
    currencyMenu.value = null;
  };

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();
  const navigate = useNavigate();

  const logOutMutation = useMutation<any, Error, void>({
    mutationFn: logOut,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      navigate(routes.AUTH)
    },
    onError: (error) => {
      console.error("Log out failed:", error.message);
    },
  });
  
  const handleLogout = async () => {
    logOutMutation.mutate()
    navigate(routes.AUTH);
  };

  const allCurrencies = useSignal<Currency[]>(currencyData);

  const selectedCurrency = allCurrencies.value.find(
    (c) => c.symbol === currency.value
  );

  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
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
        <div
          className="option"
          onClick={() => (currencyMenu.value = "currencyOptions")}
        >
          <div className={selectedCurrency?.flagClass} />
          <div className="description">Preferred Currency</div>
          
        </div>

        <div className="toggleOption">
          <FaCoins />
          <div className="description">Single currency display</div> 
          <ToggleSwitch isOn={isOn} onToggle={handleToggle} />
        </div>
        <div className="option" onClick={handleLogout}>
          <TbLogout2 className="icon" />
          <div className="description">Log out</div>
        </div>
      </div>
      <div className="info">
        <div className="appName">Buqs</div>
        <div className="version">{version}</div>
      </div>
      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
      />
    </StyledSettingsMenu>
  );
}
