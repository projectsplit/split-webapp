import { Signal } from '@preact/signals-react';
import { useRevokeInvitation } from '../../../api/auth/CommandHooks/useRevokeInvitation';
import { useSendInvitation } from '../../../api/auth/CommandHooks/useSendInvitation';
import MyButton from '../../../components/MyButton/MyButton';
import { getInitials } from '../../../helpers/getInitials';
import { StyledSearchResultItem } from './SearchResultItem.styled';

export const SearchResultItem: React.FC<{
  userId: string;
  username: string;
  isAlreadyInvited: boolean;
  isGroupMember: boolean;
  groupId: string;
  onInviteSuccess: (wasInvited: boolean) => void;
  guestId?: string;
  userInvitationSent: Signal<boolean>;
  guestName?: string;
}> = ({
  userId,
  username,
  isAlreadyInvited,
  isGroupMember,
  groupId,
  onInviteSuccess,
  guestId,
  userInvitationSent,
  guestName,
}) => {
  const {
    mutate: revoke,
    isPending: isRevoking,
    isError: isRevokeError,
  } = useRevokeInvitation(userInvitationSent);
  const {
    mutate: send,
    isPending: isSending,
    isError: isSendError,
  } = useSendInvitation(userInvitationSent);

  const isPending = isAlreadyInvited ? isRevoking : isSending;
  const isError = isAlreadyInvited ? isRevokeError : isSendError;

  if (isGroupMember) {
    return (
      <StyledSearchResultItem>
        <span className="avatar">{getInitials(username)}</span>
        <div className="resultName muted">{username}</div>
        <span className="chip">In group</span>
      </StyledSearchResultItem>
    );
  }

  const onClick = () => {
    if (isAlreadyInvited) {
      revoke({
        groupId,
        receiverId: userId,
        onSuccess: () => onInviteSuccess(!isAlreadyInvited),
      });
    } else {
      send({
        groupId,
        guestId: guestId && guestId != '' ? guestId : null,
        receiverId: userId,
        onSuccess: () => onInviteSuccess(!isAlreadyInvited),
        guestName: guestName && guestName != '' ? guestName : null,
      });
    }
  };

  return (
    <StyledSearchResultItem>
      <span className="avatar">{getInitials(username)}</span>
      <div className="resultName">{username}</div>
      <MyButton
        isLoading={isPending}
        size="compact"
        variant={isAlreadyInvited ? 'secondary' : 'primary'}
        onClick={isPending ? undefined : onClick}
        hasFailed={isError}
      >
        {isAlreadyInvited ? 'Cancel' : 'Invite'}
      </MyButton>
    </StyledSearchResultItem>
  );
};
