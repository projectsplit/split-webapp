import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { IoClose, IoExit, IoPersonAdd, IoPersonRemove, IoQrCode, } from 'react-icons/io5';
import { StyledGroupOptions } from './GroupOptions.styled';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import Separator from '../../../components/Separator/Separator';
import MenuAnimationBackground from '../../../components/Animations/MenuAnimationBackground';
import CurrencyOptionsAnimation from '../../../components/Animations/CurrencyOptionsAnimation';
import { currencyData } from '../../../helpers/openExchangeRates';
import { MdEdit } from 'react-icons/md';
import { FaArchive } from 'react-icons/fa';
import ConfirmArchiveGroupAnimation from '../../../components/Animations/ConfirmArchiveGroupAnimation';
import ConfirmLeaveGroupAnimation from '../../../components/Animations/ConfirmLeaveGroupAnimation';
import RenameGroupAnimationAnimation from '../../../components/Animations/RenameGroupAnimation';
import { useChangeGroupCurrency } from '../../../api/auth/CommandHooks/useChangeGroupCurrency';
import { useQueryClient } from '@tanstack/react-query';
import RemoveUserFromGroupMenu from '../../../components/Menus/RemoveUserFromGroupMenu/RemoveUserFromGroupMenu';
import { useEffect } from 'react';
import AddNewUserAnimation from '../../../components/Animations/AddNewUserAnimation';
export default function GroupOptions({ group }) {
    const navigate = useNavigate();
    const { userInfo, openGroupOptionsMenu } = useOutletContext();
    const queryClient = useQueryClient();
    const refetchQueries = useSignal(false);
    const groupCurrency = group?.currency || '';
    const groupName = group?.name;
    const currencyMenu = useSignal(null);
    const archiveGroupMenu = useSignal(null);
    const leaveGroupMenu = useSignal(null);
    const newUserMenu = useSignal(null);
    const renameMenu = useSignal(null);
    const noGroupFoundError = useSignal('');
    const allCurrencies = useSignal(currencyData);
    const openRemoveUserMenu = useSignal(false);
    const selectedCurrency = allCurrencies.value.find((c) => c.symbol === groupCurrency);
    const members = group?.members;
    const userMemberId = members?.find((m) => m.userId === userInfo?.userId)?.id;
    const updateGroupCurrency = useChangeGroupCurrency(group?.id, noGroupFoundError, refetchQueries);
    const handldeCurrencyOptionsClick = (curr) => {
        currencyMenu.value = null;
        updateGroupCurrency.mutate(curr);
    };
    const handleClose = async () => {
        openGroupOptionsMenu.value = false;
        if (refetchQueries.value) {
            try {
                await queryClient.invalidateQueries({
                    queryKey: [group?.id],
                    exact: false,
                });
                await queryClient.invalidateQueries({
                    queryKey: ['shared'],
                    exact: false,
                });
                await queryClient.invalidateQueries({
                    queryKey: ['mostRecentGroup'],
                    exact: false,
                });
            }
            catch (error) {
                console.error('Error refetching queries:', error);
            }
        }
    };
    useEffect(() => {
        const handleBackNavigation = () => {
            if (openGroupOptionsMenu.value) {
                handleClose();
            }
        };
        window.addEventListener('popstate', handleBackNavigation);
        return () => {
            window.removeEventListener('popstate', handleBackNavigation);
        };
    }, [openGroupOptionsMenu]);
    return (_jsxs(StyledGroupOptions, { children: [' ', _jsxs("div", { className: "headerWrapper", children: [_jsxs("div", { className: "header", children: [_jsx("div", { className: "gap" }), _jsx("div", { className: "title", children: groupName }), _jsx("div", { className: "closeButtonContainer", onClick: handleClose, children: _jsx(IoClose, { className: "closeButton" }) })] }), _jsx(Separator, {})] }), _jsxs("div", { className: "optionsContainer", children: [_jsxs("div", { className: "option", onClick: () => (currencyMenu.value = 'currencyOptions'), children: [_jsx("div", { className: selectedCurrency?.flagClass }), _jsx("div", { className: "description", children: "Group Base Currency" })] }), _jsxs("div", { className: "option", onClick: () => (renameMenu.value = 'renameGroup'), children: [_jsx(MdEdit, { className: "icon" }), _jsx("div", { className: "description", children: "Edit Group Name " })] }), _jsxs("div", { className: "option", onClick: () => (archiveGroupMenu.value = 'archiveGroup'), children: [_jsx(FaArchive, { className: "icon" }), _jsx("div", { className: "description", children: "Archive Group " })] }), _jsxs("div", { className: "option", onClick: () => (newUserMenu.value = 'newUser'), children: [_jsx(IoPersonAdd, { className: "icon" }), _jsx("div", { className: "description", children: "New User " })] }), _jsxs("div", { className: "option", onClick: () => (openRemoveUserMenu.value = true), children: [_jsx(IoPersonRemove, { className: "icon" }), _jsx("div", { className: "description", children: "Remove Member " })] }), _jsxs("div", { className: "option", onClick: () => {
                            const searchParams = new URLSearchParams(location.search);
                            searchParams.set('in', 'true');
                            navigate(`/shared/generatecode/${group?.id}?${searchParams.toString()}`, {
                                replace: true,
                            });
                        }, children: [_jsx(IoQrCode, { className: "icon" }), _jsx("div", { className: "description", children: "Share Group " })] }), _jsxs("div", { className: "option-leave", onClick: () => (leaveGroupMenu.value = 'leaveGroup'), children: [_jsx(IoExit, { className: "icon-exit" }), _jsx("div", { className: "description", children: "Leave Group " })] })] }), _jsx(MenuAnimationBackground, { menu: currencyMenu }), _jsx(MenuAnimationBackground, { menu: archiveGroupMenu }), _jsx(MenuAnimationBackground, { menu: leaveGroupMenu }), _jsx(MenuAnimationBackground, { menu: renameMenu }), _jsx(MenuAnimationBackground, { menu: newUserMenu }), _jsx(CurrencyOptionsAnimation, { currencyMenu: currencyMenu, clickHandler: handldeCurrencyOptionsClick, selectedCurrency: groupCurrency }), _jsx(ConfirmArchiveGroupAnimation, { menu: archiveGroupMenu, groupId: group?.id, openGroupOptionsMenu: openGroupOptionsMenu, navigateToGroups: true }), _jsx(ConfirmLeaveGroupAnimation, { menu: leaveGroupMenu, groupId: group?.id, memberId: userMemberId, openGroupOptionsMenu: openGroupOptionsMenu }), _jsx(RenameGroupAnimationAnimation, { menu: renameMenu, groupId: group?.id, groupName: group?.name }), openRemoveUserMenu.value && (_jsx(RemoveUserFromGroupMenu, { groupId: group?.id, openRemoveUserMenu: openRemoveUserMenu, userInfo: userInfo })), group && _jsx(AddNewUserAnimation, { menu: newUserMenu })] }));
}
