import { useEffect, useRef, useState } from "react";
import { StyledGenerateInvitationCode } from "./GenerateInvitationCode.styled";
import { useNavigate, useParams } from "react-router-dom";
import { useGenerateInvitationCode } from "../../api/services/useGenerateInvitationCode";
import { IoClose } from "react-icons/io5";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { useSignal } from "@preact/signals-react";
import ShareGroup from "./ShareGroup/ShareGroup";
import RevokeAccess from "./RevokeAccess/RevokeAcces";

export default function GenerateInvitationCode() {
  const params = useParams();
  const navigate = useNavigate();
  const [invitationCode, setInvitationCode] = useState<string | null>(
    new URLSearchParams(location.search).get("invitationCode")
  );
  const groupName = new URLSearchParams(location.search).get("groupName") || "";
  const qrRef = useRef<HTMLDivElement>(null);
  const category = useSignal<string>("Share Group");
  const categorySwitched = useSignal(category.value === "Revoke Access");
  const mostRecentCodeHasBeenRevoked = useSignal<boolean>(true);
  const isFirstRender = useRef(true);
  const { mutate: mutateGenerate, isPending: isPendingGenerate } =
    useGenerateInvitationCode();


  useEffect(() => {
    if (mostRecentCodeHasBeenRevoked.value ||isFirstRender.current) {
      mutateGenerate(
        { groupId: params.groupid || "" },
        {
          onSuccess: (code: string) => {
            setInvitationCode(code);
            const searchParams = new URLSearchParams(location.search);
            searchParams.set("invitationCode", code);
            navigate(`${location.pathname}?${searchParams.toString()}`, {
              replace: true,
            });
            mostRecentCodeHasBeenRevoked.value = false;
            isFirstRender.current = false;
          },
        }
      );
    }
  }, [mutateGenerate, category.value]);

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
          isPending={isPendingGenerate}
          qrRef={qrRef}
          invitationCode={invitationCode}
          mutate={mutateGenerate}
          groupId={params.groupid || ""}
          navigate={navigate}
          setInvitationCode={setInvitationCode}
        />
      ) : (
        <RevokeAccess
          groupId={params.groupid || ""}
          groupName={groupName}
          category={category}
          categorySwitched={categorySwitched}
          mostRecentCodeHasBeenRevoked={mostRecentCodeHasBeenRevoked}
          invitationCode={invitationCode}
        />
      )}
    </StyledGenerateInvitationCode>
  );
}
