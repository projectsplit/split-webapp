import { StyledRevokeAccessItem } from './RevokeAccessItem.styled';
import MyButton from '../../../../components/MyButton/MyButton';
import { RevokeAccessItemProps } from '../../../../interfaces';
import { useRevokeInvitationCode } from '../../../../api/auth/CommandHooks/useRevokeInvitationCode';
import { IoCopy } from 'react-icons/io5';
import { copyToClipboard } from '../../../../helpers/copyToClipboars';
import { IoIosWarning } from 'react-icons/io';
import ShimmerPlaceholder from '../../ShimmerPlaceholder/ShimmerPlaceholder';
import config from '../../../../config';
import { useTimeLeft } from '@/hooks/useTimeLeft';

export default function RevokeAccessItem({
  expires,
  id,
  maxUses,
  timesUsed,
  groupId,
  invitationCode,
  mostRecentCodeHasBeenRevoked,
  onCopied,
}: RevokeAccessItemProps) {
  const { mutate: mutateRevoke, isPending: isPendingRevoke } =
    useRevokeInvitationCode(
      groupId || '',
      10,
      invitationCode,
      mostRecentCodeHasBeenRevoked
    );

  const timeLeft = useTimeLeft(expires);

  const isExpired = timeLeft === 'Expired';

  return (
    <StyledRevokeAccessItem>
      <div className="codeAndCopy">
        <div className="code">{id}</div>
        <div
          className="copyButton"
          onClick={async () =>
            onCopied(await copyToClipboard(id, `${config.clientUrl}/j/`))
          }
        >
          <IoCopy />
        </div>
      </div>

      <div className="metaAndRevoke">
        <div className="meta">
          {!timeLeft.length || timeLeft === 'NaN' ? (
            <ShimmerPlaceholder />
          ) : isExpired ? (
            <span className="expired">
              <IoIosWarning /> Expired
            </span>
          ) : (
            <span>Expires in {timeLeft}</span>
          )}
          <span className="sep">&middot;</span>
          <span>
            Used {timesUsed}/{maxUses}
          </span>
        </div>

        <MyButton
          variant="secondary"
          size="compact"
          onClick={() => mutateRevoke({ code: id })}
          isLoading={isPendingRevoke}
        >
          Revoke
        </MyButton>
      </div>
    </StyledRevokeAccessItem>
  );
}
