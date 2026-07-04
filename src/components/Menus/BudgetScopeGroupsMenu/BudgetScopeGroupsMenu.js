import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect } from 'react';
import { StyledBudgetScopeGroupsMenu } from './BudgetScopeGroupsMenu.styled';
import { TiGroup } from 'react-icons/ti';
import { FaCheckCircle } from 'react-icons/fa';
import { IoIosArchive } from 'react-icons/io';
export const BudgetScopeGroupsMenu = ({ targetGroupIds, setKeyword, keyword, flattenedGroups, allGroupsSelected, hasNextGroupsPage, }) => {
    const handleInputChange = useCallback((e) => {
        setKeyword(e.target.value);
    }, []);
    useEffect(() => {
        if (keyword.length > 1) {
            allGroupsSelected.value = false;
        }
    }, [keyword]);
    const handleSuggestedGroupClick = useCallback((groupId) => {
        targetGroupIds.value.includes(groupId)
            ? (targetGroupIds.value = targetGroupIds.value.filter((id) => id !== groupId))
            : (targetGroupIds.value = [...targetGroupIds.value, groupId]);
        flattenedGroups?.length === targetGroupIds.value.length &&
            !hasNextGroupsPage
            ? (allGroupsSelected.value = true)
            : (allGroupsSelected.value = false);
    }, [targetGroupIds]);
    return (_jsxs(StyledBudgetScopeGroupsMenu, { "$maxHeight": "49vh", children: [_jsxs("div", { className: "headerAndSearchbar", children: [_jsx("input", { className: "searchBar", placeholder: "Search", onChange: handleInputChange, value: keyword }), flattenedGroups?.length !== 0 && (_jsxs("div", { className: `selectAll ${allGroupsSelected.value ? 'selected' : ''}`, onClick: () => {
                            setKeyword('');
                            allGroupsSelected.value = !allGroupsSelected.value;
                            targetGroupIds.value = [];
                        }, children: [' ', _jsx("span", { className: "text", children: "All" })] }))] }), ' ', flattenedGroups?.length === 0 && (_jsx("div", { className: "noResults", children: "No groups found" })), _jsxs("div", { className: "groupSection", children: [flattenedGroups?.map((group, index) => (_jsxs("div", { className: `groups ${targetGroupIds.value.includes(group.id) || allGroupsSelected.value ? 'selected' : ''}`, onClick: () => handleSuggestedGroupClick(group.id), children: [_jsx(TiGroup, { className: "groupIcon" }), _jsxs("div", { className: "groupNameAndArchivedStatus", children: [_jsxs("span", { children: [group.name, " "] }), group.isArchived && (_jsxs("div", { className: "archivedText", children: [' ', _jsx(IoIosArchive, { className: "archived" })] }))] }), (targetGroupIds.value.includes(group.id) ||
                                allGroupsSelected.value) && (_jsx(FaCheckCircle, { className: "checkIcon" }))] }, index))), ' '] })] }));
};
