import { Signal } from "@preact/signals-react";
import MyButton from "../../../MyButton/MyButton";
import { useRemoveMemberFromGroup } from "../../../../api/services/useRemoveMemberFromGroup";
import { useRemoveGuestFromGroup } from "../../../../api/services/useRemoveGuestFromGroup";

interface MemberItemProps {
  member: {
    id: string;
    name: string;
  };
  groupId: string | undefined;
  noGroupError: Signal<string>;
  noMemberError: Signal<string>;
  isGuest: boolean;
  canBeRemoved: boolean;
  onCannotRemoveClick: () => void;
}

export default function MemberItem({
  member,
  groupId,
  noGroupError,
  noMemberError,
  isGuest,
  canBeRemoved,
  onCannotRemoveClick,
}: MemberItemProps) {

  const { mutate: removeUser, isPending: isPendingMember } =
    useRemoveMemberFromGroup(groupId, noGroupError, noMemberError);
  const { mutate: removeGuest, isPending: isPendingGuest } =
    useRemoveGuestFromGroup(groupId, noGroupError, noMemberError);

  const handleClick = () => {
    if (!canBeRemoved) {
      onCannotRemoveClick();
      return;
    }
    isGuest ? removeGuest(member.id) : removeUser(member.id);
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
        isLoading={isPendingMember || isPendingGuest}
        onClick={handleClick}
      >
        Remove
      </MyButton>
    </div>
  );
}
