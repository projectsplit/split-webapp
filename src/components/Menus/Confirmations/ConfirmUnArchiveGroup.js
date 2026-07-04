import { jsx as _jsx } from "react/jsx-runtime";
import { useNavigate, useOutletContext } from 'react-router-dom';
import Confirmation from './Confirmation';
import { useArchiveGroup } from '../../../api/auth/CommandHooks/useArchiveGroup';
import { useSignal } from '@preact/signals-react';
export default function ConfirmUnArchiveGroup({ menu, groupId, openGroupOptionsMenu, navigateToGroups, }) {
    const noGroupFoundError = useSignal('');
    const navigate = useNavigate();
    const { activeGroupCatAsState, groupIsArchived } = useOutletContext();
    const { mutate: archiveGroup, isPending } = useArchiveGroup(groupId, noGroupFoundError, menu);
    const handleConfirm = () => {
        archiveGroup(false);
        openGroupOptionsMenu.value = false;
        activeGroupCatAsState.value = 'Active';
        if (navigateToGroups) {
            navigate('/shared');
        }
        groupIsArchived.value = false;
    };
    return (_jsx(Confirmation, { menu: menu, isLoading: isPending, onClick: handleConfirm, header: 'Confirmation', children: _jsx("div", { className: "archiveGroupText", children: _jsx("span", { children: "Would you like to un-archive this group? " }) }) }));
}
