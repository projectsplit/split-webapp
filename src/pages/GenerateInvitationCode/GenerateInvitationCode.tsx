import React, { useEffect, useRef, useState } from "react";
import { StyledGenerateInvitationCode } from "./GenerateInvitationCode.styled";
import { useNavigate, useParams } from "react-router-dom";
import { useGenerateInvitationCode } from "../../api/services/useGenerateInvitationCode";
import { IoClose, IoCopy } from "react-icons/io5";


import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { useSignal } from "@preact/signals-react";
import ShareGroup from "./ShareGroup/ShareGroup";
import RevokeAccess from "./RevokeAccess/RevokeAcces";

export default function GenerateInvitationCode() {
  const params = useParams();
  const navigate = useNavigate();
  const [invitationCode, setInvitationCode] = useState<string | null>(null);
  const groupName = new URLSearchParams(location.search).get("groupName") || "";
  const qrRef = useRef<HTMLDivElement>(null);
  const category = useSignal<string>("Revoke Access");

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
  }, [mutate,category.value]);


  return (
    <StyledGenerateInvitationCode>
      <div className="fixed-header-container">
        <div className="header">
          <div className="gap"></div>
          <div className="title">
            <CategorySelector
              activeCat={"Invite User"}
              categories={{
                cat1: "Share Group",
                cat2: "Revoke Access",
              }}
              navLinkUse={false}
              activeCatAsState={category}
            />
          </div>

          <div
            className="closeButtonContainer"
            onClick={() => navigate("/groups")}
          >
            <IoClose className="closeButton" />
          </div>
        </div>
      </div>
      {category.value === "Share Group" ? (
        <ShareGroup
          groupName={groupName}
          isPending={isPending}
          qrRef={qrRef}
          invitationCode={invitationCode}
        />
      ) : (
        <RevokeAccess groupId={params.groupid || ""} groupName={groupName}/>
      )}
    </StyledGenerateInvitationCode>
  );
}
