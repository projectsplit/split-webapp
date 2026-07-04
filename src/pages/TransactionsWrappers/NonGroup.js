import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { signal, useSignal } from '@preact/signals-react';
import { useEffect } from 'react';
import { Outlet, useLocation, useOutletContext } from 'react-router-dom';
import { Mode, } from '../../types';
import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import { useCategorySwipe } from '../../components/CategorySelector/useCategorySwipe';
import MenuAnimationBackground from '../../components/Animations/MenuAnimationBackground';
import BottomMainMenu from '../../components/Menus/BottomMainMenu/BottomMainMenu';
import SearchTransactionsAnimation from '../../components/Animations/SearchTransactionsAnimation';
import GroupQuickActionsAnimation from '../../components/Animations/MenuWithOptionsToAddAnimation';
import NewExpenseAnimation from '../../components/Animations/NewExpenseAnimation';
import NewTransferAnimation from '../../components/Animations/NewTransferAnimation';
import { StyledGroup } from './Group.styled';
import NonGroupExpenseUsersAnimation from '../../components/Animations/NonGroupExpenseUsersAnimation';
import NonGroupTransferAnimation from '../../components/Animations/NonGroupTransferAnimation';
import { localStorageStringParser, getFilterStorageKey, } from '../../components/SearchTransactions/helpers/localStorageStringParser';
export default function NonGroup() {
    const menu = useSignal(null);
    const showBottomBar = useSignal(false);
    const selectedExpense = useSignal(null);
    const nonGroupMenu = useSignal(null);
    const nonGroupTransferMenu = useSignal({
        attribute: '',
        menu: null,
        senderId: '',
        senderName: '',
        receiverId: '',
        receiverName: '',
    });
    const { expenseFilter, transferFilter } = localStorageStringParser(localStorage.getItem(getFilterStorageKey('expense', undefined)), localStorage.getItem(getFilterStorageKey('transfer', undefined)));
    const expenseParsedFilters = useSignal(expenseFilter);
    const transferParsedFilters = useSignal(transferFilter);
    const location = useLocation();
    const path = location.pathname.split('/').pop() || '';
    const nonGroupUsers = useSignal([]);
    const { userInfo, topMenuTitle } = useOutletContext();
    const timeZoneId = userInfo?.timeZone;
    const timeZoneCoordinates = userInfo?.timeZoneCoordinates;
    const mode = Mode.NonGroup;
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
        topMenuTitle.value = 'Non Group Transactions';
    }, [showBottomBar.value]);
    useEffect(() => {
        const saved = localStorage.getItem('submittedFromHomePersistData');
        if (saved) {
            const { nonGroupUsers: u } = JSON.parse(saved);
            nonGroupUsers.value = u ?? [];
        }
        nonGroupTransferMenu.value = {
            attribute: '',
            menu: null,
            senderId: userInfo?.userId,
            senderName: 'You',
            receiverId: '',
            receiverName: '',
        };
    }, []);
    return (_jsxs(StyledGroup, { children: [_jsxs("div", { className: "group", ...swipeHandlers, children: [_jsx(CategorySelector, { activeCat: path, categories: categoryCategories, navLinkUse: true }), _jsx(Outlet, { context: {
                            userInfo,
                            showBottomBar,
                            expenseParsedFilters,
                            transferParsedFilters,
                            mode: mode,
                        } }), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(NewExpenseAnimation, { expense: null, timeZoneId: timeZoneId, menu: menu, selectedExpense: selectedExpense, timeZoneCoordinates: timeZoneCoordinates, isPersonal: signal(false), currency: userInfo?.currency, groupMembers: signal([]), isnonGroupExpense: signal(true), nonGroupUsers: nonGroupUsers, nonGroupMenu: nonGroupMenu }), _jsx(NewTransferAnimation, { timeZoneId: timeZoneId, menu: menu, currency: userInfo?.currency, groupMembers: signal([]), isnonGroupTransfer: signal(true), nonGroupUsers: nonGroupUsers, nonGroupMenu: nonGroupTransferMenu, fromHomeGroup: signal(null), fromHome: false }), _jsx(GroupQuickActionsAnimation, { menu: menu }), _jsx(SearchTransactionsAnimation, { menu: menu, group: null, userInfo: userInfo, timeZoneId: timeZoneId, expenseParsedFilters: expenseParsedFilters, transferParsedFilters: transferParsedFilters }), _jsxs("div", { className: "bottomMenu", children: [' ', _jsx(BottomMainMenu, { menu: menu, onClick: () => {
                                    menu.value = 'quickActions';
                                } })] })] }), _jsx(NonGroupExpenseUsersAnimation, { menu: nonGroupMenu, nonGroupUsers: nonGroupUsers, isPersonal: signal(false), groupMembers: signal([]), fromHomeGroup: signal(null), isNonGroupExpense: signal(true), fromNonGroup: true }), _jsx(NonGroupTransferAnimation, { nonGroupTransferMenu: nonGroupTransferMenu, fromHomeGroup: signal(null), groupMembers: signal([]), isNonGroupTransfer: signal(true) })] }));
}
