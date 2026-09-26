import { useState } from 'react';
import Input from '../../components/Input/Input';
import WelcomeHeader from '../Auth/WelcomeHeader/WelcomeHeader';
import { StyledAuthFormPage } from '../Auth/AuthFormPage.styled';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../components/MyButton/MyButton';
import BackButton from '../../components/BackButton/BackButton';
import { useMutation } from '@tanstack/react-query';
import { createPasswordCredentials } from '../../api/auth/api';
import { PasswordSignUpRequest, PasswordSignUpResponse } from '../../types';
import routes from '../../routes';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const resolveErrorField = (message: string): 'username' | 'email' | 'form' => {
  const normalized = message.toLowerCase();
  if (normalized.includes('username')) return 'username';
  if (normalized.includes('email')) return 'email';
  return 'form';
};

export default function CreateAccount() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string>('');
  const [errorField, setErrorField] = useState<
    'username' | 'email' | 'password' | 'form'
  >('form');
  const navigate = useNavigate();

  const redirect =
    new URLSearchParams(location.search).get('redirect') || routes.ROOT;

  const { mutate: signUpWithCredentialsMutation, isPending } = useMutation<
    PasswordSignUpResponse,
    any,
    PasswordSignUpRequest
  >({
    meta: { errorHandled: true },
    mutationFn: createPasswordCredentials,
  });

  const showError = (
    field: 'username' | 'email' | 'password' | 'form',
    message: string
  ) => {
    setErrorField(field);
    setFormError(message);
  };

  const handleSignUp = () => {
    setFormError('');

    if (!username) {
      showError('username', 'Enter a username');
      return;
    }
    if (!email) {
      showError('email', 'Email is required');
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      showError('email', 'Please enter a valid email address');
      return;
    }
    if (!password) {
      showError('password', 'Enter a password');
      return;
    }
    if (password.length < 9) {
      showError('password', 'Password should contain at least 10 characters');
      return;
    }

    signUpWithCredentialsMutation(
      { username, password, email },
      {
        onSuccess: (response) => {
          localStorage.setItem('accessToken', response.accessToken);
          navigate(redirect);
        },
        onError: (error) => {
          if (error.code === 'ERR_NETWORK') {
            showError(
              'form',
              error.message + ': Check your internet connection'
            );
          } else {
            const message = error.response?.data;

            if (typeof message !== 'string' || !message) {
              showError('form', 'Sign-up failed. Please try again.');
            } else {
              showError(resolveErrorField(message), message);
            }
          }

          console.error('Sign-up failed', error.message);
        },
      }
    );
  };

  return (
    <StyledAuthFormPage>
      <BackButton className="backToSignIn" onClick={() => navigate(routes.AUTH)} />
      <WelcomeHeader />
      <div className="loginBox">
        <div className="promptMsg">Create a new account</div>
        <div className="controlsContainer">
          <div className="inputBox">
            <Input
              inputMode="text"
              value={username}
              error={!!formError && errorField === 'username'}
              placeholder="New Username"
              onChange={(e) => {
                setFormError('');
                setUsername(e.target.value);
              }}
            />
          </div>
          <div className="inputBox">
            <Input
              type="email"
              inputMode="email"
              value={email}
              error={!!formError && errorField === 'email'}
              placeholder="Email"
              onChange={(e) => {
                setFormError('');
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="inputBox">
            <Input
              type="password"
              value={password}
              error={!!formError && errorField === 'password'}
              placeholder="New Password"
              onChange={(e) => {
                setFormError('');
                setPassword(e.target.value);
              }}
            />
          </div>

          <div className="formError">{formError}</div>

          <MyButton onClick={handleSignUp} isLoading={isPending}>
            Sign Up
          </MyButton>
        </div>
      </div>
    </StyledAuthFormPage>
  );
}
