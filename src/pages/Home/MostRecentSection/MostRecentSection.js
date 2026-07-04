import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Shimmer } from '@/components/Animations/Shimmer/Shimmer';
import TreeAdjustedContainer from '@/components/TreeAdjustedContainer/TreeAdjustedContainer';
import { TreeItemBuilderForHomeAndGroups } from '@/components/TreeItemBuilderForHomeAndGroups';
import { computeNetPerCurrency } from '@/helpers/computeNetPerCurrency';
import { StyledMostRecentSection } from './MostRecentSection.styled';
export default function MostRecentSection({ mostRecentGroupDataIsFetching, mostRecentGroupData, recentContextId, nonGroupGroupedTransactions, userInfo, navigate, }) {
    if (mostRecentGroupDataIsFetching) {
        return (_jsxs(StyledMostRecentSection, { children: [_jsx(Shimmer, { width: "70px", height: "12px", borderRadius: "4px" }), _jsx(Shimmer, { width: "100%", height: "60px", borderRadius: "10px" })] }));
    }
    if (mostRecentGroupData) {
        return (_jsxs(StyledMostRecentSection, { children: [_jsx("div", { className: "mostRecentMsg", children: "Most recent" }), _jsx(TreeAdjustedContainer, { onClick: () => navigate(`/shared/${mostRecentGroupData.id}`), hasOption: true, optionname: "chevron-forward-outline", items: TreeItemBuilderForHomeAndGroups(mostRecentGroupData?.details), children: _jsx("div", { className: "groupName", children: mostRecentGroupData?.name }) })] }));
    }
    if (recentContextId === 'NON_GROUP') {
        return (_jsxs(StyledMostRecentSection, { children: [_jsx("div", { className: "mostRecentMsg", children: "Most recent" }), _jsx(TreeAdjustedContainer, { onClick: () => navigate('/shared/nongroup/expenses'), hasOption: true, optionname: "chevron-forward-outline", items: TreeItemBuilderForHomeAndGroups(computeNetPerCurrency(nonGroupGroupedTransactions, userInfo.userId || '')), children: _jsx("div", { className: "groupName", children: "Non Group Transactions" }) })] }));
    }
    return null;
}
