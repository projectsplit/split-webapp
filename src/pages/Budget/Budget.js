import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { Outlet, useOutletContext } from 'react-router-dom';
export default function Budget() {
    const { userInfo } = useOutletContext();
    return (_jsx(_Fragment, { children: _jsx(Outlet, { context: { userInfo } }) }));
}
