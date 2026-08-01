import { useState } from 'react';
import Input from '../../components/Input/Input';
import WelcomeHeader from '../Auth/WelcomeHeader/WelcomeHeader';
import { StyledCreateAccount } from './CreateAccount.styled';
import { useNavigate } from 'react-router-dom';
import MyButton from '../../components/MyButton/MyButton';
import { useMutation } from '@tanstack/react-query';
import { createPasswordCredentials } from '../../api/auth/api';
import { PasswordSignUpRequest, PasswordSignUpResponse } from '../../types';
import routes from '../../routes';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The server reports sign-up failures as a plain message, so map it back to the
// field it belongs to instead of always blaming the username.
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
  const [usernameError, setUsernameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const navigate = useNavigate();

  const redirect =
    new URLSearchParams(location.search).get('redirect') || routes.ROOT;

  const { mutate: signUpWithCredentialsMutation, isPending } = useMutation<
    PasswordSignUpResponse,
    any,
    PasswordSignUpRequest
  >({
    mutationFn: createPasswordCredentials,
  });

  const handleSignUp = () => {
    if (!username) return;
    if (!email) {
      setEmailError('Email is required');
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (password.length < 9) {
      setPasswordError('Password should contain at least 10 characters');
      return;
    }
    if (!password) return;
    setFormError('');
    setUsernameError('');
    setEmailError('');
    setPasswordError('');

    signUpWithCredentialsMutation(
      { username, password, email },
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

            if (typeof message !== 'string' || !message) {
              setFormError('Sign-up failed. Please try again.');
            } else {
              const field = resolveErrorField(message);

              if (field === 'username') setUsernameError(message);
              else if (field === 'email') setEmailError(message);
              else setFormError(message);
            }
          }

          console.error('Sign-up failed', error.message);
        },
      }
    );
  };

  return (
    <StyledCreateAccount>
      <WelcomeHeader />
      <div className="loginBox">
        <div className="promptMsg">Create a new account</div>
        <div className="controlsContainer">
          <div className="inputBox">
            <Input
              inputMode="text"
              value={username}
              error={usernameError ? true : false}
              placeholder="New Username"
              onChange={(e) => {
                setUsernameError('');
                setUsername(e.target.value);
              }}
            />
            {usernameError ? (
              <div className="errormsg">{usernameError}&nbsp;</div>
            ) : (
              ''
            )}
          </div>
          <div className="inputBox">
            <Input
              type="email"
              inputMode="email"
              value={email}
              error={emailError ? true : false}
              placeholder="Email"
              onChange={(e) => {
                setEmailError('');
                setEmail(e.target.value);
              }}
            />
            {emailError ? (
              <div className="errormsg">{emailError}&nbsp;</div>
            ) : (
              ''
            )}
          </div>
          <div className="inputBox">
            <Input
              type="password"
              value={password}
              error={passwordError ? true : false}
              placeholder="New Password"
              onChange={(e) => {
                setPasswordError('');
                setPassword(e.target.value);
              }}
            />
            {passwordError ? (
              <div className="errormsg">{passwordError}&nbsp;</div>
            ) : (
              ''
            )}
          </div>

          <MyButton fontSize="18" onClick={handleSignUp} isLoading={isPending}>
            Sign Up
          </MyButton>
          <div className="errormsg">{formError}</div>
        </div>
      </div>
    </StyledCreateAccount>
  );
}
