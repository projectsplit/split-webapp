import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { PasswordSignInRequest, PasswordSignInResponse } from '../../types';
import GoogleButton from '../../components/GoogleButton/GoogleButton';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '../../routes';
import { StyledAuthPage } from './Auth.styled';
import WelcomeHeader from './WelcomeHeader/WelcomeHeader';
import Input from '../../components/Input/Input';
import { sendPasswordCredentials } from '../../api/auth/api';
import MyButton from '../../components/MyButton/MyButton';
import ForgotCredentials from '../../components/Menus/ForgotCredentials/ForgotCredentials';
import { StyledForgotLinks } from '../../components/Menus/ForgotCredentials/ForgotCredentials.styled';

const AuthPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [networkError, setNetworkError] = useState<string>('');
  const [requestError, setRequestError] = useState<string>('');
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
    mutationFn: sendPasswordCredentials,
  });

  const handleSignIn = () => {
    if (!username || !password) return;
    setNetworkError('');
    setRequestError('');

    signInWithCredentialsMutation(
      { username, password },
      {
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
      }
    );
  };

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
              //error={signInError ? true : false}
              placeholder="Username"
              onChange={(e) => {
                setUsername(e.target.value);
                setRequestError('');
              }}
            />
            {requestError ? (
              <div className="errormsg">{requestError}&nbsp;</div>
            ) : (
              ''
            )}
          </div>
          <div className="inputBox">
            <Input
              type="password"
              value={password}
              //error={signInError ? true : false}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                setRequestError('');
              }}
            />
            {/* <div className="mailmsg">{signInError}&nbsp;</div> */}
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

          <div className="createAccountSignIn">
            <MyButton
              onClick={handleSignIn}
              fontSize="18"
              isLoading={isPending}
            >
              Sign In
            </MyButton>
            <MyButton onClick={() => navigate('/entry')} fontSize="18">
              Create Account
            </MyButton>
          </div>

          <div className="errormsg">{networkError}</div>
          <div className="or ">OR</div>
          <GoogleButton />
          <div className="errormsg">{networkError}</div>
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
