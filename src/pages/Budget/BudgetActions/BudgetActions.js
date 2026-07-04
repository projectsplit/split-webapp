import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledBudgetActions } from './BudgetActions.styled';
import { useNavigate } from 'react-router-dom';
import OptionButton from '@/pages/Home/SelectionButton/SelectionButton';
import TopBarWithBackButton from '@/components/TopBarWithBackButton/TopBarWithBackButton';
export const BudgetActions = () => {
    const navigate = useNavigate();
    return (_jsxs(StyledBudgetActions, { children: [_jsx(TopBarWithBackButton, { header: "Budget ", onClick: () => {
                    navigate(`/`);
                } }), _jsxs("div", { className: "buttons", children: [_jsx(OptionButton, { onClick: () => navigate('/budget/create'), name: "Create New Budget", description: "", hasArrow: false, children: _jsx(_Fragment, {}) }), _jsx(OptionButton, { onClick: () => navigate('/budget/manage'), name: "Manage Budgets", description: "", hasArrow: false, children: _jsx(_Fragment, {}) })] })] }));
};
