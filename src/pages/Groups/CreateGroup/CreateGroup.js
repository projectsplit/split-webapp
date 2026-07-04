import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { StyledCreateGroup } from './CreateGroup.styled';
import { IoClose } from 'react-icons/io5';
import { FaAngleDown } from 'react-icons/fa';
import MenuAnimationBackground from '../../../components/Animations/MenuAnimationBackground';
import { useSignal } from '@preact/signals-react';
import { currencyData } from '../../../helpers/openExchangeRates';
import { useOutletContext } from 'react-router-dom';
import CurrencyOptionsAnimation from '../../../components/Animations/CurrencyOptionsAnimation';
import MyButton from '../../../components/MyButton/MyButton';
import FormInput from '../../../components/FormInput/FormInput';
import { useCreateGroup } from '@/api/auth/CommandHooks/useCreateGroup';
import InviteUsersToNewGroupAnimation from '@/components/Animations/InviteUsersToNewGroupAnimation';
import { useMostRecentContext } from '@/api/auth/CommandHooks/useMostRecentContext';
export default function CreateGroup({ menu, currencyMenu, nodeRef, }) {
    const inviteUsersMenu = useSignal(null); //CHANGE HERE
    const [groupName, setGroupName] = useState('');
    const { userInfo } = useOutletContext();
    const userCurrency = userInfo?.currency;
    const [currencySymbol, setCurrencySymbol] = useState(userCurrency);
    const allCurrencies = useSignal(currencyData);
    const newGroup = useSignal({
        groupName: '',
        groupId: '',
    });
    const selectedCurrency = allCurrencies.value.find((c) => c.symbol === currencySymbol);
    const { mutate: createGroup, isPending } = useCreateGroup();
    const updateMostRecentContextId = useMostRecentContext();
    const onClickHandler = () => {
        createGroup({ name: groupName, currency: currencySymbol }, {
            onSuccess: (data) => {
                updateMostRecentContextId.mutate(data.groupId);
                newGroup.value = { groupName, groupId: data.groupId };
                inviteUsersMenu.value = 'inviteUsersToNewGroup';
            },
        });
    };
    const handldeCurrencyOptionsClick = (curr) => {
        setCurrencySymbol(curr);
        currencyMenu.value = null;
    };
    return (_jsxs(StyledCreateGroup, { ref: nodeRef, children: [_jsxs("div", { className: "header", children: [_jsx("div", { className: "gap" }), _jsx("div", { className: "title", children: "Create New Group" }), _jsx("div", { className: "closeButtonContainer", onClick: () => (menu.value = null), children: _jsx(IoClose, { className: "closeButton" }) })] }), _jsxs("div", { className: "inputAndCurrWrapper", children: [_jsx("div", { className: "formInputWrapper", children: _jsx(FormInput, { placeholder: "Group Name", value: groupName, onChange: (e) => setGroupName(e.target.value) }) }), _jsx("div", { className: "currencySelectorWrapper", children: _jsxs("div", { className: "currencySelector", onClick: () => (currencyMenu.value = 'currencyOptions'), children: [_jsx("div", { className: selectedCurrency?.flagClass }), _jsx("div", { children: selectedCurrency?.symbol }), _jsx(FaAngleDown, { className: "angleDown" })] }) })] }), _jsx("div", { className: "submitButton", children: _jsx(MyButton, { disabled: groupName.trim() === '' ? true : false, onClick: onClickHandler, isLoading: isPending, fontSize: "16", children: "Create Group" }) }), _jsx(MenuAnimationBackground, { menu: currencyMenu }), _jsx(MenuAnimationBackground, { menu: inviteUsersMenu }), _jsx(CurrencyOptionsAnimation, { currencyMenu: currencyMenu, clickHandler: handldeCurrencyOptionsClick, selectedCurrency: currencySymbol }), _jsx(InviteUsersToNewGroupAnimation, { menu: inviteUsersMenu, newGroup: newGroup })] }));
}
