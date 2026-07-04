import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Input from '../../components/Input/Input';
import WelcomeHeader from '../Auth/WelcomeHeader/WelcomeHeader';
import { StyledCreateAccount } from './CreateAccount.styled';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../components/MyButton/MyButton';
import { useMutation } from '@tanstack/react-query';
import { createPasswordCredentials } from '../../api/auth/api';
import routes from '../../routes';
export default function CreateAccount() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [networkError, setNetworkError] = useState('');
    const [requestError, setRequestError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();
    const redirect = new URLSearchParams(location.search).get('redirect') || routes.ROOT;
    const { mutate: signUpWithCredentialsMutation, isPending } = useMutation({
        mutationFn: createPasswordCredentials,
    });
    const handleSignUp = () => {
        if (password.length < 9) {
            setPasswordError('Password should contain at least 10 characters');
            return;
        }
        if (!username || !password)
            return;
        setNetworkError('');
        setRequestError('');
        setPasswordError('');
        signUpWithCredentialsMutation({ username, password }, {
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
                console.error('Sign-up failed', error.message);
            },
        });
    };
    const handleChange = (e) => {
        setRequestError('');
        setUsername(e.target.value);
    };
    return (_jsxs(StyledCreateAccount, { children: [_jsx(WelcomeHeader, {}), _jsxs("div", { className: "loginBox", children: [_jsx("div", { className: "promptMsg", children: "Create a new account" }), _jsxs("div", { className: "controlsContainer", children: [_jsxs("div", { className: "inputBox", children: [_jsx(Input, { inputMode: "text", value: username, error: requestError ? true : false, placeholder: "New Username", onChange: (e) => handleChange(e) }), requestError ? (_jsxs("div", { className: "errormsg", children: [requestError, "\u00A0"] })) : ('')] }), _jsxs("div", { className: "inputBox", children: [_jsx(Input, { type: "password", value: password, error: passwordError ? true : false, placeholder: "New Password", onChange: (e) => setPassword(e.target.value) }), passwordError ? (_jsxs("div", { className: "errormsg", children: [passwordError, "\u00A0"] })) : ('')] }), _jsx(MyButton, { fontSize: "18", onClick: handleSignUp, isLoading: isPending, children: "Sign Up" }), _jsx("div", { className: "errormsg", children: networkError })] })] })] }));
}
