import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { StyledRenameGroupMenu } from './RenameGroupMenu.styled';
import MyButton from '../../MyButton/MyButton';
import Separator from '../../Separator/Separator';
import IonIcon from '@reacticons/ionicons';
import { useUpdateGroupName } from '../../../api/auth/CommandHooks/useUpdateGroupName';
import { useSignal } from '@preact/signals-react';
export default function RenameGroupMenu({ menu, groupId, groupName, }) {
    const changeNameError = useSignal('');
    const [newGroupName, setNewGroupName] = useState(groupName || '');
    const { mutate: updategroupName, isPending } = useUpdateGroupName(groupId, changeNameError, menu);
    const handleSubmitNewGroupName = () => {
        updategroupName(newGroupName);
    };
    return (_jsx(StyledRenameGroupMenu, { children: changeNameError.value !== '' ? (_jsx("div", { className: "errorWrapper", children: _jsxs("div", { className: "errorMessage", children: [_jsx("div", { className: "closeButton", onClick: () => (menu.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) }), _jsx("span", { className: "exclamation", children: "\u2757" }), _jsx("span", { className: "error", children: changeNameError })] }) })) : (_jsxs(_Fragment, { children: [_jsxs("div", { className: "headerSeparator", children: [_jsxs("div", { className: "header", children: [_jsx("input", { className: "input", value: newGroupName, onChange: (e) => setNewGroupName(e.target.value), autoFocus: true }), _jsx("div", { className: "closeButton", onClick: () => (menu.value = null), children: _jsx(IonIcon, { name: "close-outline", className: "close" }) })] }), _jsx("div", { className: "separator", children: _jsx(Separator, {}) })] }), _jsxs("div", { className: "buttons", children: [_jsx(MyButton, { isLoading: isPending, onClick: handleSubmitNewGroupName, children: "Confirm" }), _jsx(MyButton, { variant: "secondary", onClick: () => (menu.value = null), children: "Cancel" })] })] })) }));
}
