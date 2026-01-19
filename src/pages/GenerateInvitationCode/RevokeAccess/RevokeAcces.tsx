import { StyledRevokeAccess } from "./RevokeAccess.styled";
import Sentinel from "../../../components/Sentinel";
import { RevokeAccessProps } from "../../../interfaces";
import RevokeAccessItem from "./RevokeAccessItem/RevokeAccessItem";
import Spinner from "../../../components/Spinner/Spinner";
import { UserInfo } from "../../../types";
import { useOutletContext } from "react-router-dom";
import { TbQrcodeOff } from "react-icons/tb";

export default function RevokeAccess({
  groupId,
  hasNextPage,
  fetchNextPage,
  isFetching,
  isFetchingNextPage,
  data,
  groupName,
  invitationCode,
  mostRecentCodeHasBeenRevoked,
}: RevokeAccessProps) {

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
      {data?.pages.flatMap((x) => x.codes).length === 0 ? (
        <div className="textAndIcon">
          <div className="textEmoji">
            <span className="text">
              No passcodes to revoke for "{groupName}"{" "}
            </span>
            <span className="emoji">🧐</span>
          </div>
          <TbQrcodeOff className="icon" />
        </div>
      ) : groupName.length > 0 ? (
        <div className="promptText">
          Select the passcode you’d like to revoke. Members who have already
          joined “{groupName}” with this code will remain in the group, but it
          will no longer work for new members.
        </div>
      ) : (
        <div className="promptText">
          Select the passcode you’d like to revoke. Members who have already
          joined with this code will remain in the group, but it will no longer
          work for new members.
        </div>
      )}

      <div className="scrollable-content">
        {data?.pages.flatMap((x) =>
          x.codes.map((code) => (
            <RevokeAccessItem
              key={code.id}
              expires={code.expires}
              id={code.id}
              maxUses={code.maxUses}
              timesUsed={code.timesUsed}
              groupId={groupId}
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
