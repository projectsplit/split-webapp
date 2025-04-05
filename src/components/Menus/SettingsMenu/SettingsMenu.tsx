import { useState } from "react";
import { StyledSettingsMenu } from "./SettingsMenu.styled";
import { SettingsMenuProps } from "../../../interfaces";
import { IoClose } from "react-icons/io5";
import { StyledUserOptionsButton } from "../../UserOptionsButton/UserOptionsButton.styled";
import { useNavigate } from "react-router-dom";
import { Currency } from "../../../types";
import Separator from "../../Separator/Separator";
import { TbLogout2 } from "react-icons/tb";
import packackageJson from "../../../../package.json";
import { FaCoins } from "react-icons/fa";
import MenuAnimationBackground from "../MenuAnimations/MenuAnimationBackground";
import CurrencyOptionsAnimation from "../MenuAnimations/CurrencyOptionsAnimation";
import { useSignal } from "@preact/signals-react";
import { currencyData } from "../../../helpers/openExchangeRates";
import ToggleSwitch from "../../ToggleSwitch/ToggleSwitch";
import { logOut } from "../../../api/auth/api";
import routes from "../../../routes";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelectedCurrency } from "../../../api/services/useSelectedCurrency";
import { RiTimeZoneLine } from "react-icons/ri";
import TimeZoneOptionsAnimation from "../MenuAnimations/TimeZoneOptionsAnimation";
import { useTimeZone } from "../../../api/services/useTimeZone";
import { getInitials } from "../../../helpers/getInitials";
import { timeZones } from "../../../helpers/timeZones";

export default function SettingsMenu({
  menu,
  nodeRef,
  userInfo,
}: SettingsMenuProps) {
  const version = packackageJson.version;
  const allTimeZones = timeZones;
  const currencyMenu = useSignal<string | null>(null);
  const timeZoneMenu = useSignal<string | null>(null);

  const queryClient = useQueryClient();

  const userCurrency = userInfo?.currency;
  const timeZone = userInfo?.timeZone;

  const updatedUserCurrency = useSelectedCurrency();
  const updateTimeZone = useTimeZone();

  const handldeCurrencyOptionsClick = (curr: string) => {
    updatedUserCurrency.mutate(curr);
    currencyMenu.value = null;
  };

  const handldeTimeZoneOptionsClick = (timeZone: string) => {
    updateTimeZone.mutate(timeZone);
    timeZoneMenu.value = null;
  };

  const navigate = useNavigate();

  const logOutMutation = useMutation<any, Error, void>({
    mutationFn: logOut,
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      queryClient.invalidateQueries();
      queryClient.removeQueries();
      navigate(routes.AUTH);
    },
    onError: (error) => {
      console.error("Log out failed:", error.message);
    },
  });

  const handleLogout = async () => {
    logOutMutation.mutate();
    navigate(routes.AUTH);
  };

  const allCurrencies = useSignal<Currency[]>(currencyData);

  const selectedCurrency = allCurrencies.value.find(
    (c) => c.symbol === userCurrency
  );
  const selectedTimeZone = allTimeZones.find((t: string) => t === timeZone);

  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn((prev) => !prev);
  };

  return (
    <StyledSettingsMenu ref={nodeRef}>
      {" "}
      <div className="headerWrapper">
        <div className="header">
          <StyledUserOptionsButton>
            {getInitials(userInfo?.username)}
          </StyledUserOptionsButton>
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
          <div
            className={
              selectedCurrency?.flagClass
            }
          />
          <div className="description">Preferred Currency</div>
        </div>

        <div
          className="option"
          onClick={() => (timeZoneMenu.value = "timeZones")}
        >
          <RiTimeZoneLine className="icon" />
          <div className="description">TimeZone ({selectedTimeZone})</div>
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
      <MenuAnimationBackground menu={timeZoneMenu} />
      <TimeZoneOptionsAnimation
        timeZoneMenu={timeZoneMenu}
        clickHandler={handldeTimeZoneOptionsClick}
        userInfo={userInfo}
      />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        clickHandler={handldeCurrencyOptionsClick}
        selectedCurrency={userCurrency}
      />
    </StyledSettingsMenu>
  );
}
