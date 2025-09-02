import React, { useEffect, useRef, useState } from "react";
import { StyledGenerateInvitationCode } from "./GenerateInvitationCode.styled";
import { useNavigate, useParams } from "react-router-dom";
import { useGenerateInvitationCode } from "../../api/services/useGenerateInvitationCode";
import { IoClose } from "react-icons/io5";
import QRCodeStyling from "qr-code-styling";
import logo from "../../styles/logo/logo.png";
import Spinner from "../../components/Spinner/Spinner";

export default function GenerateInvitationCode() {
  const params = useParams();
  const navigate = useNavigate();
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const groupName = new URLSearchParams(location.search).get("groupName") || "";
  const qrRef = useRef<HTMLDivElement>(null);
  const { mutate, isPending } = useGenerateInvitationCode();

  useEffect(() => {
    mutate(
      { groupId: params.groupid || "" },
      {
        onSuccess: (code: string) => {
          setInvitationCode(code);
        },
      }
    );
  }, [, mutate]);

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
    <StyledGenerateInvitationCode>
      <div className="header">
        <div className="gap"></div>
        <div className="title">Share group</div>
        <div
          className="closeButtonContainer"
          onClick={() => navigate("/groups")}
        >
          <IoClose className="closeButton" />
        </div>
      </div>
      <div className="promptMessage">
        <div className="prompt"></div>Scan this QR code with another device to
        join <strong className="groupName">{groupName}</strong>
      </div>
      <div className="qrCodeContainer">
        {isPending ? <Spinner /> : <div className="qrCode" ref={qrRef} />}
      </div>
      <div className="codentext">
        <div className="text">
          {" "}
          Alternatively, share this code with a user:
        </div>
        <div className="code"><strong>{invitationCode}</strong></div>
      </div>
    </StyledGenerateInvitationCode>
  );
}
