import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
export const useRedirectToBudget = (data, isLoading, hasUserInfo) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {
        const validPaths = ['/budget/actions', '/budget/manage', '/budget/create'];
        if (validPaths.includes(pathname))
            return;
        if (pathname.includes('/actions')) {
            navigate(`/budget/actions`, { replace: true });
        }
        else if (pathname.includes('/manage')) {
            navigate(`/budget/manage`, { replace: true });
        }
        else if (pathname.includes('/create')) {
            navigate(`/budget/create`, { replace: true });
        }
        else {
            navigate(`/budget/actions`, { replace: true });
        }
    }, [isLoading, data, hasUserInfo, pathname]);
    return null;
};
