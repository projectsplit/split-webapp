import { StyledRevokeAccessItem } from "./RevokeAccessItem.styled";
import MyButton from "../../../../components/MyButton/MyButton";
import { RevokeAccessItemProps } from "../../../../interfaces";
import { FormatDateTime } from "../../../../helpers/timeHelpers";
import { useRevokeInvitationCode } from "../../../../api/services/useRevokeInvitationCode";
import { IoCopy } from "react-icons/io5";
import { copyToClipboard } from "../../../../helpers/copyToClipboars";

export default function RevokeAccessItem({
  expires,
  id,
  maxUses,
  timesUsed,
  timeZone,
  groupId,
  invitationCode,
  mostRecentCodeHasBeenRevoked,
}: RevokeAccessItemProps) {
  const { mutate: mutateRevoke, isPending: isPendingRevoke } =
    useRevokeInvitationCode(
      groupId || "",
      10,
      invitationCode,
      mostRecentCodeHasBeenRevoked
    );

  return (
    <StyledRevokeAccessItem>
      {" "}
      <div className="codeAndCopy" onClick={()=>copyToClipboard(id,"http://192.168.2.2:5173/j/")}>
        <div className="code"> {id} </div>
        <IoCopy />
      </div>
      <div className="infoAndRevokeButton">
        <div className="infoContainer">
          <div className="infoAndData">
            <div className="info">Expires:</div>{" "}
            <div className="data">{FormatDateTime(expires, timeZone)}</div>
          </div>
          <div className="infoAndData">
            <div className="info">Times Used:</div>
            <div className="data">
              {timesUsed}/{maxUses}
            </div>
          </div>
        </div>
        <div className="revokeButton">
          <MyButton
            onClick={() => mutateRevoke({ code: id })}
            isLoading={isPendingRevoke}
          >
            Revoke
          </MyButton>
        </div>
      </div>
    </StyledRevokeAccessItem>
  );
}
