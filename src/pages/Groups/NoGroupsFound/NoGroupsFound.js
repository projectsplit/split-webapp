import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { MdOutlineGroupOff } from 'react-icons/md';
import { GoArchive } from 'react-icons/go';
export default function NoGroupsFound({ activeGroupCatAsState, filteredGroups, keyword, }) {
    return (_jsx(_Fragment, { children: activeGroupCatAsState.value === 'Active' &&
            filteredGroups?.length === 0 &&
            keyword.length !== 0 ? (_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "No active groups found based on current search \uD83E\uDD14" }), _jsx(FaMagnifyingGlass, { className: "icon" })] })) : activeGroupCatAsState.value === 'Active' &&
            filteredGroups?.length === 0 ? (_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "There are currently no active groups " }), _jsx(MdOutlineGroupOff, { className: "icon" })] })) : activeGroupCatAsState.value === 'Archived' &&
            filteredGroups?.length === 0 &&
            keyword.length !== 0 ? (_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "No archived groups found based on current search \uD83E\uDD14" }), _jsx(FaMagnifyingGlass, { className: "icon" })] })) : activeGroupCatAsState.value === 'Archived' &&
            filteredGroups?.length === 0 ? (_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "There are currently no archived groups" }), _jsx(GoArchive, { className: "icon" })] })) : null }));
}
