import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledTransferForm } from './TransferForm.styled';
import { useEffect } from 'react';
import { signal, useSignal } from '@preact/signals-react';
import { DateTime } from '../DateTime';
import MyButton from '../MyButton/MyButton';
import MenuAnimationBackground from '../Animations/MenuAnimationBackground';
import CurrencyOptionsAnimation from '../Animations/CurrencyOptionsAnimation';
import { useNavigate, useOutletContext } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import DateDisplay from '../ExpenseForm/components/DateDisplay/DateDisplay';
import { useTransferActions, useTransferData, } from './hooks/useTransferFormStore';
import { Header } from './Header/Header';
import { InputAndErrorsWrapper } from './InputAndErrorsWrapper/InputAndErrorsWrapper';
import { NonGroupMenu } from './NonGroupMenu/NonGroupMenu';
import { GroupMenu } from './GroupMenu/GroupMenu';
import { useTransferFormLogic } from './hooks/useTransferFormLogic';
export default function TransferForm({ groupMembers, nonGroupUsers, currency, timeZoneId, menu, fromHomeGroup, groupId, isnonGroupTransfer, nonGroupMenu, fromHome, }) {
    const { userInfo } = useOutletContext();
    const isSubmitting = useSignal(false);
    const navigate = useNavigate();
    const displayedAmount = useSignal('');
    const currencyMenu = useSignal(null);
    const isDateShowing = useSignal(false);
    const data = useTransferData();
    const actions = useTransferActions();
    useEffect(() => {
        if (userInfo?.userId) {
            actions.initForm(currency, userInfo.userId, !!isnonGroupTransfer?.value);
        }
    }, [userInfo?.userId, currency, isnonGroupTransfer?.value, actions]);
    const { handleInputBlur, handleCurrencyOptionsClick, submitTransfer, userMemberId, noReceiverSelected, sortedMembers, idError, isPendingCreateTransfer, } = useTransferFormLogic({
        userInfo,
        groupId,
        groupMembers,
        menu,
        nonGroupUsers,
        isnonGroupTransfer,
        nonGroupMenu,
        fromHomeGroup,
        navigate,
        isSubmitting,
        displayedAmount,
        currencyMenu,
        data,
        actions,
    });
    return (_jsxs(StyledTransferForm, { "$inputError": data.errors.showIdError, "$noReceiverSelected": noReceiverSelected, "$isSamePersonError": data.errors.showSamePersonError, children: [' ', _jsx(Header, { menu: menu }), _jsx(InputAndErrorsWrapper, { currencyMenu: currencyMenu, displayedAmount: displayedAmount, data: data, actions: actions, handleInputBlur: handleInputBlur }), isnonGroupTransfer &&
                isnonGroupTransfer.value &&
                nonGroupMenu &&
                fromHomeGroup?.value === null ? (_jsx(NonGroupMenu, { "$noReceiverSelected": noReceiverSelected, "$isSamePersonError": data.errors.showSamePersonError, data: data, actions: actions, fromHome: fromHome, nonGroupMenu: nonGroupMenu })) : (_jsx(GroupMenu, { fromHomeGroup: fromHomeGroup, isnonGroupTransfer: isnonGroupTransfer, idError: idError, data: data, actions: actions, userMemberId: userMemberId, sortedMembers: sortedMembers })), _jsx(FormInput, { description: "", placeholder: "Description", value: data.description, onChange: (e) => actions.setDescription(e.target.value) }), isDateShowing.value && (_jsx(DateDisplay, { selectedDateTime: data.transferTime, timeZoneId: timeZoneId, setTime: actions.setTransferTime, isDateShowing: isDateShowing, setShowPicker: actions.setShowPicker })), _jsx("div", { className: "spacer" }), _jsxs("div", { className: "bottomButtons", children: [_jsx("div", { className: "submitButton", children: _jsx(MyButton, { fontSize: "16", onClick: submitTransfer, isLoading: isPendingCreateTransfer, children: "Submit" }) }), _jsx(DateTime, { selectedDateTime: data.transferTime, setSelectedDateTime: actions.setTransferTime, timeZoneId: timeZoneId, isEdit: false, category: signal('Transfers'), isDateShowing: isDateShowing, showPicker: data.showPicker, setShowPicker: actions.setShowPicker })] }), _jsx(MenuAnimationBackground, { menu: currencyMenu }), _jsx(CurrencyOptionsAnimation, { currencyMenu: currencyMenu, clickHandler: handleCurrencyOptionsClick, selectedCurrency: data.currencySymbol })] }));
}
