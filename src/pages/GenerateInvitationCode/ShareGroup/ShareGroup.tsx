import { StyledShareGroup } from "./ShareGroup.styled";
import Spinner from "../../../components/Spinner/Spinner";
import { ShareGroupProps } from "../../../interfaces";
import { IoCopy } from "react-icons/io5";
import { useEffect, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import logo from "../../../styles/logo/logoRounded.png";
import MyButton from "../../../components/MyButton/MyButton";
import { copyToClipboard } from "../../../helpers/copyToClipboars";
import { useQueryClient } from "@tanstack/react-query";
import { IoIosWarning } from "react-icons/io";
import ShimerPlaceholder from "../ShimerPlaceholder/ShimerPlaceholder";
import config from "../../../config";

export default function ShareGroup({
  groupName,
  isPending,
  qrRef,
  invitationCode,
  mutate,
  groupId,
  setInvitationCode,
  expires,
}: ShareGroupProps) {
  const pageSize = 10;
  const queryClient = useQueryClient();
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

  useEffect(() => {
    if (invitationCode && qrRef.current) {
      const qrCode = new QRCodeStyling({
        width: 250,
        height: 250,
        data: `${config.clientUrl}/j/${invitationCode}`,
        dotsOptions: {
          color: "#000000",
          type: "rounded",
        },
        cornersSquareOptions: {
          type: "extra-rounded",
        },
        backgroundOptions: {
          color: "#c5a1ff",
          round: 0.1,
        },
        image: logo,
        imageOptions: {
          crossOrigin: "anonymous",
          margin: 10,
          imageSize: 0.4,
        },
      });
      qrRef.current.innerHTML = "";
      qrCode.append(qrRef.current);
      return () => {
        if (qrRef.current) {
          qrRef.current.innerHTML = "";
        }
      };
    }
  }, [invitationCode, isPending]);

  return (
    <StyledShareGroup>
      {invitationCode && !isPending ? (
        <div>
          {groupName.length > 0 ? (
            <div className="promptMessage">
              Scan this QR code with another device to join{" "}
              <strong className="groupName">{groupName}</strong>
            </div>
          ) : (
            <div className="promptMessage">
              Scan this QR code with another device
            </div>
          )}
          <div className="qrCodeContainer">
            <div className="qrCode" ref={qrRef} />
          </div>
        </div>
      ) : isPending ? (
        <div className="qrCodeContainer">
          <Spinner />
        </div>
      ) : (
        <div className="text">Invitation code does not exist</div>
      )}
      <div className="codentext">
        {invitationCode && !isPending ? (
          <>
            <div className="text">Alternatively, share this code:</div>
            <div className="code">
              <strong>{invitationCode}</strong>
              <div
                className="copy"
                onClick={() =>
                  copyToClipboard(invitationCode, `${config.clientUrl}/j/`)
                }
              >
                <IoCopy />
              </div>
            </div>
            <div className="expires">
              {!timeLeft.length || timeLeft === "NaN" ? (
                <ShimerPlaceholder />
              ) : timeLeft && timeLeft === "Expired" ? (
                <span className="text">
                  <IoIosWarning /> Expired
                </span>
              ) : timeLeft && timeLeft.length > 0 ? (
                <span>Expires in: {timeLeft}</span>
              ) : null}
            </div>
          </>
        ) : null}
        <div className="buttonContainer">
          <MyButton
            onClick={() =>
              mutate(
                { groupId: groupId },
                {
                  onSuccess: (code: string) => {
                    queryClient.invalidateQueries({
                      queryKey: ["getGroupJoinCodes", groupId, pageSize],
                    });
                    setInvitationCode(code);
                  },
                }
              )
            }
          >
            Generate New Code
          </MyButton>
        </div>
      </div>
    </StyledShareGroup>
  );
}
