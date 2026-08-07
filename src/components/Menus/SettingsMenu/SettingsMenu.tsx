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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelectedCurrency } from '../../../api/auth/CommandHooks/useSelectedCurrency';
import { RiTimeZoneLine } from 'react-icons/ri';
import TimeZoneOptionsAnimation from '../../Animations/TimeZoneOptionsAnimation';
import { useTimeZone } from '../../../api/auth/CommandHooks/useTimeZone';
import { getInitials } from '../../../helpers/getInitials';
import { timeZones } from '../../../helpers/timeZones';
import EditUsernameAnimation from '../../Animations/EditUsernameAnimation';
import EditEmailAnimation from '../../Animations/EditEmailAnimation';
import { FaRepeat, FaUserPen } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';
import { useSetShowBudgetInfo } from '@/api/auth/CommandHooks/useSetShowBudgetInfo';
import { useSetPushNotificationsEnabled } from '@/api/auth/CommandHooks/useSetPushNotificationsEnabled';
import { useGetDonationPrompt } from '@/api/auth/QueryHooks/useGetDonationPrompt';
import SupportMenuAnimation from '../../Animations/SupportMenuAnimation';
import { FaRegHeart } from 'react-icons/fa6';
import {
  isPushSupported,
  PushSubscribeFailure,
  unsubscribeFromPush,
} from '../../../helpers/pushNotifications';
import Spinner from '../../Spinner/Spinner';

const pushFailureMessages: Record<PushSubscribeFailure, string> = {
  unsupported: 'This browser cannot receive push notifications.',
  'permission-denied':
    'Notifications are blocked for this site. Allow them in your browser settings, then try again.',
  'permission-dismissed':
    'The permission prompt was dismissed. Try again and choose Allow.',
  'not-configured': 'Push notifications are not available on this server.',
  failed: 'Could not register this device. Please try again.',
};

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
  const supportMenu = useSignal<string | null>(null);

  // Only fetched to know whether donations are configured at all. An instance with no Stripe
  // credentials should not show an entry that can only lead to a dead end.
  const { data: donationInfo } = useGetDonationPrompt(true);

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

  const [pushError, setPushError] = useState<string | null>(null);

  const handlePushToggle = () => {
    setPushError(null);

    setPushEnabled(!userInfo?.pushNotificationsEnabled, {
      onSuccess: (result) =>
        setPushError(
          result.failure ? pushFailureMessages[result.failure] : null
        ),
      onError: () =>
        setPushError('Could not update this setting. Please try again.'),
    });
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
          <>
            <div className="toggleOption">
              <IoNotificationsOutline className="icon" />
              <div className="description">Push notifications</div>
              <ToggleSwitch
                isOn={userInfo?.pushNotificationsEnabled}
                onToggle={isPushPending ? () => {} : handlePushToggle}
              />
            </div>
            {pushError && <div className="optionNote">{pushError}</div>}
          </>
        )}

        {/* Always listed. Hiding it when there is nothing to manage made the entry appear and
            disappear as a side effect of unrelated actions, and left no way in to a list that is
            about to have something in it. The page states when it is empty instead. */}
        <div
          className="option"
          onClick={() => {
            menu.value = null;
            navigate('/recurring-expenses');
          }}
        >
          <FaRepeat className="icon" />
          <div className="description">Manage recurring expenses</div>
        </div>

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
            {/* Only while there is genuinely nothing to show. Keying this off any in-flight
                getMe made the status blink to a spinner on every background refetch — the 60s
                poll, and every unrelated setting that invalidates the query, the push toggle
                included. */}
            {!userInfo ? (
              <Spinner fontSize="1rem" />
            ) : (
              <span>
                {userInfo.email
                  ? userInfo.emailVerified
                    ? '(Verified)'
                    : '(Unverified)'
                  : '(Not set)'}
              </span>
            )}
          </div>
        </div>

        {/* Hidden only when the server has no Stripe credentials, so an instance that cannot take
            money does not offer to. Otherwise always here, including for someone who turned the
            prompt off — declining to be asked is not declining to give. */}
        {donationInfo?.isAvailable && (
          <div
            className="option"
            onClick={() => (supportMenu.value = 'support')}
          >
            <FaRegHeart className="icon" />
            <div className="description">Support Buqs</div>
          </div>
        )}

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
      <MenuAnimationBackground menu={supportMenu} />
      <SupportMenuAnimation supportMenu={supportMenu} />
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
