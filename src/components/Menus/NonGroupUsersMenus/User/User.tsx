import { StyledUser } from './User.styled';
import { UserProps } from '../../../../interfaces';
import { getInitials } from '../../../../helpers/getInitials';

export default function User({
  name,
  onClick,
  userId,
  nonGroupTransferMenu,
  currentUserId,
}: UserProps) {
  const { attribute, senderId, receiverId } = nonGroupTransferMenu.value;
  const selectedUserId = attribute === 'sender' ? senderId : receiverId;

  const role =
    userId && userId === senderId
      ? 'From'
      : userId && userId === receiverId
        ? 'To'
        : null;

  const displayName = userId === currentUserId ? 'You' : name;

  const takenByOtherSide =
    attribute === 'sender' ? userId === receiverId : userId === senderId;

  return (
    <StyledUser $isSelected={userId === selectedUserId}>
      {' '}
      <div
        className={`top-row${takenByOtherSide ? ' taken' : ''}`}
        onClick={takenByOtherSide ? undefined : onClick}
      >
        <span className="avatar">{getInitials(name)}</span>
        <div className="name">{displayName}</div>
        {role ? (
          <span
            className={`sideTag${userId === selectedUserId ? ' picked' : ''}`}
          >
            {role}
          </span>
        ) : null}
      </div>
    </StyledUser>
  );
}
