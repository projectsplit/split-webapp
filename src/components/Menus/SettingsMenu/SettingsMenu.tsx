import { useState } from 'react';
import { StyledSettingsMenu } from './SettingsMenu.styled';
import PropertyList, { PropertyRow } from '../../ListForms/PropertyList';
import SectionLabel from '../../SectionLabel/SectionLabel';
import { useGetRecurringExpenses } from '@/api/auth/QueryHooks/useGetRecurringExpenses';
import { SettingsMenuProps } from '../../../interfaces';
import { IoClose } from 'react-icons/io5';
import IonIcon from '@reacticons/ionicons';
import MyButton from '../../MyButton/MyButton';
import { StyledUserOptionsButton } from '../../UserOptionsButton/UserOptionsButton.styled';
import { useNavigate } from 'react-router-dom';
import packackageJson from '../../../../package.json';
import MenuAnimationBackground from '../../Animations/MenuAnimationBackground';
import CurrencyOptionsAnimation from '../../Animations/CurrencyOptionsAnimation';
import { useSignal } from '@preact/signals-react';
import { getSymbolFromCurrency } from '../../../helpers/currency-symbol-map';
import ToggleSwitch from '../../ToggleSwitch/ToggleSwitch';
import { logOut } from '../../../api/auth/api';
import routes from '../../../routes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelectedCurrency } from '../../../api/auth/CommandHooks/useSelectedCurrency';
import TimeZoneOptionsAnimation from '../../Animations/TimeZoneOptionsAnimation';
import { useTimeZone } from '../../../api/auth/CommandHooks/useTimeZone';
import { getInitials } from '../../../helpers/getInitials';
import { timeZones } from '../../../helpers/timeZones';
import EditUsernameAnimation from '../../Animations/EditUsernameAnimation';
import EditEmailAnimation from '../../Animations/EditEmailAnimation';
import { useSetShowBudgetInfo } from '@/api/auth/CommandHooks/useSetShowBudgetInfo';
import { useSetPushNotificationsEnabled } from '@/api/auth/CommandHooks/useSetPushNotificationsEnabled';
import {
  isPushSupported,
  PushSubscribeFailure,
  unsubscribeFromPush,
} from '../../../helpers/pushNotifications';
import Spinner from '../../Spinner/Spinner';
import CurrencyFlag from '../../CurrencyFlag/CurrencyFlag';

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
    meta: { errorHandled: true },
    mutationFn: logOut,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('submittedFromHomePersistData');
      queryClient.invalidateQueries();
      queryClient.removeQueries();
      navigate(routes.AUTH);
    },
    onError: (error) => {
      console.error('Log out failed:', error.message);
    },
  });

  const handleLogout = async () => {
    try {
      await unsubscribeFromPush();
    } catch (error) {
      console.error('Failed to remove push subscription on logout:', error);
    }

    logOutMutation.mutate();
    navigate(routes.AUTH);
  };

  const {mutateAsync:setShowBudgetInfo} = useSetShowBudgetInfo();

  const selectedTimeZone = allTimeZones.find((t: string) => t === timeZone);

  const handleToggle = () => {
    setShowBudgetInfo(!userInfo?.showBudgetInfo);
  };

  const { mutate: setPushEnabled, isPending: isPushPending } =
    useSetPushNotificationsEnabled();

  const [pushError, setPushError] = useState<string | null>(null);

  const { data: recurringData } = useGetRecurringExpenses();
  const recurringCount = recurringData?.recurringExpenses?.length ?? 0;

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
      <div className="header">
        <StyledUserOptionsButton onClick={() => (menu.value = null)}>
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

      <div className="optionsContainer">
        <div className="section">
          <SectionLabel title="Account" />
          <PropertyList>
            <PropertyRow
              label="Username"
              onClick={() => (editUsernameMenu.value = 'editUsername')}
            >
              <span className="rowValue">
                <span className="rowText">{userInfo?.username}</span>
                <IonIcon name="chevron-forward-outline" className="rowChevron" />
              </span>
            </PropertyRow>
            <PropertyRow
              label="Email"
              onClick={() => (editEmailMenu.value = 'editEmail')}
            >
              <span className="rowValue">
                <span className="rowText">{userInfo?.email ?? 'Not set'}</span>
                <IonIcon name="chevron-forward-outline" className="rowChevron" />
              </span>
            </PropertyRow>
            <PropertyRow label="Verification">
              {!userInfo ? (
                <Spinner fontSize="1rem" />
              ) : (
                <span
                  className={`status ${
                    userInfo.email && userInfo.emailVerified ? 'ok' : 'pending'
                  }`}
                >
                  {userInfo.email && userInfo.emailVerified ? (
                    <IonIcon name="checkmark-outline" />
                  ) : null}
                  {userInfo.email
                    ? userInfo.emailVerified
                      ? 'Verified'
                      : 'Unverified'
                    : 'Not set'}
                </span>
              )}
            </PropertyRow>
          </PropertyList>
        </div>

        <div className="section">
          <SectionLabel title="Preferences" />
          <PropertyList>
            <PropertyRow
              label="Preferred currency"
              onClick={() => (currencyMenu.value = 'currencyOptions')}
            >
              <span className="rowValue">
                <CurrencyFlag code={userCurrency} />
                <span className="rowText mono">
                  {userCurrency} {getSymbolFromCurrency(userCurrency ?? '')}
                </span>
                <IonIcon name="chevron-forward-outline" className="rowChevron" />
              </span>
            </PropertyRow>
            <PropertyRow
              label="Time zone"
              onClick={() => (timeZoneMenu.value = 'timeZones')}
            >
              <span className="rowValue">
                <span className="rowText">{selectedTimeZone}</span>
                <IonIcon name="chevron-forward-outline" className="rowChevron" />
              </span>
            </PropertyRow>
            <PropertyRow className="toggleRow" label="Show budget info">
              <ToggleSwitch
                isOn={userInfo?.showBudgetInfo}
                onToggle={handleToggle}
              />
            </PropertyRow>
            {isPushSupported() ? (
              <PropertyRow className="toggleRow" label="Push notifications">
                <ToggleSwitch
                  isOn={userInfo?.pushNotificationsEnabled}
                  onToggle={isPushPending ? () => {} : handlePushToggle}
                />
              </PropertyRow>
            ) : null}
          </PropertyList>
          {pushError ? <div className="optionNote">{pushError}</div> : null}
        </div>

        <div className="section">
          <PropertyList>
            <PropertyRow
              action
              label="Recurring expenses"
              onClick={() => {
                menu.value = null;
                navigate('/recurring-expenses');
              }}
            >
              <span className="rowValue">
                <span className="rowCount">{recurringCount}</span>
                <IonIcon name="chevron-forward-outline" className="rowChevron" />
              </span>
            </PropertyRow>
          </PropertyList>
        </div>

        <div className="logOut">
          <MyButton variant="secondary" fontSize="15" onClick={handleLogout}>
            Log out
          </MyButton>
        </div>

        <div className="info">
          <div className="appName">Buqs</div>
          <div className="version">{version}</div>
        </div>
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
