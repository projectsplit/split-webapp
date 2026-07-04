import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useNavigate, useOutletContext } from 'react-router-dom';
import Confirmation from './Confirmation';
import { useArchiveGroup } from '../../../api/auth/CommandHooks/useArchiveGroup';
import { useSignal } from '@preact/signals-react';
export default function ConfirmArchiveGroup({ menu, groupId, openGroupOptionsMenu, navigateToGroups, }) {
    const noGroupFoundError = useSignal('');
    const navigate = useNavigate();
    const { activeGroupCatAsState } = useOutletContext();
    const { mutate: archiveGroup, isPending } = useArchiveGroup(groupId, noGroupFoundError, menu);
    // const handleConfirm = () => {
    //   archiveGroup(true, {
    //     onSuccess: () => {
    //       if (navigateToGroups) {
    //         openGroupOptionsMenu.value = false;
    //         navigate('/shared');
    //         activeGroupCatAsState.value = 'Archived';
    //       }
    //     },
    //   });
    // };
    const handleConfirm = () => {
        archiveGroup(true);
        if (navigateToGroups && isPending === false) {
            openGroupOptionsMenu.value = false;
            activeGroupCatAsState.value = 'Archived';
            // navigate('/shared');
        }
    };
    return (_jsx(Confirmation, { menu: menu, isLoading: isPending, onClick: handleConfirm, header: 'Confirmation', children: _jsxs("div", { className: "archiveGroupText", children: [_jsxs("span", { children: ["Are you sure you want to archive this group? Once archived, members won\u2019t be able to add, edit, or delete expenses and transfers.", ' '] }), _jsx("span", { children: " You can always un-archive the group later if needed. " }), _jsx("span", { className: "handshake", children: "\uD83E\uDD1D" })] }) }));
}
