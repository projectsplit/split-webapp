import MyButton from '../../../MyButton/MyButton';
import { useRemoveGuestFromGroup } from '../../../../api/auth/CommandHooks/useRemoveGuestFromGroup';
import { MemberItemProps } from '../../../../interfaces';
import { getInitials } from '../../../../helpers/getInitials';
import { StyledMemberItem } from './MemberItem.styled';

export default function MemberItem({
  member,
  groupId,
  noGroupError,
  noMemberError,
  isGuest,
  canBeRemoved,
  onCannotRemoveClick,
  newMembers,
}: MemberItemProps) {
  const { mutate: removeGuest, isPending: isPendingGuest } =
    useRemoveGuestFromGroup(groupId, noGroupError, noMemberError);

  const locked = isGuest && !canBeRemoved;

  const handleClick = () => {
    if (!canBeRemoved) {
      onCannotRemoveClick();
      return;
    }
    isGuest ? removeGuest(member.id) : null;
    if (newMembers) {
      newMembers.value = newMembers.value.filter((m) => m.name !== member.name);
    }
  };

  return (
    <StyledMemberItem>
      <span className="avatar">{getInitials(member.name)}</span>

      <div className="memberIdentity">
        <div className="memberName">{member.name}</div>
        {isGuest ? (
          <div className="memberMeta">
            {canBeRemoved
              ? 'No recorded spending'
              : 'Involved in expenses or transfers'}
          </div>
        ) : null}
      </div>

      {locked ? (
        <span className="chip" onClick={onCannotRemoveClick}>
          Locked
        </span>
      ) : (
        <MyButton
          variant="secondary"
          size="compact"
          isLoading={isPendingGuest}
          onClick={handleClick}
        >
          Remove
        </MyButton>
      )}
    </StyledMemberItem>
  );
}
