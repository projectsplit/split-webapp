import IonIcon from '@reacticons/ionicons';
import { NotificationsMenuProps } from '../../../interfaces';
import { StyledNotificationsMenu } from './NotificationsMenu.styled';
import { IoIosNotificationsOff } from 'react-icons/io';
import Sentinel from '../../Sentinel';
import Invitation from '../../Invitation/Invitation';
import ConnectionRequest from '../../ConnectionRequest/ConnectionRequest';
import Separator from '../../Separator/Separator';
import { useEffect } from 'react';
import { useLastViewedNotification } from '../../../api/auth/CommandHooks/useLastViewedNotification';
import { useGetUserInvitations } from '../../../api/auth/QueryHooks/useGetUserInvitations';
import { useGetConnectionRequests } from '../../../api/auth/QueryHooks/useGetConnectionRequests';
import Spinner from '../../Spinner/Spinner';

export default function NotificationsMenu({
  menu,
  userInfo,
}: NotificationsMenuProps) {
  const timeZoneId = userInfo?.timeZone;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useGetUserInvitations(10);

  const {
    data: connectionRequestsData,
    fetchNextPage: fetchNextRequestsPage,
    hasNextPage: hasNextRequestsPage,
    isFetchingNextPage: isFetchingNextRequestsPage,
    isSuccess: isRequestsSuccess,
  } = useGetConnectionRequests(10);

  const userInvitations = data?.pages.flatMap((p) => p.invitations);
  const connectionRequests = connectionRequestsData?.pages.flatMap(
    (p) => p.connectionRequests
  );

  const { mutate: updateNotification } = useLastViewedNotification();

  useEffect(() => {
    if (
      isSuccess &&
      isRequestsSuccess &&
      data.pages.length === 1 &&
      connectionRequestsData.pages.length === 1
    ) {
      const latestInvitation = data.pages[0].invitations[0]?.created;
      const latestRequest =
        connectionRequestsData.pages[0].connectionRequests[0]?.created;

      const latestTimeStamp = [latestInvitation, latestRequest]
        .filter(Boolean)
        .sort()
        .pop();

      if (latestTimeStamp) {
        updateNotification(latestTimeStamp);
      }
    }
  }, [isSuccess, isRequestsSuccess, data, connectionRequestsData]);

  const isLoading = !userInvitations || !connectionRequests;
  const isEmpty =
    userInvitations?.length === 0 && connectionRequests?.length === 0;

  return (
    <StyledNotificationsMenu>
      <div className="headerSeparator">
        <div className="header">
          <div className="info">
            <strong>Notifications</strong>
          </div>
          <div className="closeButton" onClick={() => (menu.value = null)}>
            <IonIcon name="close-outline" className="close" />
          </div>
        </div>
        <div className="separator">
          <Separator />
        </div>
      </div>

      <div className="notifications">
        {isLoading ? (
          <Spinner />
        ) : isEmpty ? (
          <div className="noData">
            <div className="msg">No notifications</div>
            <IoIosNotificationsOff className="icon" />
          </div>
        ) : (
          <div className="data">
            {connectionRequests.map((x) => (
              <div className="item" key={x.id}>
                <ConnectionRequest connectionRequest={x} />
              </div>
            ))}
            <Sentinel
              fetchPage={fetchNextRequestsPage}
              hasMore={hasNextRequestsPage}
              isFetchingPage={isFetchingNextRequestsPage}
            />
            {userInvitations.map((x, index) => (
              <div className="item" key={index}>
                <Invitation
                  key={x.id}
                  invitation={{
                    id: x.id,
                    created: x.created,
                    groupId: x.groupId,
                    guestId: x.guestId,
                    groupName: x.groupName,
                    receiverId: x.receiverId,
                    senderId: x.senderId,
                    guestName: x.guestName,
                  }}
                  menu={menu}
                  timeZoneId={timeZoneId}
                />
              </div>
            ))}
            <Sentinel
              fetchPage={fetchNextPage}
              hasMore={hasNextPage}
              isFetchingPage={isFetchingNextPage}
            />
          </div>
        )}
      </div>
    </StyledNotificationsMenu>
  );
}
