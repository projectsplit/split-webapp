import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import {
  StyledForgotBackdrop,
  StyledForgotCredentials,
} from './ForgotCredentials.styled';
import Input from '../../Input/Input';
import MyButton from '../../MyButton/MyButton';
import {
  requestPasswordReset,
  requestUsernameRecovery,
} from '../../../api/auth/api';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const GENERIC_CONFIRMATION =
  "If that email is registered, we've sent instructions.";

interface ForgotCredentialsProps {
  mode: 'password' | 'username';
  onClose: () => void;
}

export default function ForgotCredentials({
  mode,
  onClose,
}: ForgotCredentialsProps) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const { mutate: forgotMutation, isPending } = useMutation({
    mutationFn:
      mode === 'password' ? requestPasswordReset : requestUsernameRecovery,
  });

  const title =
    mode === 'password' ? 'Forgot password?' : 'Forgot username?';
  const description =
    mode === 'password'
      ? 'Enter the email associated with your account and we will send you a password reset link.'
      : 'Enter the email associated with your account and we will send you your username.';

  const handleSubmit = () => {
    if (submitted) return;
    if (!email || !EMAIL_REGEX.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    forgotMutation(
      { email },
      {
        onSettled: () => {
          setSubmitted(true);
        },
      }
    );
  };

  return (
    <>
      <StyledForgotBackdrop onClick={onClose} />
      <StyledForgotCredentials>
        <div className="title">{title}</div>
        {submitted ? (
          <>
            <div className="confirmation">{GENERIC_CONFIRMATION}</div>
            <div className="buttons">
              <MyButton onClick={onClose}>Close</MyButton>
            </div>
          </>
        ) : (
          <>
            <div className="description">{description}</div>
            <Input
              type="email"
              inputMode="email"
              placeholder="Email"
              value={email}
              error={emailError ? true : false}
              onChange={(e) => {
                setEmailError('');
                setEmail(e.target.value);
              }}
              autoFocus={true}
            />
            {emailError && <div className="errormsg">{emailError}</div>}
            <div className="buttons">
              <MyButton onClick={handleSubmit} isLoading={isPending}>
                Submit
              </MyButton>
              <MyButton variant="secondary" onClick={onClose}>
                Cancel
              </MyButton>
            </div>
          </>
        )}
      </StyledForgotCredentials>
    </>
  );
}
