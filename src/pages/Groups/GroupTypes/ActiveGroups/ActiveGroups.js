import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledGroups } from '../Groups.styled';
import { useNavigate } from 'react-router-dom';
import TreeAdjustedContainer from '../../../../components/TreeAdjustedContainer/TreeAdjustedContainer';
import Spinner from '../../../../components/Spinner/Spinner';
import { useMostRecentContext } from '../../../../api/auth/CommandHooks/useMostRecentContext';
import { TreeItemBuilderForHomeAndGroups } from '../../../../components/TreeItemBuilderForHomeAndGroups';
import Sentinel from '../../../../components/Sentinel';
import { MdOutlineGroupOff } from 'react-icons/md';
import { useGetTotalsActiveGroups } from '@/api/auth/QueryHooks/useGetTotalsActiveGroups';
export default function ActiveGroups() {
    const navigate = useNavigate();
    const pageSize = 10;
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useGetTotalsActiveGroups(pageSize);
    const groups = data?.pages.flatMap((p) => p.groups);
    const updateMostRecentGroupId = useMostRecentContext();
    const onGroupClickHandler = (id, groupName) => {
        navigate(`/shared/active/${id}/expenses`, { state: { groupName } });
        updateMostRecentGroupId.mutate(id);
    };
    return (_jsx(StyledGroups, { children: isFetching && !isFetchingNextPage ? (_jsx(Spinner, {})) : (_jsxs("div", { className: "groups", children: [groups?.length === 0 ? (_jsxs("div", { className: "noData", children: [_jsx("div", { className: "msg", children: "There are currently no active groups" }), _jsx(MdOutlineGroupOff, { className: "icon" })] })) : (''), groups?.map((g) => (_jsx("div", { children: _jsx(TreeAdjustedContainer, { onClick: () => onGroupClickHandler(g.id, g.name), hasOption: false, optionname: 'settings-outline', iconfontsize: 30, right: 0.8, items: TreeItemBuilderForHomeAndGroups(g?.details), children: _jsx("div", { className: "groupName", children: g.name }) }) }, g.id))), _jsx(Sentinel, { fetchPage: fetchNextPage, hasMore: hasNextPage, isFetchingPage: isFetchingNextPage })] })) }));
}
