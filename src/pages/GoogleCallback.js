import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import routes from '../routes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sendGoogleAccessToken } from '../api/auth/api';
import Spinner from '../components/Spinner/Spinner';
const GoogleCallback = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const mutation = useMutation({
        mutationFn: sendGoogleAccessToken,
        onSuccess: (res) => {
            localStorage.setItem('accessToken', res.accessToken);
            navigate(routes.ROOT, { replace: true });
        },
        onError: () => {
            navigate(routes.ROOT, { replace: true });
        },
    });
    const handleAuthCode = useCallback(() => {
        const code = searchParams.get('code');
        if (code && mutation.isIdle) {
            mutation.mutate({ code });
            setSearchParams({}, { replace: true });
        }
    }, [mutation, searchParams, setSearchParams]);
    useEffect(() => {
        handleAuthCode();
    }, [handleAuthCode]);
    return (_jsxs("div", { style: { textAlign: 'center', marginTop: '20px' }, children: [mutation.isPending && _jsx(Spinner, {}), mutation.isSuccess && (_jsxs("div", { children: [_jsx("h1", { children: "Login successful!" }), _jsx("button", { onClick: () => (window.location.href = routes.ROOT), children: "Go to Home" })] })), mutation.isError && (_jsxs("div", { children: [_jsx("h1", { children: "Login failed. Please try again." }), _jsx("button", { onClick: () => (window.location.href = routes.ROOT), children: "Back to Login" })] }))] }));
};
export default GoogleCallback;
