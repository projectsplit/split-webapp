import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useOutletContext } from 'react-router-dom';
import { useSignal } from '@preact/signals-react';
import CreateGroupAnimation from '../../components/Animations/CreateGroupAnimation';
import { useEffect, useRef, useState } from 'react';
import { useMostRecentContext } from '../../api/auth/CommandHooks/useMostRecentContext';
import { StyledGroups } from './GroupTypes/Groups.styled';
import TreeAdjustedContainer from '../../components/TreeAdjustedContainer/TreeAdjustedContainer';
import Sentinel from '../../components/Sentinel';
import { TreeItemBuilderForHomeAndGroups } from '../../components/TreeItemBuilderForHomeAndGroups';
import BottomMainMenu from '../../components/Menus/BottomMainMenu/BottomMainMenu';
import ConfirmUnArchiveGroupAnimation from '../../components/Animations/ConfirmUnArchiveGroupAnimation';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import Spinner from '../../components/Spinner/Spinner';
import { StyledSharedContainer } from './SharedContainer.styled';
import Separator from '../../components/Separator/Separator';
import VerticalSeparator from '../../components/VerticalSeparator/VerticalSeparator';
import GroupSearchBarAnimation from '../../components/Animations/GroupSearchBarAnimation';
import useDebounce from '@/hooks/useDebounce';
import NoGroupsFound from './NoGroupsFound/NoGroupsFound';
import OptionsButtons from './OptionsButtons/OptionsButtons';
import { Mode } from '@/types';
import { computeNetPerCurrency } from '@/helpers/computeNetPerCurrency';
import { useGroupsList } from './hooks/useGroupList';
import { useFetchAndGroupNonGroupDebts } from './hooks/useFetchAndGroupNonGroupDebts';
export default function Shared() {
    const menu = useSignal(null);
    const currencyMenu = useSignal(null);
    const groupIdClicked = useSignal('');
    const showSearchBar = useSignal(false);
    const searchBarRef = useRef(null);
    const generalRef = useRef(null);
    const [keyword, setKeyword] = useState('');
    const [debouncedKeyword] = useDebounce(keyword.length > 1 ? keyword : '', 400);
    const { topMenuTitle, activeGroupCatAsState, openGroupOptionsMenu, userInfo, } = useOutletContext();
    const mode = activeGroupCatAsState.value === 'NonGroup' ? Mode.NonGroup : Mode.Group;
    const navigate = useNavigate();
    const pageSize = 10;
    const { filteredGroups, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading: isLoadingGroups, } = useGroupsList(pageSize, debouncedKeyword, activeGroupCatAsState);
    const { groupedTransactions, isFetchingDebts } = useFetchAndGroupNonGroupDebts(userInfo?.userId || '', mode);
    useEffect(() => {
        if (!showSearchBar.value)
            return;
        const handleClickOutside = (e) => {
            if (searchBarRef.current &&
                !searchBarRef.current.contains(e.target) &&
                generalRef.current &&
                !generalRef.current.contains(e.target)) {
                showSearchBar.value = false;
                setKeyword('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showSearchBar.value]);
    useEffect(() => {
        topMenuTitle.value = 'Shared';
    }, [activeGroupCatAsState.value]);
    const updateMostRecentContextId = useMostRecentContext();
    const onGroupClickHandler = (id, groupName) => {
        navigate(`/shared/${id}/expenses`, { state: { groupName } });
        updateMostRecentContextId.mutate(id);
    };
    const onNonGroupClickHandler = () => {
        navigate(`/shared/nongroup/expenses`);
        updateMostRecentContextId.mutate('NON_GROUP');
    };
    const onIconClick = (e, groupId, isGroupArchived) => {
        if (!isGroupArchived) {
            e.stopPropagation();
            navigate(`/shared/generatecode/${groupId}`);
        }
        else {
            e.stopPropagation();
            groupIdClicked.value = groupId;
            menu.value = 'unarchiveGroup';
        }
    };
    return (_jsxs(StyledSharedContainer, { "$groupState": activeGroupCatAsState.value, children: [_jsx(Separator, {}), _jsxs("div", { className: "optionButtonsAndGroups", children: [_jsx(OptionsButtons, { activeGroupCatAsState: activeGroupCatAsState, generalRef: generalRef, setKeyword: setKeyword, showSearchBar: showSearchBar }), _jsx(VerticalSeparator, {}), _jsxs(StyledGroups, { children: [_jsx(GroupSearchBarAnimation, { showSearchBar: showSearchBar, searchBarRef: searchBarRef, keyword: keyword, setKeyword: setKeyword }), isLoadingGroups || (isFetchingDebts && activeGroupCatAsState.value === 'NonGroup') ? (_jsx(Spinner, {})) : (_jsxs("div", { className: "groups", children: [_jsx(NoGroupsFound, { activeGroupCatAsState: activeGroupCatAsState, filteredGroups: filteredGroups, keyword: keyword }), filteredGroups?.map((g) => (_jsx("div", { children: _jsx(TreeAdjustedContainer, { onClick: () => onGroupClickHandler(g.id, g.name), hasOption: true, optionname: activeGroupCatAsState.value === 'Archived'
                                                ? 'arrow-undo-outline'
                                                : 'qr-code', iconfontsize: 30, right: 0.8, items: TreeItemBuilderForHomeAndGroups(g?.details), "$optionColor": activeGroupCatAsState.value === 'Archived'
                                                ? '#D79244'
                                                : '', onIconClick: (e) => onIconClick(e, g.id, activeGroupCatAsState.value === 'Archived'), children: _jsx("div", { className: "groupName", children: g.name }) }) }, g.id))), activeGroupCatAsState.value === 'NonGroup' && (_jsx(TreeAdjustedContainer, { onClick: () => onNonGroupClickHandler(), hasOption: true, items: TreeItemBuilderForHomeAndGroups(computeNetPerCurrency(groupedTransactions, userInfo.userId || '')), optionname: 'chevron-forward-outline', children: _jsx("div", { className: "groupName", children: "Non Group Transactions" }) })), _jsx(Sentinel, { fetchPage: fetchNextPage, hasMore: hasNextPage, isFetchingPage: isFetchingNextPage })] }))] })] }), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(BottomMainMenu, { onClick: () => (menu.value = 'createGroup'), onGroupSearchClick: () => {
                    activeGroupCatAsState.value !== 'NonGroup'
                        ? (showSearchBar.value = true)
                        : null;
                }, bottomBarRef: generalRef }), _jsx(CreateGroupAnimation, { menu: menu, currencyMenu: currencyMenu }), _jsx(ConfirmUnArchiveGroupAnimation, { menu: menu, groupId: groupIdClicked.value, openGroupOptionsMenu: openGroupOptionsMenu, navigateToGroups: true })] }));
}
