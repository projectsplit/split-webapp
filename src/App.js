import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom';
import Auth from './pages/Auth/AuthPage';
import routes from './routes';
import GoogleCallback from './pages/GoogleCallback';
import Home from './pages/Home/Home';
import RedirectToExpenses from './routes/RedirectToExpenses';
import RedirectToAnalytics from './routes/RedirectToAnalytics';
import RedirectToBudget from './routes/RedirectToBudget';
import RedirectToNonGroupExpenses from './routes/RedirectToNonGroupExpenses';
import Protected from './pages/Protected/Protected';
import CreateAccount from './pages/CreateAccount/CreateAccount';
import Spinner from './components/Spinner/Spinner';
import { PwaInstallPrompt } from './components/PwaInstallPrompt/PwaInstallPrompt';
import { Group, NonGroup, Expenses, Transfers, Members, Analytics, Budget, CreateBudget, Shared, GenerateInvitationCode, Personal, BudgetActions, ManageBudgets, } from './lazyRoutes';
const SuspenseFallback = () => (_jsx("div", { style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100%',
    }, children: _jsx(Spinner, {}) }));
const App = () => {
    return (_jsxs(_Fragment, { children: [_jsx(Router, { children: _jsx(Suspense, { fallback: _jsx(SuspenseFallback, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: routes.AUTH, element: _jsx(Auth, {}) }), _jsx(Route, { path: routes.CREATE, element: _jsx(CreateAccount, {}) }), _jsx(Route, { path: routes.GOOGLE_REDIRECT, element: _jsx(GoogleCallback, {}) }), _jsxs(Route, { element: _jsx(Protected, {}), children: [_jsx(Route, { path: routes.ROOT, element: _jsx(Home, {}) }), _jsx(Route, { path: routes.JOIN, element: _jsx(Home, {}) }), _jsx(Route, { path: "/shared", element: _jsx(Shared, {}) }), _jsx(Route, { path: "/shared/generatecode/:groupid", element: _jsx(GenerateInvitationCode, {}) }), _jsxs(Route, { path: "/shared/:groupid", element: _jsx(Group, {}), children: [_jsx(Route, { index: true, element: _jsx(RedirectToExpenses, {}) }), _jsx(Route, { path: "expenses", element: _jsx(Expenses, {}) }), _jsx(Route, { path: "transfers", element: _jsx(Transfers, {}) }), _jsx(Route, { path: "debts", element: _jsx(Members, {}) }), _jsx(Route, { path: "*", element: _jsx(RedirectToExpenses, {}) })] }), _jsxs(Route, { path: "/shared/nongroup", element: _jsx(NonGroup, {}), children: [_jsx(Route, { index: true, element: _jsx(RedirectToNonGroupExpenses, {}) }), _jsx(Route, { path: "expenses", element: _jsx(Expenses, {}) }), _jsx(Route, { path: "transfers", element: _jsx(Transfers, {}) }), _jsx(Route, { path: "debts", element: _jsx(Members, {}) }), _jsx(Route, { path: "*", element: _jsx(RedirectToNonGroupExpenses, {}) })] }), _jsx(Route, { path: "/personal", element: _jsx(Personal, {}), children: _jsx(Route, { index: true, element: _jsx(Expenses, {}) }) }), _jsx(Route, { path: "/analytics/*", element: _jsx(RedirectToAnalytics, {}) }), _jsx(Route, { path: "/analytics", element: _jsx(Analytics, {}) }), _jsxs(Route, { path: "/budget", element: _jsx(Budget, {}), children: [_jsx(Route, { index: true, element: _jsx(RedirectToBudget, {}) }), _jsx(Route, { path: "create", element: _jsx(CreateBudget, {}) }), _jsx(Route, { path: "actions", element: _jsx(BudgetActions, {}) }), _jsx(Route, { path: "manage", element: _jsx(ManageBudgets, {}) }), _jsx(Route, { path: "*", element: _jsx(RedirectToBudget, {}) })] }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }), _jsx(Route, { path: "*", element: _jsx("h1", { children: "Lost ?" }) })] }) }) }), _jsx(PwaInstallPrompt, {})] }));
};
export default App;
