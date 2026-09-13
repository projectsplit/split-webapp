import { useEffect, useRef, useState } from 'react';
import { StyledGenerateInvitationCode } from './GenerateInvitationCode.styled';
import { useNavigate, useParams } from 'react-router-dom';
import { useGenerateInvitationCode } from '../../api/auth/CommandHooks/useGenerateInvitationCode';
import { IoClose } from 'react-icons/io5';
import IonIcon from '@reacticons/ionicons';
import { CategorySelector } from '../../components/CategorySelector/CategorySelector';
import { useSignal } from '@preact/signals-react';
import ShareGroup from './ShareGroup/ShareGroup';
import RevokeAccess from './RevokeAccess/RevokeAccess';
import useGroup from '../../api/auth/QueryHooks/useGroup';
import { useGetGroupJoinCodes } from '../../api/auth/QueryHooks/useGetGroupJoinCodes';
import { useQueryClient } from '@tanstack/react-query';

const INVITATION_CATEGORIES = {
  cat1: 'Share Group',
  cat2: 'Revoke Access',
};

export default function GenerateInvitationCode() {
  const pageSize = 10;
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const [copyResult, setCopyResult] = useState<'copied' | 'failed' | null>(
    null
  );
  const copyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [groupName, setGroupName] = useState<string>('');
  const qrRef = useRef<HTMLDivElement>(null);
  const category = useSignal<string>('Share Group');
  const mostRecentCodeHasBeenRevoked = useSignal<boolean>(true);
  const isFirstRender = useRef(true);
  const landedFromGroup = new URLSearchParams(location.search).get('in');
  const { mutate: mutateGenerate, isPending: isPendingGenerate } =
    useGenerateInvitationCode();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetGroupJoinCodes(params.groupid || '', pageSize);

  const codesData = data?.pages.flatMap((x) => x.codes) || [];

  const validCodeAlreadyExists =
    codesData &&
    codesData.length > 0 &&
    codesData[0].timesUsed < codesData[0].maxUses &&
    new Date(codesData[0].expires) >= new Date();

  const group = useGroup(params.groupid);

  useEffect(() => {
    if (group?.data?.name && !groupName) {
      setGroupName(group.data.name);
    }
  }, [group?.data?.name, groupName]);

  useEffect(() => {
    if (isFetching) return;
    if (validCodeAlreadyExists) {
      setInvitationCode(codesData[0].id);
      mostRecentCodeHasBeenRevoked.value = false;
      isFirstRender.current = false;
    } else if (mostRecentCodeHasBeenRevoked.value || isFirstRender.current) {
      mutateGenerate(
        { groupId: params.groupid || '' },
        {
          onSuccess: (code: string) => {
            setInvitationCode(code);
            mostRecentCodeHasBeenRevoked.value = false;
            isFirstRender.current = false;

            queryClient.invalidateQueries({
              queryKey: ['getGroupJoinCodes', params.groupid || '', pageSize],
            });
          },
        }
      );
    }
  }, [mutateGenerate, category.value, isFetching]);

  useEffect(() => {
    return () => {
      if (copyTimeout.current) clearTimeout(copyTimeout.current);
    };
  }, []);

  const handleCopied = (copied: boolean) => {
    if (copyTimeout.current) clearTimeout(copyTimeout.current);
    setCopyResult(copied ? 'copied' : 'failed');
    copyTimeout.current = setTimeout(() => setCopyResult(null), 2200);
  };

  return (
    <StyledGenerateInvitationCode>
      <div className="fixed-header-container">
        <div className="header">
          <div className="headerSpacer" />
          <div className="sheetTitle">Invite</div>
          <div
            className="closeButtonContainer"
            onClick={() => {
              if (landedFromGroup === 'true') {
                navigate(`/shared/${params.groupid}`, { replace: true });
              } else {
                navigate('/shared', { replace: true });
              }
            }}
          >
            <IoClose className="closeButton" />
          </div>
        </div>
        <div className="sheetControls">
          <CategorySelector
            variant="segmented"
            activeCat={'Invite User'}
            categories={INVITATION_CATEGORIES}
            navLinkUse={false}
            activeCatAsState={category}
          />
        </div>
      </div>
      {category.value === 'Share Group' ? (
        <ShareGroup
          groupName={groupName}
          isPending={isPendingGenerate || isFetching}
          qrRef={qrRef}
          invitationCode={invitationCode}
          mutate={mutateGenerate}
          groupId={params.groupid || ''}
          setInvitationCode={setInvitationCode}
          expires={codesData[0]?.expires}
          onCopied={handleCopied}
        />
      ) : (
        <RevokeAccess
          groupId={params.groupid || ''}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          data={data}
          groupName={groupName}
          mostRecentCodeHasBeenRevoked={mostRecentCodeHasBeenRevoked}
          invitationCode={invitationCode}
          onCopied={handleCopied}
        />
      )}

      {copyResult && (
        <div className={`toast${copyResult === 'failed' ? ' failed' : ''}`}>
          <IonIcon
            name={
              copyResult === 'copied'
                ? 'checkmark-circle-outline'
                : 'alert-circle-outline'
            }
            className="toastIcon"
          />
          {copyResult === 'copied'
            ? 'Invite link copied'
            : 'Could not copy the link'}
        </div>
      )}
    </StyledGenerateInvitationCode>
  );
}
