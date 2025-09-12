import { StyledRevokeAccessItem } from "./RevokeAccessItem.styled";
import MyButton from "../../../../components/MyButton/MyButton";
import { RevokeAccessItemProps } from "../../../../interfaces";
import { useRevokeInvitationCode } from "../../../../api/services/useRevokeInvitationCode";
import { IoCopy } from "react-icons/io5";
import { copyToClipboard } from "../../../../helpers/copyToClipboars";
import { useEffect, useState } from "react";
import { IoIosWarning } from "react-icons/io";
import ShimerPlaceholder from "../../ShimerPlaceholder/ShimerPlaceholder";

export default function RevokeAccessItem({
  expires,
  id,
  maxUses,
  timesUsed,
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

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const expiry = new Date(expires);
      const diff = expiry.getTime() - now.getTime();
      if (diff < 0) {
        setTimeLeft("Expired");
        clearInterval(interval);
      } else {
        // const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        // setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
       if (isNaN(minutes) || isNaN(seconds)) {
          setTimeLeft("NaN");
        } else if (minutes === 0) {
          setTimeLeft(`${seconds}s`);
        } else {
          setTimeLeft(`${minutes}m ${seconds}s`);
        }
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [expires]);

  return (
    <StyledRevokeAccessItem>
      {" "}
      <div
        className="codeAndCopy"
        onClick={() => copyToClipboard(id, "https://abcsplit.uk/j/")}
      >
        <div className="code"> {id} </div>
        <IoCopy />
      </div>
      <div className="infoAndRevokeButton">
        <div className="infoContainer">
          <div className="infoAndData">
            {!timeLeft.length  || timeLeft === "NaN" ? (
           <ShimerPlaceholder/>
            ) : (
              <div className="expires">
                {timeLeft && timeLeft === "Expired" ? (
                  <span className="text">
                    <IoIosWarning /> Expired
                  </span>
                ) : timeLeft && timeLeft.length > 0 ? (
                  <span className="expiresInAndTimeLeft">
                    <div className="info">Expires in:</div> <span>{timeLeft}</span>
                  </span>
                ) : null}
              </div>
            )}{" "}
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
