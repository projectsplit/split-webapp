import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import MyButton from '@/components/MyButton/MyButton';
import { StyledManageBudgets } from './ManageBudgets.styled';
import TopBarWithBackButton from '@/components/TopBarWithBackButton/TopBarWithBackButton';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import ProgressBar from '../ProgressBar/ProgressBar';
import { BudgetInfoMessage } from '@/components/BudgetMessages/BudgetInfoMessage';
import { useTheme } from 'styled-components';
import useBudgetInfo from '@/api/auth/QueryHooks/useBudgetInfo';
import { InactiveBudget } from '../InactiveBudget/InactiveBudget';
import { useState } from 'react';
import { Shimmer } from '@/components/Animations/Shimmer/Shimmer';
import useGetInactiveBudgetInfo from '@/api/auth/QueryHooks/useGetInactiveBudgetInfo';
import Spinner from '@/components/Spinner/Spinner';
import ManageBudgetAnimation from '@/components/Animations/BudgetAnimations/ManageBudgetAnimation';
import { useSignal } from '@preact/signals-react';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import DeleteBudgetConfirmationAnimation from '@/components/Animations/BudgetAnimations/DeleteBudgetConfirmationAnimation';
import { useDeleteBudget } from '@/api/auth/CommandHooks/useDeleteBudget';
export const ManageBudgets = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const menu = useSignal(null);
    const { userInfo } = useOutletContext();
    const timeZoneId = userInfo?.timeZone;
    const { data: activeBudgetData, isFetching: activeBudgetsIsFetching } = useBudgetInfo();
    const { data: inactiveBudgetsData, isFetching: inactiveBudgetsIsFetching } = useGetInactiveBudgetInfo();
    const errorMessage = useSignal('');
    const { mutate: deleteBudget, isPending } = useDeleteBudget(menu, errorMessage);
    const noSubmissions = !activeBudgetData &&
        (!inactiveBudgetsData ||
            (inactiveBudgetsData && inactiveBudgetsData.budgets.length == 0));
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [activeToggleIsOn, setActiveToggleIsOn] = useState(true);
    const [lastActiveId, setLastActiveId] = useState(activeBudgetData?.id);
    if (activeBudgetData?.id) {
        if (activeBudgetData.id !== lastActiveId) {
            setLastActiveId(activeBudgetData.id);
            setActiveToggleIsOn(true);
        }
    }
    else if (lastActiveId !== undefined) {
        setLastActiveId(undefined);
    }
    return (_jsxs(StyledManageBudgets, { children: [_jsx(TopBarWithBackButton, { header: "Manage Budgets", onClick: () => {
                    if (location.state?.fromHome) {
                        navigate('/');
                    }
                    else {
                        navigate(`/budget/actions`);
                    }
                } }), _jsx("div", { className: "messageContainer", children: activeBudgetsIsFetching ? (_jsx(Shimmer, { height: "70px" })) : (_jsx("div", { style: { transition: 'opacity 0.8s ease' }, children: BudgetInfoMessage(theme, false, activeBudgetData, noSubmissions) })) }), _jsx("div", { className: "scrollContainer", children: activeBudgetsIsFetching || inactiveBudgetsIsFetching ? (_jsx("div", { className: "spinnerContainer", children: _jsx(Spinner, {}) })) : (_jsxs(_Fragment, { children: [activeBudgetData?.id && (_jsx("div", { className: "activeInfo", onClick: () => {
                                setSelectedBudget(activeBudgetData);
                            }, children: _jsx(ProgressBar, { data: activeBudgetData, isOn: activeToggleIsOn, setIsOn: setActiveToggleIsOn, menu: menu, timeZoneId: timeZoneId }) })), inactiveBudgetsData?.budgets && (_jsx(_Fragment, { children: inactiveBudgetsData.budgets.map((budget) => (_jsx("div", { className: "inactiveInfo", onClick: () => {
                                    setSelectedBudget(budget);
                                }, children: _jsx(InactiveBudget, { budget: budget, onActivate: () => setActiveToggleIsOn(false), menu: menu, timeZoneId: timeZoneId }) }, budget.id))) }))] })) }), _jsx("div", { className: "submitButton", children: noSubmissions ? (_jsx(MyButton, { fontSize: "16", onClick: () => navigate('/budget/create'), isLoading: false, children: "Create" })) : (_jsx(MyButton, { fontSize: "16", onClick: () => navigate('/'), isLoading: false, children: "Done" })) }), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(ManageBudgetAnimation, { menu: menu, selectedBudget: selectedBudget }), _jsx(DeleteBudgetConfirmationAnimation, { menu: menu, deleteBudget: deleteBudget, selectedBudget: {
                    id: selectedBudget?.id || '',
                    descr: selectedBudget?.description || '',
                }, isLoading: isPending })] }));
};
