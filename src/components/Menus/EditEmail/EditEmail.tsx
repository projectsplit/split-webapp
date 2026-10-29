import { useEffect, useRef, useState } from 'react';
import { Signal } from '@preact/signals-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setAccountEmail, verifyAccountEmail } from '../../../api/auth/api';
import { messageFromError } from '../../GlobalWarning/globalWarningState';
import {
  SetAccountEmailRequest,
  UserInfo,
  VerifyAccountEmailRequest,
} from '../../../types';
import MyButton from '../../MyButton/MyButton';
import { StyledEditEmail } from './EditEmail.styled';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALREADY_CLAIMED_MARKER = 'already associated with another account';

interface EditEmailProps {
  existingEmail: string | null | undefined;
  emailVerified: boolean | undefined;
  editEmailMenu: Signal<string | null>;
  /** Open on the code step straight away, with a fresh code on its way. */
  startAtVerify?: boolean;
}

type Step = 'view' | 'edit' | 'verify';

export default function EditEmail({
  existingEmail,
  emailVerified,
  editEmailMenu,
  startAtVerify = false,
}: EditEmailProps) {
  const queryClient = useQueryClient();
  const initialStep: Step =
    startAtVerify && existingEmail ? 'verify' : existingEmail ? 'view' : 'edit';

  const [step, setStep] = useState<Step>(initialStep);
  const [email, setEmail] = useState(existingEmail ?? '');
  const [pendingEmail, setPendingEmail] = useState<string>(existingEmail ?? '');
  const [emailError, setEmailError] = useState('');
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const setEmailMutation = useMutation<void, any, SetAccountEmailRequest>({
    meta: { errorHandled: true },
    mutationFn: setAccountEmail,
  });

  const verifyMutation = useMutation<void, any, VerifyAccountEmailRequest>({
    meta: { errorHandled: true },
    mutationFn: verifyAccountEmail,
  });

  // Settings opens this on the code step when the address is unverified. The code is sent from
  // here rather than by the row that was tapped, so that "Resending…" and any failure show
  // where the person is looking.
  const hasSentOnOpen = useRef(false);
  useEffect(() => {
    if (!startAtVerify || !existingEmail || hasSentOnOpen.current) return;
    hasSentOnOpen.current = true;
    setEmailMutation.mutate({ email: existingEmail });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSetEmail = () => {
    if (!email || !EMAIL_REGEX.test(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    setEmailMutation.mutate(
      { email },
      {
        onSuccess: () => {
          const current = queryClient.getQueryData<UserInfo>(['getMe']);
          if (current) {
            const isSameAsCurrent =
              !!current.email &&
              current.email.toLowerCase() === email.toLowerCase();

            queryClient.setQueryData<UserInfo>(['getMe'], {
              ...current,
              email,
              emailVerified: isSameAsCurrent ? current.emailVerified : false,
            });
          }
          setPendingEmail(email);
          setCode('');
          setCodeError('');
          setStep('verify');
        },
        onError: (error) => {
          const message =
            error?.response?.data?.message ||
            error?.response?.data ||
            'Failed to set email. Please try again.';
          setEmailError(
            typeof message === 'string' ? message : 'Failed to set email.'
          );
        },
      }
    );
  };

  const handleVerify = () => {
    if (!/^\d{6}$/.test(code)) {
      setCodeError('Enter the 6-digit code from your email');
      return;
    }
    setCodeError('');
    verifyMutation.mutate(
      { code },
      {
        onSuccess: async () => {
          const current = queryClient.getQueryData<UserInfo>(['getMe']);
          if (current) {
            queryClient.setQueryData<UserInfo>(['getMe'], {
              ...current,
              email: pendingEmail || current.email,
              emailVerified: true,
            });
          }
          await queryClient.refetchQueries({
            queryKey: ['getMe'],
            exact: true,
          });
          editEmailMenu.value = null;
        },
        onError: (error) => {
          const raw = error?.response?.data?.message || error?.response?.data;
          const message = typeof raw === 'string' && raw ? raw : '';

          if (message.includes(ALREADY_CLAIMED_MARKER)) {
            setCode('');
            setCodeError('');
            setEmail('');
            setEmailError(message);
            setStep('edit');
            return;
          }

          setCodeError(message || 'Invalid or expired code. Please try again.');
        },
      }
    );
  };

  const handleResend = () => {
    if (!pendingEmail) return;
    setCodeError('');
    setEmailMutation.mutate({ email: pendingEmail });
  };

  const handleCancel = () => {
    editEmailMenu.value = null;
  };

  const handleVerifyNow = () => {
    if (!existingEmail) return;
    setPendingEmail(existingEmail);
    setCode('');
    setCodeError('');
    setEmailMutation.mutate({ email: existingEmail });
    setStep('verify');
  };

  if (step === 'view') {
    return (
      <StyledEditEmail>
        <div className="title">Email</div>
        <div className="current">
          <div>{existingEmail || 'Not set'}</div>
          {existingEmail ? (
            emailVerified ? (
              <span className="badge verified">Verified</span>
            ) : (
              <span className="badge unverified" onClick={handleVerifyNow}>
                Unverified - verify now
              </span>
            )
          ) : null}
        </div>
        <div className="buttons">
          <MyButton onClick={() => setStep('edit')}>
            {existingEmail ? 'Change' : 'Set email'}
          </MyButton>
          <MyButton variant="secondary" onClick={handleCancel}>
            Close
          </MyButton>
        </div>
      </StyledEditEmail>
    );
  }

  if (step === 'edit') {
    return (
      <StyledEditEmail>
        <div className="title">
          {existingEmail ? 'Change email' : 'Set email'}
        </div>
        <input
          type="email"
          inputMode="email"
          className="input"
          placeholder="your@email.com"
          value={email}
          autoFocus
          onChange={(e) => {
            setEmailError('');
            setEmail(e.target.value);
          }}
        />
        {emailError && <div className="errormsg">{emailError}</div>}
        <div className="buttons">
          <MyButton
            onClick={handleSetEmail}
            isLoading={setEmailMutation.isPending}
          >
            Continue
          </MyButton>
          <MyButton variant="secondary" onClick={handleCancel}>
            Cancel
          </MyButton>
        </div>
      </StyledEditEmail>
    );
  }

  // A code that never left — the sending is throttled, say — would otherwise be waited for in
  // silence.
  const sendError = setEmailMutation.isError
    ? messageFromError(
        setEmailMutation.error,
        'The code could not be sent. Please try again.'
      )
    : '';

  return (
    <StyledEditEmail>
      <div className="title">Verify email</div>
      <div className="description">
        We sent a 6-digit code to {pendingEmail}. Enter it below to verify your
        email.
      </div>
      <input
        type="text"
        inputMode="numeric"
        maxLength={6}
        className="input"
        placeholder="6-digit code"
        value={code}
        autoFocus
        onChange={(e) => {
          setCodeError('');
          setCode(e.target.value.replace(/\D/g, '').slice(0, 6));
        }}
      />
      {codeError && <div className="errormsg">{codeError}</div>}
      {!codeError && sendError && <div className="errormsg">{sendError}</div>}
      <button
        type="button"
        className="resend"
        onClick={handleResend}
        disabled={setEmailMutation.isPending}
      >
        {setEmailMutation.isPending ? 'Resending…' : 'Resend code'}
      </button>
      <div className="buttons">
        <MyButton onClick={handleVerify} isLoading={verifyMutation.isPending}>
          Verify
        </MyButton>
        <MyButton variant="secondary" onClick={handleCancel}>
          Cancel
        </MyButton>
      </div>
    </StyledEditEmail>
  );
}
