import { StyledShareGroup } from "./ShareGroup.styled";
import Spinner from "../../../components/Spinner/Spinner";
import { ShareGroupProps } from "../../../interfaces";
import { IoCopy } from "react-icons/io5";
import { useEffect } from "react";
import QRCodeStyling from "qr-code-styling";
import logo from "../../../styles/logo/logoRounded.png"

export default function ShareGroup({
  groupName,
  isPending,
  qrRef,
  invitationCode,
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
      <div className="promptMessage">
        <div className="prompt"></div>Scan this QR code with another device to
        join <strong className="groupName">{groupName}</strong>
      </div>
      <div className="qrCodeContainer">
        {isPending ? <Spinner /> : <div className="qrCode" ref={qrRef} />}
      </div>
      {isPending ? null : (
        <div className="codentext">
          {invitationCode ? (
            <>
              <div className="text">
                Alternatively, share this code with a user:
              </div>
              <div className="code">
                <strong>{invitationCode}</strong>
                <div
                  className="copy"
                  onClick={() => {
                    if (!invitationCode) return;

                    if (navigator.clipboard) {
                      navigator.clipboard
                        .writeText(invitationCode)
                        .catch((err) => console.error("Failed to copy: ", err));
                    } else {
                      const textarea = document.createElement("textarea");
                      textarea.value = invitationCode;
                      document.body.appendChild(textarea);
                      textarea.select();
                      try {
                        document.execCommand("copy");
                      } catch (err) {
                        console.error("Fallback copy failed: ", err);
                      }
                      document.body.removeChild(textarea);
                    }
                  }}
                >
                  <IoCopy />
                </div>
              </div>
            </>
          ) : (
            <div className="text">Invitation code does not exist</div>
          )}
        </div>
      )}
    </StyledShareGroup>
  );
}
