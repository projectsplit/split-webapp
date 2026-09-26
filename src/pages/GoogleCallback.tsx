import React, { useCallback, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import routes from '../routes';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { sendGoogleAccessToken } from '../api/auth/api';
import Spinner from '../components/Spinner/Spinner';
import IonIcon from '@reacticons/ionicons';
import MyButton from '../components/MyButton/MyButton';
import { StyledGoogleCallback } from './GoogleCallback.styled';

const GoogleCallback: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const mutation = useMutation({
    meta: { errorHandled: true },
    mutationFn: sendGoogleAccessToken,
    onSuccess: (res) => {
      localStorage.setItem('accessToken', res.accessToken);
      navigate(routes.ROOT, { replace: true });
    },
    onError: () => {
      navigate(routes.ROOT, { replace: true });
    },
  });

  const handleAuthCode = useCallback(() => {
    const code = searchParams.get('code');
    if (code && mutation.isIdle) {
      mutation.mutate({ code });
      setSearchParams({}, { replace: true });
    }
  }, [mutation, searchParams, setSearchParams]);

  useEffect(() => {
    handleAuthCode();
  }, [handleAuthCode]);

  if (mutation.isSuccess) {
    return (
      <StyledGoogleCallback>
        <IonIcon name="checkmark-circle" className="statusIcon success" />
        <div className="statusTitle">You're signed in</div>
        <div className="statusInfo">Taking you to your account.</div>
      </StyledGoogleCallback>
    );
  }

  if (mutation.isError) {
    return (
      <StyledGoogleCallback>
        <IonIcon name="alert-circle" className="statusIcon danger" />
        <div className="statusTitle">
          Ah snap
          <span className="titleEmoji">😵</span>
        </div>
        <div className="statusInfo">
          We could not finish signing you in with Google. Please try again.
        </div>
        <div className="statusAction">
          <MyButton onClick={() => navigate(routes.AUTH, { replace: true })}>
            Back to sign in
          </MyButton>
        </div>
      </StyledGoogleCallback>
    );
  }

  return (
    <StyledGoogleCallback>
      <Spinner />
    </StyledGoogleCallback>
  );
};

export default GoogleCallback;
