import { StyledRevokeAccess } from "./RevokeAccess.styled";
import Sentinel from "../../../components/Sentinel";
import { RevokeAccessProps } from "../../../interfaces";
import { useGetGroupJoinCodes } from "../../../api/services/useGetGroupJoinCodes";
import RevokeAccessItem from "./RevokeAccessItem/RevokeAccessItem";
import Spinner from "../../../components/Spinner/Spinner";
import { UserInfo } from "../../../types";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function RevokeAccess({
  groupId,
  groupName,
  category,
  categorySwitched,
  invitationCode,
  mostRecentCodeHasBeenRevoked
}: RevokeAccessProps) {

  const pageSize = 10;

  const { userInfo } = useOutletContext<{
    userInfo: UserInfo;
  }>();

  useEffect(() => {
    categorySwitched.value = category.value === "Revoke Access";
  }, [category.value]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetGroupJoinCodes(groupId, pageSize, categorySwitched);

  if (isFetching && !isFetchingNextPage) {
    return (
      <StyledRevokeAccess>
        <div className="spinner">
          <Spinner />
        </div>
      </StyledRevokeAccess>
    );
  }
  return (
    <StyledRevokeAccess>
      <div className="promptText">
        Select the passcode you wish to revoke. Members who have already joined
        “{groupName}” using it will remain, but the code will no longer be valid
        for future use.
      </div>

      <div className="scrollable-content">
        {data?.pages.flatMap((x) =>
          x.codes.map((code) => (
            <RevokeAccessItem
              key={code.id}
              expires={code.expires}
              id={code.id}
              maxUses={code.maxUses}
              timesUsed={code.timesUsed}
              timeZone={userInfo?.timeZone}
              groupId={groupId}
              categorySwitched={categorySwitched}
              invitationCode={invitationCode}
              mostRecentCodeHasBeenRevoked={mostRecentCodeHasBeenRevoked}

            />
          ))
        )}
        <Sentinel
          fetchNextPage={fetchNextPage}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      </div>
    </StyledRevokeAccess>
  );
}
