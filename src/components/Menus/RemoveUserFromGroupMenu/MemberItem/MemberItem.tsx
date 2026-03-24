import MyButton from '../../../MyButton/MyButton';
import { useRemoveMemberFromGroup } from '../../../../api/auth/CommandHooks/useRemoveMemberFromGroup';
import { useRemoveGuestFromGroup } from '../../../../api/auth/CommandHooks/useRemoveGuestFromGroup';
import { MemberItemProps } from '../../../../interfaces';

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
    <div className="memberWithButton">
      {isGuest ? (
        <div className="guestWrap">
          <span className="name">{member.name}*</span>
          <span className="guest">guest*</span>
        </div>
      ) : (
        <span className="name">{member.name}</span>
      )}

      <MyButton
        variant="secondary"
        isLoading={isPendingGuest}
        onClick={handleClick}
      >
        Remove
      </MyButton>
    </div>
  );
}
