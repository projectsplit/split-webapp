import { useState } from 'react';
import { StyledSettingsMenu } from './SettingsMenu.styled';
import { SettingsMenuProps } from '../../../interfaces';
import {
  IoClose,
  IoInformationCircleOutline,
  IoNotificationsOutline,
} from 'react-icons/io5';
import { StyledUserOptionsButton } from '../../UserOptionsButton/UserOptionsButton.styled';
import { useNavigate } from 'react-router-dom';
import { Currency } from '../../../types';
import Separator from '../../Separator/Separator';
import { TbLogout2 } from 'react-icons/tb';
import packackageJson from '../../../../package.json';
import { FaCoins } from 'react-icons/fa';
import MenuAnimationBackground from '../../Animations/MenuAnimationBackground';
import CurrencyOptionsAnimation from '../../Animations/CurrencyOptionsAnimation';
import { useSignal } from '@preact/signals-react';
import { currencyData } from '../../../helpers/openExchangeRates';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';
import { logOut } from '../../../api/auth/api';
import routes from '../../../routes';
import { useIsFetching, useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelectedCurrency } from '../../../api/auth/CommandHooks/useSelectedCurrency';
import { RiTimeZoneLine } from 'react-icons/ri';
import TimeZoneOptionsAnimation from '../../Animations/TimeZoneOptionsAnimation';
import { useTimeZone } from '../../../api/auth/CommandHooks/useTimeZone';
import { getInitials } from '../../../helpers/getInitials';
import { timeZones } from '../../../helpers/timeZones';
import EditUsernameAnimation from '../../Animations/EditUsernameAnimation';
import EditEmailAnimation from '../../Animations/EditEmailAnimation';
import { FaUserPen } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { useSetShowBudgetInfo } from '@/api/auth/CommandHooks/useSetShowBudgetInfo';
import { useSetPushNotificationsEnabled } from '@/api/auth/CommandHooks/useSetPushNotificationsEnabled';
import {
  isPushSupported,
  unsubscribeFromPush,
} from '../../../helpers/pushNotifications';
import Spinner from '../../Spinner/Spinner';

export default function SettingsMenu({
  menu,
  nodeRef,
  userInfo,
}: SettingsMenuProps) {
  const version = packackageJson.version;
  const allTimeZones = timeZones;
  const currencyMenu = useSignal<string | null>(null);
  const timeZoneMenu = useSignal<string | null>(null);
  const editUsernameMenu = useSignal<string | null>(null);
  const editEmailMenu = useSignal<string | null>(null);

  const queryClient = useQueryClient();

  const isUserInfoFetching = useIsFetching({ queryKey: ['getMe'] }) > 0;

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
      localStorage.removeItem('accessToken');
      localStorage.removeItem('submittedFromHomePersistData');
      queryClient.invalidateQueries();
      queryClient.removeQueries();
      navigate(routes.AUTH);
    },
    onError: (error) => {
      console.error('Log out failed:', error.message);
    },
  });

  const handleLogout = async () => {
    // Detach this device before the session goes away: the call needs the current token, and a row
    // left behind stays bound to this account while the browser passes to whoever signs in next,
    // delivering this account's notifications to them. Never block logout if it fails.
    try {
      await unsubscribeFromPush();
    } catch (error) {
      console.error('Failed to remove push subscription on logout:', error);
    }

    logOutMutation.mutate();
    navigate(routes.AUTH);
  };

  const {mutateAsync:setShowBudgetInfo} = useSetShowBudgetInfo();

  const allCurrencies = useSignal<Currency[]>(currencyData);

  const selectedCurrency = allCurrencies.value.find(
    (c) => c.symbol === userCurrency
  );
  const selectedTimeZone = allTimeZones.find((t: string) => t === timeZone);

  const handleToggle = () => {
    setShowBudgetInfo(!userInfo?.showBudgetInfo);
  };

  const { mutate: setPushEnabled, isPending: isPushPending } =
    useSetPushNotificationsEnabled();

  const handlePushToggle = () => {
    setPushEnabled(!userInfo?.pushNotificationsEnabled);
  };

  return (
    <StyledSettingsMenu ref={nodeRef}>
      {' '}
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
          onClick={() => (currencyMenu.value = 'currencyOptions')}
        >
          <div className={selectedCurrency?.flagClass} />
          <div className="description">Preferred Currency</div>
        </div>
        <div
          className="option"
          onClick={() => (timeZoneMenu.value = 'timeZones')}
        >
          <RiTimeZoneLine className="icon" />
          <div className="description">TimeZone ({selectedTimeZone})</div>
        </div>

        {/* <div className="toggleOption">
          <FaCoins />
          <div className="description">Single currency display</div>
          <ToggleSwitch isOn={isOn} onToggle={handleToggle} />
        </div> */}

        <div className="toggleOption">
          <IoInformationCircleOutline className="icon" />
          <div className="description">Show budget info</div>
          <ToggleSwitch isOn={userInfo?.showBudgetInfo} onToggle={handleToggle} />
        </div>

        {/* Hidden rather than disabled where the browser has no push support at all —
            an inert switch reads as a bug. */}
        {isPushSupported() && (
          <div className="toggleOption">
            <IoNotificationsOutline className="icon" />
            <div className="description">Push notifications</div>
            <ToggleSwitch
              isOn={userInfo?.pushNotificationsEnabled}
              onToggle={isPushPending ? () => {} : handlePushToggle}
            />
          </div>
        )}

        <div
          className="option"
          onClick={() => (editUsernameMenu.value = 'editUsername')}
        >
          <FaUserPen className="icon" />
          <div className="description">Change username</div>
        </div>

        <div
          className="option"
          onClick={() => (editEmailMenu.value = 'editEmail')}
        >
          <MdOutlineEmail className="icon" />
          <div className="description emailDescription">
            <span>Email</span>
            {isUserInfoFetching ? (
              <Spinner fontSize="1rem" />
            ) : (
              <span>
                {userInfo?.email
                  ? userInfo.emailVerified
                    ? '(Verified)'
                    : '(Unverified)'
                  : '(Not set)'}
              </span>
            )}
          </div>
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
      <MenuAnimationBackground menu={editUsernameMenu} />
      <MenuAnimationBackground menu={editEmailMenu} />
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
      <EditUsernameAnimation
        editUsernameMenu={editUsernameMenu}
        existingUsername={userInfo?.username}
      />
      <EditEmailAnimation
        editEmailMenu={editEmailMenu}
        existingEmail={userInfo?.email}
        emailVerified={userInfo?.emailVerified}
      />
    </StyledSettingsMenu>
  );
}
