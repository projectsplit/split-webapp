import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GoArchive } from 'react-icons/go';
import { StyledGroups } from '../Groups.styled';
import Spinner from '../../../../components/Spinner/Spinner';
import TreeAdjustedContainer from '../../../../components/TreeAdjustedContainer/TreeAdjustedContainer';
import { TreeItemBuilderForHomeAndGroups } from '../../../../components/TreeItemBuilderForHomeAndGroups';
import Sentinel from '../../../../components/Sentinel';
import { useSignal } from '@preact/signals-react';
import { useGetTotalsArchiveGroups } from '@/api/auth/QueryHooks/useGetTotalsArchivedGroups';
export default function ArchivedGroups() {
    const pageSize = 10;
    const menu = useSignal(null);
    const groupId = useSignal('');
    const openGroupOptionsMenu = useSignal(true);
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetTotalsArchiveGroups(pageSize);
    const groups = data?.pages.flatMap((p) => p.groups);
    const onGroupClickHandler = (id) => {
        menu.value = 'unarchiveGroup';
        groupId.value = id;
    };
    return (_jsx(StyledGroups, { children: isFetching && !isFetchingNextPage ? (_jsx(Spinner, {})) : (_jsxs("div", { className: "groups", children: [groups?.length === 0 ? (_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "There are currently no archived groups" }), _jsx(GoArchive, { className: "icon" })] })) : (''), groups?.map((g) => (_jsx("div", { children: _jsx(TreeAdjustedContainer, { onClick: () => onGroupClickHandler(g.id), hasOption: true, optionname: 'file-tray-full-outline', iconfontsize: 30, right: 0.8, items: TreeItemBuilderForHomeAndGroups(g?.details), "$optionColor": "#D79244", children: _jsx("div", { className: "groupName", children: g.name }) }) }, g.id))), _jsx(Sentinel, { fetchPage: fetchNextPage, hasMore: hasNextPage, isFetchingPage: isFetchingNextPage })] })) }));
}
