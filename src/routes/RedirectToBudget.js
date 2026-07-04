import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useRedirectToBudget } from '../hooks/useRedirectToBudget';
import useBudgetInfo from '../api/auth/QueryHooks/useBudgetInfo';
import { useOutletContext } from 'react-router-dom';
export default function RedirectToBudget() {
    const { data, isFetching } = useBudgetInfo();
    const { userInfo } = useOutletContext();
    useRedirectToBudget(data, isFetching, !!userInfo);
    return _jsx(_Fragment, {});
}
