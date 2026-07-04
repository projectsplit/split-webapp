import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Outlet, useOutletContext } from 'react-router-dom';
import { StyledPersonal } from './Personal.styled';
import { Mode, } from '../../types';
import { useSignal, signal } from '@preact/signals-react';
import NewExpenseAnimation from '@/components/Animations/NewExpenseAnimation';
import MenuAnimationBackground from '@/components/Animations/MenuAnimationBackground';
import BottomMainMenu from '@/components/Menus/BottomMainMenu/BottomMainMenu';
import SearchTransactionsAnimation from '@/components/Animations/SearchTransactionsAnimation';
import { getFilterStorageKey, localStorageStringParser, } from '@/components/SearchTransactions/helpers/localStorageStringParser';
export const Personal = () => {
    const { userInfo, topMenuTitle } = useOutletContext();
    const showBottomBar = useSignal(true);
    const transferParsedFilters = useSignal({});
    const menu = useSignal(null);
    const selectedExpense = useSignal(null);
    const timeZoneId = userInfo?.timeZone;
    const timeZoneCoordinates = userInfo?.timeZoneCoordinates;
    const fromPersonal = useSignal(true);
    const { expenseFilter } = localStorageStringParser(localStorage.getItem(getFilterStorageKey('expense', undefined, true)), null);
    const expenseParsedFilters = useSignal(expenseFilter);
    useEffect(() => {
        topMenuTitle.value = 'Your Expenses';
    }, []);
    return (_jsxs(StyledPersonal, { children: [_jsx(Outlet, { context: {
                    userInfo,
                    topMenuTitle,
                    showBottomBar,
                    expenseParsedFilters,
                    transferParsedFilters,
                    mode: Mode.Personal,
                    group: null,
                } }), _jsx(SearchTransactionsAnimation, { menu: menu, group: null, userInfo: userInfo, timeZoneId: timeZoneId, expenseParsedFilters: expenseParsedFilters, transferParsedFilters: transferParsedFilters, isPersonal: true }), _jsxs("div", { className: "bottomMenu", children: [' ', _jsx(BottomMainMenu, { menu: menu, onClick: () => {
                            menu.value = 'newExpense';
                        } })] }), _jsx(MenuAnimationBackground, { menu: menu }), _jsx(NewExpenseAnimation, { expense: null, timeZoneId: timeZoneId, menu: menu, selectedExpense: selectedExpense, timeZoneCoordinates: timeZoneCoordinates, isPersonal: signal(true), currency: userInfo?.currency, groupMembers: signal([]), isnonGroupExpense: signal(false), nonGroupUsers: signal([]), fromPersonal: fromPersonal })] }));
};
