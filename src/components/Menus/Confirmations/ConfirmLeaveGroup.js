import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import Confirmation from './Confirmation';
import { useSignal } from '@preact/signals-react';
import { useLeaveGroup } from '../../../api/auth/CommandHooks/useLeaveGroup';
import { useMostRecentContext } from '../../../api/auth/CommandHooks/useMostRecentContext';
export default function ConfirmLeaveGroup({ menu, groupId, openGroupOptionsMenu, }) {
    const groupError = useSignal('');
    const noMemberError = useSignal('');
    const navigate = useNavigate();
    const { mutate: leaveGroupMutation, isPending } = useLeaveGroup(menu, groupId, groupError, navigate, openGroupOptionsMenu);
    useMostRecentContext();
    const handleConfirm = () => {
        if (groupError.value === '') {
            leaveGroupMutation();
        }
        else {
            openGroupOptionsMenu.value = false;
        }
    };
    return (_jsx(Confirmation, { menu: menu, isLoading: isPending, onClick: handleConfirm, header: groupError.value === '' ? 'Confirmation' : 'Info', children: _jsx("div", { className: "leaveGroupText", children: groupError.value === '' && noMemberError.value === '' ? (_jsxs("span", { children: ["Are you sure you want to leave this group?", ' ', _jsx("span", { style: { fontSize: '20px' }, children: "\uD83E\uDD14" })] })) : groupError.value !== '' ? (_jsx("span", { children: groupError.value })) : (_jsx("span", { children: "Something went wrong. Please try again." })) }) }));
}
