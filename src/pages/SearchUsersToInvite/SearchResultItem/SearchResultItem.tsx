import { Signal } from "@preact/signals-react";
import { useRevokeInvitation } from "../../../api/services/useRevokeInvitation";
import { useSendInvitation } from "../../../api/services/useSendInvitation";
import MyButton from "../../../components/MyButton/MyButton";

export const SearchResultItem: React.FC<{
  userId: string;
  username: string;
  isAlreadyInvited: boolean;
  isGroupMember: boolean;
  groupId: string;
  onInviteSuccess: () => void;
  guestId?: string;
  userInvitationSent: Signal<boolean>
  guestName?: string
}> = ({
  userId,
  username,
  isAlreadyInvited,
  isGroupMember,
  groupId,
  onInviteSuccess,
  guestId,
  userInvitationSent,
  guestName
}) => {

    const { mutate: revoke, isPending: isRevoking, isError: isRevokeError } =
      useRevokeInvitation(userInvitationSent);
    const { mutate: send, isPending: isSending, isError: isSendError } =
      useSendInvitation(userInvitationSent);

    const isPending = isAlreadyInvited ? isRevoking : isSending;
    const isError = isAlreadyInvited ? isRevokeError : isSendError;

    if (isGroupMember) {
      return (
        <div className="search-result">
          <div className="top-row">
            <div>{username}</div>
          </div>
          <div className="bottom-row">already a member</div>
        </div>
      );
    }

    const onClick = () => {
      if (isAlreadyInvited) {
        revoke({
          groupId,
          receiverId: userId,
          onSuccess: onInviteSuccess,
        });
      } else {
        send({
          groupId,
          guestId: guestId && guestId != "" ? guestId : null,
          receiverId: userId,
          onSuccess: onInviteSuccess,
          guestName: guestName && guestName != "" ? guestName : null,
        });
      }
    };

    return (
      <div className="search-result">
        <div className="top-row">
          <div>{username}</div>
          <MyButton
            isLoading={isPending}
            variant={isAlreadyInvited ? "secondary" : "primary"}
            onClick={isPending ? undefined : onClick}
            hasFailed={isError}
          >
            {isAlreadyInvited ? "Uninvite" : "Invite"}
          </MyButton>
        </div>
      </div>
    );
  };