import { useEffect, useRef, useState } from "react";
import { StyledGenerateInvitationCode } from "./GenerateInvitationCode.styled";
import { useNavigate, useParams } from "react-router-dom";
import { useGenerateInvitationCode } from "../../api/services/useGenerateInvitationCode";
import { IoClose } from "react-icons/io5";
import { CategorySelector } from "../../components/CategorySelector/CategorySelector";
import { useSignal } from "@preact/signals-react";
import ShareGroup from "./ShareGroup/ShareGroup";
import RevokeAccess from "./RevokeAccess/RevokeAcces";
import useGroup from "../../api/services/useGroup";
import { useGetGroupJoinCodes } from "../../api/services/useGetGroupJoinCodes";
import { useQueryClient } from "@tanstack/react-query";

export default function GenerateInvitationCode() {
  const pageSize = 10;
  const queryClient = useQueryClient();
  const params = useParams();
  const navigate = useNavigate();
  const [invitationCode, setInvitationCode] = useState<string | null>(
    new URLSearchParams(location.search).get("invitationcode")
  );
  const [groupName, setGroupName] = useState<string>(
    new URLSearchParams(location.search).get("groupname") || ""
  );
  const qrRef = useRef<HTMLDivElement>(null);
  const category = useSignal<string>("Share Group");
  const mostRecentCodeHasBeenRevoked = useSignal<boolean>(true);
  const isFirstRender = useRef(true);
  const landedFromGroup = new URLSearchParams(location.search).get("in");

  const { mutate: mutateGenerate, isPending: isPendingGenerate } =
    useGenerateInvitationCode();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetGroupJoinCodes(params.groupid || "", pageSize);

  const codesData = data?.pages.flatMap((x) => x.codes) || [];

  const validCodeAlreadyExists =
    codesData &&
    codesData.length > 0 &&
    codesData[0].timesUsed < codesData[0].maxUses &&
    new Date(codesData[0].expires) >= new Date();

  const group = useGroup(params.groupid);

  useEffect(() => {
    if (group?.data?.name && !groupName) {
      setGroupName(group.data.name);
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("groupname", encodeURIComponent(group.data.name));
    }
  }, [group?.data?.name, groupName]);

  useEffect(() => {
    if (isFetching) return;
    const searchParams = new URLSearchParams(location.search);

    if (validCodeAlreadyExists) {
      setInvitationCode(codesData[0].id);
      searchParams.set("invitationcode", codesData[0].id);
      mostRecentCodeHasBeenRevoked.value = false;
      isFirstRender.current = false;
    } else if (mostRecentCodeHasBeenRevoked.value || isFirstRender.current) {
      mutateGenerate(
        { groupId: params.groupid || "" },
        {
          onSuccess: (code: string) => {
            setInvitationCode(code);
            searchParams.set("invitationcode", code);
            mostRecentCodeHasBeenRevoked.value = false;
            isFirstRender.current = false;

            queryClient.invalidateQueries({
              queryKey: ["getGroupJoinCodes", params.groupid || "", pageSize],
            });
          },
        }
      );
    }
  }, [mutateGenerate, category.value, isFetching]);

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
            onClick={() => {
              if (landedFromGroup === "true") {
                navigate(`/groups/${params.groupid}`, { replace: true });
              } else {
                navigate("/groups", { replace: true });
              }
            }}
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
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetching={isFetching}
          isFetchingNextPage={isFetchingNextPage}
          data={data}
          groupName={groupName}
          mostRecentCodeHasBeenRevoked={mostRecentCodeHasBeenRevoked}
          invitationCode={invitationCode}
        />
      )}
    </StyledGenerateInvitationCode>
  );
}
