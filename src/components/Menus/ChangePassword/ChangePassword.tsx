import { useState } from 'react';
import { Signal } from '@preact/signals-react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { changePassword } from '../../../api/auth/api';
import { ChangePasswordRequest } from '../../../types';
import { messageFromError } from '../../GlobalWarning/globalWarningState';
import MyButton from '../../MyButton/MyButton';
import { StyledChangePassword } from './ChangePassword.styled';

// The floor the sign-up and reset pages apply, and the server's ValidationService enforces.
const PASSWORD_MIN_LENGTH = 10;

interface ChangePasswordProps {
  changePasswordMenu: Signal<string | null>;
  nodeRef: React.MutableRefObject<null>;
}

/**
 * Asks for the current password before taking a new one, so that a phone left unlocked is not
 * enough to lock its owner out. Settings only offers this to accounts that have a password: one
 * created through Google sign-in has nothing to ask for.
 */
export default function ChangePassword({
  changePasswordMenu,
  nodeRef,
}: ChangePasswordProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isDone, setIsDone] = useState(false);

  const { mutate, isPending } = useMutation<
    void,
    AxiosError,
    ChangePasswordRequest
  >({
    meta: { errorHandled: true },
    mutationFn: changePassword,
  });

  const close = () => {
    changePasswordMenu.value = null;
  };

  const bind =
    (setValue: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setError('');
      setValue(e.target.value);
    };

  const handleSubmit = () => {
    if (!currentPassword) {
      setError('Enter your current password');
      return;
    }
    if (newPassword.length < PASSWORD_MIN_LENGTH) {
      setError(
        `Password should contain at least ${PASSWORD_MIN_LENGTH} characters`
      );
      return;
    }
    if (newPassword === currentPassword) {
      setError('Choose a password different from your current one');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');

    mutate(
      { currentPassword, newPassword },
      {
        onSuccess: () => setIsDone(true),
        // The server says why it refused — a wrong current password, too many tries — and
        // that is worth more than a generic line.
        onError: (err) =>
          setError(
            messageFromError(
              err,
              'Could not change your password. Please try again.'
            )
          ),
      }
    );
  };

  if (isDone) {
    return (
      <StyledChangePassword ref={nodeRef}>
        <div className="dialogTitle">Password changed</div>
        <div className="description">
          You stay signed in here. Any other device that was signed in to your
          account has been signed out.
        </div>
        <div className="buttons">
          <MyButton onClick={close}>Done</MyButton>
        </div>
      </StyledChangePassword>
    );
  }

  return (
    <StyledChangePassword ref={nodeRef}>
      <div className="dialogTitle">Change password</div>
      <div className="fields">
        <input
          type="password"
          className="input"
          placeholder="Current password"
          autoComplete="current-password"
          value={currentPassword}
          autoFocus
          onChange={bind(setCurrentPassword)}
        />
        <input
          type="password"
          className="input"
          placeholder="New password"
          autoComplete="new-password"
          value={newPassword}
          onChange={bind(setNewPassword)}
        />
        <input
          type="password"
          className="input"
          placeholder="Confirm new password"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={bind(setConfirmPassword)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
        />
      </div>
      <div className="fieldNote">
        At least {PASSWORD_MIN_LENGTH} characters. Changing it signs you out of
        your other devices.
      </div>
      {error && <div className="errormsg">{error}</div>}
      <div className="buttons">
        <MyButton onClick={handleSubmit} isLoading={isPending}>
          Change password
        </MyButton>
        <MyButton variant="secondary" onClick={close}>
          Cancel
        </MyButton>
      </div>
    </StyledChangePassword>
  );
}
