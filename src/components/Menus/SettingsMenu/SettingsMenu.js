import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { StyledSettingsMenu } from './SettingsMenu.styled';
import { IoClose, IoInformationCircleOutline } from 'react-icons/io5';
import { StyledUserOptionsButton } from '../../UserOptionsButton/UserOptionsButton.styled';
import { useNavigate } from 'react-router-dom';
import Separator from '../../Separator/Separator';
import { TbLogout2 } from 'react-icons/tb';
import packackageJson from '../../../../package.json';
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
import { FaUserPen } from 'react-icons/fa6';
import { useSetShowBudgetInfo } from '@/api/auth/CommandHooks/useSetShowBudgetInfo';
import { useSetPushNotificationsEnabled } from '@/api/auth/CommandHooks/useSetPushNotificationsEnabled';
import { isPushSupported, subscribeToPush, } from '@/helpers/pushNotifications';
import { IoNotificationsOutline } from 'react-icons/io5';
export default function SettingsMenu({ menu, nodeRef, userInfo, }) {
    const version = packackageJson.version;
    const allTimeZones = timeZones;
    const currencyMenu = useSignal(null);
    const timeZoneMenu = useSignal(null);
    const editUsernameMenu = useSignal(null);
    const queryClient = useQueryClient();
    const userCurrency = userInfo?.currency;
    const timeZone = userInfo?.timeZone;
    const updatedUserCurrency = useSelectedCurrency();
    const updateTimeZone = useTimeZone();
    const handldeCurrencyOptionsClick = (curr) => {
        updatedUserCurrency.mutate(curr);
        currencyMenu.value = null;
    };
    const handldeTimeZoneOptionsClick = (timeZone) => {
        updateTimeZone.mutate(timeZone);
        timeZoneMenu.value = null;
    };
    const navigate = useNavigate();
    const logOutMutation = useMutation({
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
        logOutMutation.mutate();
        navigate(routes.AUTH);
    };
    const { mutateAsync: setShowBudgetInfo } = useSetShowBudgetInfo();
    const { mutate: setPushNotificationsEnabled } = useSetPushNotificationsEnabled();
    const [pushWarning, setPushWarning] = useState(null);
    const handlePushToggle = async () => {
        setPushWarning(null);
        if (userInfo?.pushNotificationsEnabled) {
            setPushNotificationsEnabled(false);
            return;
        }
        if (!isPushSupported()) {
            setPushWarning('Push notifications are not supported on this device.');
            return;
        }
        try {
            const subscribed = await subscribeToPush();
            if (subscribed) {
                setPushNotificationsEnabled(true);
            }
            else {
                setPushWarning('Notifications are blocked. Allow notifications for Buqs in your device settings.');
            }
        }
        catch (error) {
            console.error('Failed to enable push notifications:', error);
            setPushWarning('Something went wrong while enabling notifications.');
        }
    };
    const allCurrencies = useSignal(currencyData);
    const selectedCurrency = allCurrencies.value.find((c) => c.symbol === userCurrency);
    const selectedTimeZone = allTimeZones.find((t) => t === timeZone);
    const handleToggle = () => {
        setShowBudgetInfo(!userInfo?.showBudgetInfo);
    };
    return (_jsxs(StyledSettingsMenu, { ref: nodeRef, children: [' ', _jsxs("div", { className: "headerWrapper", children: [_jsxs("div", { className: "header", children: [_jsx(StyledUserOptionsButton, { children: getInitials(userInfo?.username) }), _jsx("div", { className: "name", children: userInfo?.username }), _jsx("div", { className: "closeButtonContainer", onClick: () => (menu.value = null), children: _jsx(IoClose, { className: "closeButton" }) })] }), _jsx(Separator, {})] }), _jsxs("div", { className: "optionsContainer", children: [_jsxs("div", { className: "option", onClick: () => (currencyMenu.value = 'currencyOptions'), children: [_jsx("div", { className: selectedCurrency?.flagClass }), _jsx("div", { className: "description", children: "Preferred Currency" })] }), _jsxs("div", { className: "option", onClick: () => (timeZoneMenu.value = 'timeZones'), children: [_jsx(RiTimeZoneLine, { className: "icon" }), _jsxs("div", { className: "description", children: ["TimeZone (", selectedTimeZone, ")"] })] }), _jsxs("div", { className: "toggleOption", children: [_jsx(IoInformationCircleOutline, { className: "icon" }), _jsx("div", { className: "description", children: "Show budget info" }), _jsx(ToggleSwitch, { isOn: userInfo?.showBudgetInfo, onToggle: handleToggle })] }), _jsxs("div", { className: "toggleOption", children: [_jsx(IoNotificationsOutline, { className: "icon" }), _jsx("div", { className: "description", children: "Push notifications" }), _jsx(ToggleSwitch, { isOn: !!userInfo?.pushNotificationsEnabled, onToggle: handlePushToggle })] }), pushWarning && _jsx("div", { className: "pushWarning", children: pushWarning }), _jsxs("div", { className: "option", onClick: () => (editUsernameMenu.value = 'editUsername'), children: [_jsx(FaUserPen, { className: "icon" }), _jsx("div", { className: "description", children: "Change username" })] }), _jsxs("div", { className: "option", onClick: handleLogout, children: [_jsx(TbLogout2, { className: "icon" }), _jsx("div", { className: "description", children: "Log out" })] })] }), _jsxs("div", { className: "info", children: [_jsx("div", { className: "appName", children: "Buqs" }), _jsx("div", { className: "version", children: version })] }), _jsx(MenuAnimationBackground, { menu: currencyMenu }), _jsx(MenuAnimationBackground, { menu: timeZoneMenu }), _jsx(MenuAnimationBackground, { menu: editUsernameMenu }), _jsx(TimeZoneOptionsAnimation, { timeZoneMenu: timeZoneMenu, clickHandler: handldeTimeZoneOptionsClick, userInfo: userInfo }), _jsx(CurrencyOptionsAnimation, { currencyMenu: currencyMenu, clickHandler: handldeCurrencyOptionsClick, selectedCurrency: userCurrency }), _jsx(EditUsernameAnimation, { editUsernameMenu: editUsernameMenu, existingUsername: userInfo?.username })] }));
}
