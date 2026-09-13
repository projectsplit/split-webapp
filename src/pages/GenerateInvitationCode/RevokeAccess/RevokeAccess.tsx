import { StyledRevokeAccess } from './RevokeAccess.styled';
import Sentinel from '../../../components/Sentinel';
import { RevokeAccessProps } from '../../../interfaces';
import RevokeAccessItem from './RevokeAccessItem/RevokeAccessItem';
import Spinner from '../../../components/Spinner/Spinner';
import { TbQrcodeOff } from 'react-icons/tb';

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
  onCopied,
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

  if (data?.pages.flatMap((x) => x.codes).length === 0) {
    return (
      <StyledRevokeAccess>
        <div className="emptyState">
          <div className="msg">
            {groupName.length > 0
              ? `No passcodes to revoke for “${groupName}”`
              : 'No passcodes to revoke'}
          </div>
          <TbQrcodeOff className="icon" />
        </div>
      </StyledRevokeAccess>
    );
  }

  return (
    <StyledRevokeAccess>
      <div className="scrollable-content">
        <div className="promptText">
          {groupName.length > 0
            ? `Pick the passcode you’d like to revoke. Members who already joined “${groupName}” with it stay in the group, but it will no longer work for new members.`
            : 'Pick the passcode you’d like to revoke. Members who already joined with it stay in the group, but it will no longer work for new members.'}
        </div>

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
              onCopied={onCopied}
            />
          ))
        )}

        <Sentinel
          fetchPage={fetchNextPage}
          hasMore={hasNextPage}
          isFetchingPage={isFetchingNextPage}
        />
      </div>
    </StyledRevokeAccess>
  );
}
