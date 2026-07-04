import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useLocation, useNavigate, useOutletContext, useParams, } from 'react-router-dom';
import { StyledGroup } from './Group.styled';
import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import { useCategorySwipe } from '../../components/CategorySelector/useCategorySwipe';
import { signal, useSignal } from '@preact/signals-react';
import { Mode, } from '../../types';
import BottomMainMenu from '../../components/Menus/BottomMainMenu/BottomMainMenu';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import NewExpenseAnimation from '../../components/Animations/NewExpenseAnimation';
import GroupQuickActionsAnimation from '../../components/Animations/MenuWithOptionsToAddAnimation';
import useGroup from '../../api/auth/QueryHooks/useGroup';
import { useEffect } from 'react';
import NewTransferAnimation from '../../components/Animations/NewTransferAnimation';
import GroupOptions from '../Groups/GroupOptions/GroupOptions';
import ConfirmUnArchiveGroupAnimation from '../../components/Animations/ConfirmUnArchiveGroupAnimation';
import Spinner from '../../components/Spinner/Spinner';
import { AxiosError } from 'axios';
import GroupError from './GroupError';
import SearchTransactionsAnimation from '../../components/Animations/SearchTransactionsAnimation';
import { localStorageStringParser, getFilterStorageKey, } from '../../components/SearchTransactions/helpers/localStorageStringParser';
export default function Group() {
    const { groupid } = useParams();
    const menu = useSignal(null);
    const showBottomBar = useSignal(false);
    const groupError = useSignal();
    const selectedExpense = useSignal(null);
    const { expenseFilter, transferFilter } = localStorageStringParser(localStorage.getItem(getFilterStorageKey('expense', groupid)), localStorage.getItem(getFilterStorageKey('transfer', groupid)));
    const expenseParsedFilters = useSignal(expenseFilter);
    const transferParsedFilters = useSignal(transferFilter);
    const location = useLocation();
    const path = location.pathname.split('/').pop() || '';
    const navigate = useNavigate();
    const mode = Mode.Group;
    const { userInfo, topMenuTitle, openGroupOptionsMenu, groupIsArchived, confirmUnarchiveMenu, } = useOutletContext();
    const timeZoneId = userInfo?.timeZone;
    const timeZoneCoordinates = userInfo?.timeZoneCoordinates;
    const { data: group, isLoading, isFetching, isError, error } = useGroup(groupid);
    const categoryCategories = {
        cat1: 'Expenses',
        cat2: 'Transfers',
        cat3: 'Debts',
    };
    const swipeHandlers = useCategorySwipe({
        categories: categoryCategories,
        activeCat: path,
        navLinkUse: true,
    });
    useEffect(() => {
        if (!isFetching) {
            groupIsArchived.value = group?.isArchived || false;
        }
        return () => {
            groupIsArchived.value = false;
        };
    }, [group, isFetching, groupIsArchived.value]);
    useEffect(() => {
        topMenuTitle.value = group?.name || '';
    }, [group, showBottomBar.value]);
    useEffect(() => {
        if (isError && error) {
            groupError.value = {
                message: error.message,
                code: error instanceof AxiosError ? error.code : undefined,
                status: error instanceof AxiosError ? error.response?.status : undefined,
                config: error instanceof AxiosError ? error.config : undefined,
            };
        }
        else {
            groupError.value = undefined;
        }
    }, [isError, error]);
    useEffect(() => {
        if (isError &&
            groupError.value &&
            typeof groupError.value.status === 'number' &&
            groupError.value.status === 404) {
            navigate('/shared');
        }
    }, [isError, groupError.value, navigate]);
    return (_jsx(StyledGroup, { children: isLoading ? (_jsx("div", { className: "group", children: _jsx("div", { className: "spinner", children: _jsx(Spinner, {}) }) })) : isError ? (_jsx(GroupError, { groupError: groupError })) : (_jsxs("div", { className: "group", ...swipeHandlers, children: [_jsx(CategorySelector, { activeCat: path, categories: categoryCategories, navLinkUse: true }), _jsx(Outlet, { context: {
                        userInfo,
                        group,
                        showBottomBar,
                        expenseParsedFilters,
                        transferParsedFilters,
                        mode,
                    } }), openGroupOptionsMenu.value && _jsx(GroupOptions, { group: group }), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(MenuAnimationBackground, { menu: confirmUnarchiveMenu }), group && (_jsx(NewExpenseAnimation, { expense: null, groupId: group.id, timeZoneId: timeZoneId, menu: menu, selectedExpense: selectedExpense, timeZoneCoordinates: timeZoneCoordinates, isPersonal: signal(false), currency: group.currency, groupMembers: signal([...group.members, ...group.guests]), isnonGroupExpense: signal(false), nonGroupUsers: signal([]) })), group && (_jsx(NewTransferAnimation, { groupId: group.id, timeZoneId: timeZoneId, menu: menu, currency: group.currency, groupMembers: signal([...group.members, ...group.guests]), isnonGroupTransfer: signal(false), nonGroupUsers: signal([]) })), group && (_jsx(ConfirmUnArchiveGroupAnimation, { groupId: group.id, openGroupOptionsMenu: openGroupOptionsMenu, menu: confirmUnarchiveMenu, navigateToGroups: false })), _jsx(GroupQuickActionsAnimation, { menu: menu }), group && (_jsx(SearchTransactionsAnimation, { menu: menu, group: group, userInfo: userInfo, timeZoneId: timeZoneId, expenseParsedFilters: expenseParsedFilters, transferParsedFilters: transferParsedFilters })), _jsxs("div", { className: "bottomMenu", children: [' ', _jsx(BottomMainMenu, { group: group, menu: menu, onClick: () => {
                                if (group && !group.isArchived) {
                                    menu.value = 'quickActions';
                                }
                            } })] })] })) }));
}
