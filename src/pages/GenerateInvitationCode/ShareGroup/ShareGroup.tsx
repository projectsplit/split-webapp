import { StyledShareGroup } from "./ShareGroup.styled";
import Spinner from "../../../components/Spinner/Spinner";
import { ShareGroupProps } from "../../../interfaces";
import { IoCopy } from "react-icons/io5";
import { useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import logo from "../../../styles/logo/logoRounded.png";
import MyButton from "../../../components/MyButton/MyButton";
import { copyToClipboard } from "../../../helpers/copyToClipboars";

export default function ShareGroup({
  groupName,
  isPending,
  qrRef,
  invitationCode,
  mutate,
  groupId,
  navigate,
  setInvitationCode
}: ShareGroupProps) {

  useEffect(() => {
    if (invitationCode && qrRef.current) {
      const qrCode = new QRCodeStyling({
        width: 250,
        height: 250,
        data: `https://yourapp.com/join/${invitationCode}`,
        dotsOptions: {
          color: "#000000",
          type: "rounded", // Trendy: rounded dots
        },
        cornersSquareOptions: {
          type: "extra-rounded", // Trendy: rounded corners
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
    }
  }, [invitationCode]);

  return (
    <StyledShareGroup>
      {" "}
      {invitationCode ? (
        <div>
          <div className="promptMessage">
            <div className="prompt"></div>Scan this QR code with another device
            to join <strong className="groupName">{groupName}</strong>
          </div>
          <div className="qrCodeContainer">
            {isPending ? <Spinner /> : <div className="qrCode" ref={qrRef} />}
          </div>
        </div>
      ) : null}
      {isPending ? null : (
        <div className="codentext">
          {invitationCode ? (
            <>
              <div className="text">
                Alternatively, share this code:
              </div>
              <div className="code">
                <strong>{invitationCode}</strong>
                <div
                  className="copy"
                  onClick={() => copyToClipboard(invitationCode,"http://192.168.2.2:5173/j/")}
                >
                  <IoCopy />
                </div>
              </div>
            </>
          ) : (
            <div className="text">Invitation code does not exist</div>
          )}
          <div className="buttonContainer">
            <MyButton
              onClick={() =>
                mutate(
                  { groupId: groupId  },
                  {
                    onSuccess: (code: string) => {
                      setInvitationCode(code);
                      const searchParams = new URLSearchParams(location.search);
                      searchParams.set("invitationCode", code);
                      navigate(
                        `${location.pathname}?${searchParams.toString()}`,
                        { replace: true }
                      );
                    },
                  }
                )
              }
            >
              Generate New Code
            </MyButton>
          </div>
        </div>
      )}
    </StyledShareGroup>
  );
}
