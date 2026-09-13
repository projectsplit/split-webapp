import React, { useCallback, useEffect } from 'react';
import { StyledJoin } from './Join.styled';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { useJoinWithCode } from '../../api/auth/CommandHooks/useJoinWithCode';
import MyButton from '../../components/MyButton/MyButton';
import { useGetJoinCode } from '../../api/auth/QueryHooks/useGetJoinCode';
import routes from '../../routes';
import Spinner from '../../components/Spinner/Spinner';
import IonIcon from '@reacticons/ionicons';
import { useSignal } from '@preact/signals-react';

const Join: React.FC = () => {
  const errorMessage = useSignal<string>('');
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const {
    data,
    isPending: getJoinCodeLoading,
    isError,
  } = useGetJoinCode(code ?? '');
  const { mutate, isPending } = useJoinWithCode(errorMessage);

  const navigateToGroup = useCallback(
    (groupId: string) =>
      navigate(generatePath(routes.GROUP, { groupid: groupId }), {
        replace: true,
      }),
    [navigate]
  );

  useEffect(() => {
    if (!code) {
      navigate(routes.ROOT, { replace: true });
    }
  }, [code, navigate]);

  useEffect(() => {
    if (data?.isAlreadyMember) {
      navigateToGroup(data.groupId);
    }
  }, [data, navigateToGroup]);

  if (!code) return null;

  if (isError) {
    return (
      <StyledJoin>
        <div className="dialogHeader">
          <IonIcon name="warning-outline" className="dialogIcon danger" />
          <div className="dialogTitle">Ah snap 😵</div>
        </div>
        <div className="info">
          This invitation has either expired or has been revoked.
        </div>
        <div className="buttons">
          <MyButton
            variant="secondary"
            onClick={() => navigate(routes.ROOT, { replace: true })}
          >
            Close
          </MyButton>
        </div>
      </StyledJoin>
    );
  }

  if (getJoinCodeLoading || !data) {
    return (
      <StyledJoin>
        <div className="spinner">
          <Spinner />
        </div>
      </StyledJoin>
    );
  }

  if (data.isAlreadyMember) {
    return null;
  }

  return (
    <StyledJoin>
      <div className="dialogHeader">
        <IonIcon name="people-outline" className="dialogIcon" />
        <div className="dialogTitle">Invitation</div>
      </div>
      {errorMessage.value.length > 0 ? (
        <>
          <div className="info">{errorMessage.value} 😖</div>
          <div className="buttons">
            <MyButton
              variant="secondary"
              onClick={() => navigate(routes.ROOT, { replace: true })}
            >
              Decline
            </MyButton>
          </div>
        </>
      ) : (
        <>
          <div className="info">
            You have been invited to join <strong>{data.groupName}</strong>
          </div>
          <div className="buttons">
            <MyButton
              isLoading={isPending}
              onClick={() =>
                mutate({
                  code,
                  onSuccess: () => navigateToGroup(data.groupId),
                })
              }
            >
              Accept
            </MyButton>
            <MyButton
              variant="secondary"
              onClick={() => navigate(routes.ROOT, { replace: true })}
            >
              Decline
            </MyButton>
          </div>
        </>
      )}
    </StyledJoin>
  );
};

export default Join;
