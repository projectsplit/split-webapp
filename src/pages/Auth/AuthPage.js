import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { StyledAuthPage } from './Auth.styled';
import WelcomeHeader from './WelcomeHeader/WelcomeHeader';
import Input from '../../components/Input/Input';
import { sendPasswordCredentials } from '../../api/auth/api';
import MyButton from '../../components/MyButton/MyButton';
const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [networkError, setNetworkError] = useState('');
    const [requestError, setRequestError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const redirect = new URLSearchParams(location.search).get('redirect') || routes.ROOT;
    const { mutate: signInWithCredentialsMutation, isPending } = useMutation({
        mutationFn: sendPasswordCredentials,
    });
    const handleSignIn = () => {
        if (!username || !password)
            return;
        setNetworkError('');
        setRequestError('');
        signInWithCredentialsMutation({ username, password }, {
            onSuccess: (response) => {
                localStorage.setItem('accessToken', response.accessToken);
                navigate(redirect);
            },
            onError: (error) => {
                if (error.code === 'ERR_NETWORK') {
                    setNetworkError(error.message + ': Check your internet connection');
                }
                if ((error.code = 'ERR_BAD_REQUEST')) {
                    setRequestError(error.response.data);
                }
                console.error('Sign-in failed', error.message);
            },
        });
    };
    return (_jsxs(StyledAuthPage, { children: [_jsx(WelcomeHeader, {}), _jsx("div", { className: "loginBox", children: _jsxs("div", { className: "controlsContainer", children: [_jsxs("div", { className: "inputBox", children: [_jsx(Input, { inputMode: "text", value: username, 
                                    //error={signInError ? true : false}
                                    placeholder: "Username", onChange: (e) => {
                                        setUsername(e.target.value);
                                        setRequestError('');
                                    } }), requestError ? (_jsxs("div", { className: "errormsg", children: [requestError, "\u00A0"] })) : ('')] }), _jsx("div", { className: "inputBox", children: _jsx(Input, { type: "password", value: password, 
                                //error={signInError ? true : false}
                                placeholder: "Password", onChange: (e) => {
                                    setPassword(e.target.value);
                                    setRequestError('');
                                } }) }), _jsxs("div", { className: "createAccountSignIn", children: [_jsx(MyButton, { onClick: handleSignIn, fontSize: "18", isLoading: isPending, children: "Sign In" }), _jsx(MyButton, { onClick: () => navigate('/entry'), fontSize: "18", children: "Create Account" })] }), _jsx("div", { className: "errormsg", children: networkError }), _jsx("div", { className: "or ", children: "OR" }), _jsx(GoogleButton, {}), _jsx("div", { className: "errormsg", children: networkError })] }) })] }));
};
export default AuthPage;
