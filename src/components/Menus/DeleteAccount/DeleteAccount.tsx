import { useState } from 'react';
import { Signal } from '@preact/signals-react';
import IonIcon from '@reacticons/ionicons';
import MyButton from '../../MyButton/MyButton';
import { useDeleteAccount } from '../../../api/auth/CommandHooks/useDeleteAccount';
import { StyledDeleteAccount } from './DeleteAccount.styled';

/**
 * The last step before an account is deleted.
 *
 * Deletion cannot be undone and nothing here asks for a password — someone who signed in with
 * Google does not have one — so typing the username is what stands between a stray tap and an
 * empty account. It also says, before rather than after, the one thing people do not expect:
 * what they shared with others stays with those others.
 */

interface DeleteAccountProps {
  deleteAccountMenu: Signal<string | null>;
  username: string | undefined;
  hasActiveMonthly: boolean | undefined;
  nodeRef: React.MutableRefObject<null>;
}

export default function DeleteAccount({
  deleteAccountMenu,
  username,
  hasActiveMonthly,
  nodeRef,
}: DeleteAccountProps) {
  const [typed, setTyped] = useState('');

  const { mutate: deleteAccount, isPending, error } = useDeleteAccount();

  // Usernames are unique whatever their case, so the confirmation is not fussy about it either.
  const isConfirmed =
    !!username && typed.trim().toLowerCase() === username.toLowerCase();

  // The server explains itself when it refuses — a monthly gift it could not cancel, say — and
  // that explanation is worth more than a generic line.
  const serverMessage = error?.response?.data;
  const errorMessage = error
    ? typeof serverMessage === 'string' && serverMessage
      ? serverMessage
      : 'Your account could not be deleted. Please try again.'
    : null;

  return (
    <StyledDeleteAccount ref={nodeRef}>
      <div className="dialogHeader">
        <IonIcon name="warning-outline" className="dialogIcon danger" />
        <div className="dialogTitle">Delete your account?</div>
      </div>
      <div className="explanation">
        <p>
          This permanently deletes your account, your personal expenses and
          budgets, and any group only you are in. It cannot be undone.
        </p>
        <p>
          Expenses you shared with other people stay visible to them, without
          your account attached.
        </p>
        {hasActiveMonthly && (
          <p>
            Your monthly contribution through Google Play will be cancelled.
          </p>
        )}
      </div>
      <div className="headerSeparator">
        <div className="header">
          <input
            className="input"
            placeholder={username}
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
      </div>
      <div className="fieldNote">Type your username to confirm.</div>
      {errorMessage && <div className="deleteError">{errorMessage}</div>}
      <div className="buttons">
        <MyButton
          isLoading={isPending}
          disabled={!isConfirmed}
          onClick={() => deleteAccount()}
        >
          Delete account
        </MyButton>
        <MyButton
          variant="secondary"
          onClick={() => (deleteAccountMenu.value = null)}
        >
          Cancel
        </MyButton>
      </div>
    </StyledDeleteAccount>
  );
}
