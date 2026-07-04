import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledScrollableMenuButtons } from './ScrollableMenuButtons.styled';
import MostRecentSection from '../MostRecentSection/MostRecentSection';
import TreeAdjustedContainer from '@/components/TreeAdjustedContainer/TreeAdjustedContainer';
import { TreeItemBuilderForHomeAndGroups } from '@/components/TreeItemBuilderForHomeAndGroups';
import { TiGroup } from 'react-icons/ti';
import OptionButton from '../SelectionButton/SelectionButton';
import { BsBarChartFill } from 'react-icons/bs';
import { BsFillPiggyBankFill } from 'react-icons/bs';
import { BsFillPersonFill } from 'react-icons/bs';
import { BudgetCarousel } from './BudgetCarousel/BudgetCarousel';
import { useSetShowBudgetInfo } from '@/api/auth/CommandHooks/useSetShowBudgetInfo';
import { useState } from 'react';
export default function ScrollableMenuButtons({ mostRecentGroupDataIsFetching, mostRecentGroupData, recentContextId, nonGroupGroupedTransactions, userInfo, navigate, isLoading, isFetching, groupsData, totalBalances, topMenuTitle, activeBudgetData, showBudgetInfo, }) {
    const { mutateAsync: setShowBudgetInfo } = useSetShowBudgetInfo();
    const [showButton, setShowButton] = useState(false);
    return (_jsxs(StyledScrollableMenuButtons, { children: [showBudgetInfo && activeBudgetData && (_jsx(BudgetCarousel, { activeBudgetData: activeBudgetData, setShowBudgetInfo: setShowBudgetInfo, setShowButton: setShowButton, onClick: () => navigate('/budget/manage', { state: { fromHome: true } }) })), activeBudgetData && !showBudgetInfo && showButton && (_jsx("div", { className: "undoButton", children: _jsx("span", { className: "text", onClick: () => {
                        setShowBudgetInfo(true);
                    }, children: "undo" }) })), _jsx(MostRecentSection, { mostRecentGroupDataIsFetching: mostRecentGroupDataIsFetching, mostRecentGroupData: mostRecentGroupData, recentContextId: recentContextId, nonGroupGroupedTransactions: nonGroupGroupedTransactions, userInfo: userInfo, navigate: navigate }), !isLoading && !isFetching && groupsData?.groupCount === 0 ? (_jsx(OptionButton, { onClick: () => navigate('/shared'), name: "Shared", description: "Keep track of your shared finances", hasArrow: false, children: _jsx(TiGroup, { className: "groupIcon" }) })) : (_jsx(TreeAdjustedContainer, { hasOption: false, optionname: "chevron-forward-outline", onClick: () => navigate('/shared'), items: TreeItemBuilderForHomeAndGroups(totalBalances), children: _jsxs("div", { className: "groups", children: [_jsx("div", { className: "groupIconAndNumberOfGroups", children: _jsx(TiGroup, { className: "groupIcon" }) }), _jsx("div", { className: "groupName", children: "Shared" })] }) })), _jsx(OptionButton, { name: "Personal", description: "Your personal expense tracker", hasArrow: false, onClick: () => {
                    topMenuTitle.value = 'Your Expenses';
                    navigate('/personal');
                }, children: _jsx(BsFillPersonFill, { className: "personalIcon" }) }), _jsx(OptionButton, { name: "Analytics", description: "View your spending trends", onClick: () => navigate('/analytics'), hasArrow: false, children: _jsx(BsBarChartFill, { className: "analyticsIcon" }) }), _jsx(OptionButton, { name: "Budgeting", description: "Set up budgets, spending caps and savings goals", onClick: () => navigate('/budget'), hasArrow: false, children: _jsx(BsFillPiggyBankFill, { className: "budgetIcon" }) })] }));
}
