import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PasswordSignInRequest, PasswordSignInResponse } from '../../types';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { StyledAuthPage } from './AuthPage.styled';
import WelcomeHeader from './WelcomeHeader/WelcomeHeader';
import Input from '../../components/Input/Input';
import { sendPasswordCredentials } from '../../api/auth/api';
import MyButton from '../../components/MyButton/MyButton';
import ForgotCredentials from '../../components/Menus/ForgotCredentials/ForgotCredentials';
import { StyledForgotLinks } from '../../components/Menus/ForgotCredentials/ForgotCredentials.styled';
import { isUserAuthenticated } from '../../helpers/isUserAuthenticated';

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string>('');
  const [forgotMode, setForgotMode] = useState<'password' | 'username' | null>(
    null
  );
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const redirect = searchParams.get('redirect') || routes.ROOT;
  const successMessage = searchParams.get('message') || '';

  const { mutate: signInWithCredentialsMutation, isPending } = useMutation<
    PasswordSignInResponse,
    any,
    PasswordSignInRequest
  >({
    meta: { errorHandled: true },
    mutationFn: sendPasswordCredentials,
  });

  const handleSignIn = () => {
    setFormError('');

    if (!username && !password) {
      setFormError('Enter your username and password');
      return;
    }
    if (!username) {
      setFormError('Enter your username');
      return;
    }
    if (!password) {
      setFormError('Enter your password');
      return;
    }

    signInWithCredentialsMutation(
      { username, password },
      {
        onSuccess: (response) => {
          localStorage.setItem('accessToken', response.accessToken);
          navigate(redirect);
        },
        onError: (error) => {
          if (error.code === 'ERR_NETWORK') {
            setFormError(error.message + ': Check your internet connection');
          } else {
            const message = error.response?.data;
            setFormError(
              typeof message === 'string' && message
                ? message
                : 'Sign-in failed. Please try again.'
            );
          }
          console.error('Sign-in failed', error.message);
        },
      }
    );
  };

  if (isUserAuthenticated()) {
    return <Navigate to={redirect} replace />;
  }

  return (
    <StyledAuthPage>
      <WelcomeHeader />
      <div className="loginBox">
        {successMessage ? (
          <div className="promptMsg">{successMessage}</div>
        ) : (
          ''
        )}
        <div className="controlsContainer">
          <div className="inputBox">
            <Input
              inputMode="text"
              value={username}
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
                setFormError('');
              }}
            />
          </div>
          <div className="inputBox">
            <Input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setFormError('');
              }}
            />
          </div>

          <StyledForgotLinks>
            <button
              type="button"
              className="link"
              onClick={() => setForgotMode('password')}
            >
              Forgot password?
            </button>
            <button
              type="button"
              className="link"
              onClick={() => setForgotMode('username')}
            >
              Forgot username?
            </button>
          </StyledForgotLinks>

          <div className="formError">{formError}</div>

          <div className="createAccountSignIn">
            <MyButton onClick={handleSignIn} isLoading={isPending}>
              Sign In
            </MyButton>
            <MyButton
              variant="secondary"
              onClick={() => navigate(routes.CREATE)}
            >
              Create Account
            </MyButton>
          </div>

          <div className="or ">OR</div>
          <GoogleButton />
        </div>
      </div>
      {forgotMode && (
        <ForgotCredentials
          mode={forgotMode}
          onClose={() => setForgotMode(null)}
        />
      )}
    </StyledAuthPage>
  );
};

export default AuthPage;
