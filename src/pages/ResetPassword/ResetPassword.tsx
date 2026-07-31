import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { resetPassword } from '../../api/auth/api';
import { ResetPasswordRequest } from '../../types';
import routes from '../../routes';
import Input from '../../components/Input/Input';
import MyButton from '../../components/MyButton/MyButton';
import WelcomeHeader from '../Auth/WelcomeHeader/WelcomeHeader';
import { StyledResetPassword } from './ResetPassword.styled';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [requestError, setRequestError] = useState('');

  useEffect(() => {
    if (!token) {
      navigate(routes.AUTH);
    }
  }, [token, navigate]);

  const { mutate: resetPasswordMutation, isPending } = useMutation<
    void,
    any,
    ResetPasswordRequest
  >({
    mutationFn: resetPassword,
  });

  const handleSubmit = () => {
    if (!token) return;
    if (newPassword.length < 10) {
      setError('Password should contain at least 10 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setRequestError('');

    resetPasswordMutation(
      { token, newPassword },
      {
        onSuccess: () => {
          navigate(
            `${routes.AUTH}?message=${encodeURIComponent(
              'Password updated, please sign in.'
            )}`
          );
        },
        onError: () => {
          setRequestError('This reset link is invalid or has expired.');
        },
      }
    );
  };

  if (!token) return null;

  return (
    <StyledResetPassword>
      <WelcomeHeader />
      <div className="loginBox">
        <div className="promptMsg">Reset your password</div>
        <div className="controlsContainer">
          <div className="inputBox">
            <Input
              type="password"
              value={newPassword}
              error={error ? true : false}
              placeholder="New Password"
              onChange={(e) => {
                setError('');
                setRequestError('');
                setNewPassword(e.target.value);
              }}
            />
          </div>
          <div className="inputBox">
            <Input
              type="password"
              value={confirmPassword}
              error={error ? true : false}
              placeholder="Confirm Password"
              onChange={(e) => {
                setError('');
                setRequestError('');
                setConfirmPassword(e.target.value);
              }}
            />
            {error ? <div className="errormsg">{error}</div> : ''}
          </div>

          <MyButton fontSize="18" onClick={handleSubmit} isLoading={isPending}>
            Reset Password
          </MyButton>
          {requestError ? (
            <div className="errormsg">{requestError}</div>
          ) : (
            ''
          )}
        </div>
      </div>
    </StyledResetPassword>
  );
}
