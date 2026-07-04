import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from 'react';
import { StyledScopeSelectionMenu } from './ScopeSelectionMenu.styled';
import { BiArrowBack } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { MdGroupOff } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';
import { BudgetScopeGroupsMenu } from '../BudgetScopeGroupsMenu/BudgetScopeGroupsMenu';
import { useSearchGroupsByName } from '@/api/auth/QueryHooks/useSearchGroupsByName';
import useDebounce from '@/hooks/useDebounce';
import { FaCheckCircle } from 'react-icons/fa';
export const ScopeSelectionMenu = ({ menu, scopeState, targetGroupIds, allGroupsSelected, }) => {
    const [openGroups, setOpenGroups] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [debouncedKeyword] = useDebounce(keyword.length > 1 ? keyword : '', 300);
    const groupButtonRef = useRef(null);
    const scopeRef = useRef(null);
    const footerRef = useRef(null);
    const pageSize = 10;
    const { data: userGroups, hasNextPage: hasNextGroupsPage } = useSearchGroupsByName(debouncedKeyword, pageSize);
    const flattenedGroups = userGroups?.pages.flatMap((x) => x.groups);
    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedFooter = footerRef.current?.contains(event.target);
            const clickedScope = scopeRef.current?.contains(event.target);
            const clickedGroupBtn = groupButtonRef.current?.contains(event.target);
            if (clickedFooter || (clickedScope && !clickedGroupBtn)) {
                setOpenGroups(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    useEffect(() => {
        if (targetGroupIds.value.length === 0) {
            scopeState.value = {
                ...scopeState.value,
                group: false,
                none: true,
            };
        }
        if (targetGroupIds.value.length > 0) {
            scopeState.value = {
                ...scopeState.value,
                group: true,
                none: false,
            };
        }
        if (allGroupsSelected.value) {
            scopeState.value = {
                ...scopeState.value,
                group: true,
                none: false,
            };
        }
    }, [targetGroupIds.value.length, allGroupsSelected.value]);
    return (_jsxs(StyledScopeSelectionMenu, { children: [_jsx("div", { className: "fixed-header-container", children: _jsxs("div", { className: "header", children: [_jsx("div", { className: "closeButtonContainer", onClick: () => (menu.value = null), children: _jsx(BiArrowBack, { className: "closeButton" }) }), _jsx("div", { className: "title", children: "Select scope" }), _jsx("div", { className: "gap" })] }) }), _jsxs("div", { className: "scopeOptions", ref: scopeRef, children: [_jsxs("div", { className: "buttonWrapper", children: [_jsxs("div", { className: `button ${scopeState.value.nonGroup ? 'active' : ''}`, onClick: () => {
                                    const newNonGroup = !scopeState.value.nonGroup;
                                    scopeState.value = {
                                        ...scopeState.value,
                                        nonGroup: newNonGroup,
                                        none: !newNonGroup &&
                                            !scopeState.value.group &&
                                            !scopeState.value.personal,
                                    };
                                }, children: [_jsx(MdGroupOff, { className: "groupIcon non" }), _jsxs("div", { className: "text-container", children: [_jsx("span", { className: "descr", children: "Non" }), _jsx("span", { className: "descr", children: "Groups" })] })] }), scopeState.value.nonGroup && _jsx(FaCheckCircle, { className: "checkIcon" })] }), _jsxs("div", { className: "wrapperAndPill", children: [_jsxs("div", { className: "groupsButtonWrapper ", children: [_jsxs("div", { className: `button ${scopeState.value.group ? 'active' : ''}`, onClick: () => {
                                            const newGroup = !scopeState.value.group;
                                            scopeState.value = {
                                                ...scopeState.value,
                                                group: newGroup,
                                                none: !newGroup &&
                                                    !scopeState.value.personal &&
                                                    !scopeState.value.nonGroup,
                                            };
                                            if (!newGroup) {
                                                targetGroupIds.value = [];
                                                allGroupsSelected.value = false;
                                            }
                                            else if (targetGroupIds.value.length === 0) {
                                                allGroupsSelected.value = true;
                                            }
                                        }, children: [_jsx(TiGroup, { className: "groupIcon active" }), _jsxs("div", { className: "text-container", children: [_jsx("span", { className: "descr", children: allGroupsSelected.value
                                                            ? 'All'
                                                            : targetGroupIds.value.length }), _jsx("span", { className: "descr", children: "Groups" })] })] }), scopeState.value.group && _jsx(FaCheckCircle, { className: "checkIcon" })] }), _jsx("div", { className: `pill ${openGroups ? 'open' : ''}`, ref: groupButtonRef, onClick: () => setOpenGroups(true), children: "select groups" })] }), _jsxs("div", { className: "buttonWrapper", children: [_jsxs("div", { className: `button ${scopeState.value.personal ? 'active' : ''}`, onClick: () => {
                                    const newPersonal = !scopeState.value.personal;
                                    scopeState.value = {
                                        ...scopeState.value,
                                        personal: newPersonal,
                                        none: !newPersonal &&
                                            !scopeState.value.group &&
                                            !scopeState.value.nonGroup,
                                    };
                                }, children: [_jsx(BsFillPersonFill, { className: "groupIcon archived" }), _jsx("div", { className: "text-container", children: _jsx("span", { className: "descr", children: "Personal" }) })] }), scopeState.value.personal && _jsx(FaCheckCircle, { className: "checkIcon" })] })] }), openGroups && (_jsx(BudgetScopeGroupsMenu, { targetGroupIds: targetGroupIds, setKeyword: setKeyword, keyword: keyword, flattenedGroups: flattenedGroups, allGroupsSelected: allGroupsSelected, hasNextGroupsPage: hasNextGroupsPage })), _jsx("div", { className: "footer", ref: footerRef })] }));
};
