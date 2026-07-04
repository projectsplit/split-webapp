import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
const useRedirectToAnalytics = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(`/analytics`);
    }, []);
    return null;
};
export default function RedirectToAnalytics() {
    useRedirectToAnalytics();
    return _jsx(_Fragment, {});
}
