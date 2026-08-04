import IonIcon from '@reacticons/ionicons';
import { NotificationsMenuProps } from '../../../interfaces';
import { StyledNotificationsMenu } from './NotificationsMenu.styled';
import { IoIosNotificationsOff } from 'react-icons/io';
import Sentinel from '../../Sentinel';
import Invitation from '../../Invitation/Invitation';
import Separator from '../../Separator/Separator';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLastViewedNotification } from '../../../api/auth/CommandHooks/useLastViewedNotification';
import { useGetUserInvitations } from '../../../api/auth/QueryHooks/useGetUserInvitations';
import { useGetNotifications } from '../../../api/auth/QueryHooks/useGetNotifications';
import { useGetConnectionRequests } from '../../../api/auth/QueryHooks/useGetConnectionRequests';
import ConnectionRequest from '../../ConnectionRequest/ConnectionRequest';
import Spinner from '../../Spinner/Spinner';

const formatNotificationDate = (
  isoDate: string,
  timeZoneId: string | undefined
) =>
  new Date(isoDate).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: timeZoneId,
  });

export default function NotificationsMenu({
  menu,
  userInfo,
}: NotificationsMenuProps) {
  const timeZoneId = userInfo?.timeZone;
  const navigate = useNavigate();

  const {
    data: invitationsData,
    fetchNextPage: fetchNextInvitations,
    hasNextPage: hasMoreInvitations,
    isFetchingNextPage: isFetchingInvitations,
    isSuccess: invitationsLoaded,
  } = useGetUserInvitations(10);

  const {
    data: notificationsData,
    fetchNextPage: fetchNextNotifications,
    hasNextPage: hasMoreNotifications,
    isFetchingNextPage: isFetchingNotifications,
    isSuccess: notificationsLoaded,
  } = useGetNotifications(10);

  const {
    data: connectionRequestsData,
    fetchNextPage: fetchNextConnectionRequests,
    hasNextPage: hasMoreConnectionRequests,
    isFetchingNextPage: isFetchingConnectionRequests,
    isSuccess: connectionRequestsLoaded,
  } = useGetConnectionRequests(10);

  const userInvitations = invitationsData?.pages.flatMap((p) => p.invitations);
  const notifications = notificationsData?.pages.flatMap(
    (p) => p.notifications
  );
  const connectionRequests = connectionRequestsData?.pages.flatMap(
    (p) => p.connectionRequests
  );

  const { mutate: updateNotification } = useLastViewedNotification();

  const newestInvitation = invitationsData?.pages[0]?.invitations[0]?.created;
  const newestNotification =
    notificationsData?.pages[0]?.notifications[0]?.created;
  const newestConnectionRequest =
    connectionRequestsData?.pages[0]?.connectionRequests[0]?.created;

  // The bell's unread dot compares one timestamp against all three feeds, so it has to be advanced
  // to whichever is newest. Recording only the newest invitation would leave the dot lit forever
  // once an activity notification or a connection request arrived after it.
  useEffect(() => {
    if (!invitationsLoaded || !notificationsLoaded || !connectionRequestsLoaded)
      return;

    const latest = [
      newestInvitation,
      newestNotification,
      newestConnectionRequest,
    ]
      .filter((x): x is string => !!x)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0];

    if (latest) {
      updateNotification(latest);
    }
  }, [
    invitationsLoaded,
    notificationsLoaded,
    connectionRequestsLoaded,
    newestInvitation,
    newestNotification,
    newestConnectionRequest,
    updateNotification,
  ]);

  const isLoading = !userInvitations || !notifications || !connectionRequests;
  const isEmpty =
    userInvitations?.length === 0 &&
    notifications?.length === 0 &&
    connectionRequests?.length === 0;

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
            {connectionRequests.length > 0 && (
              <>
                <div className="sectionTitle">Requests</div>
                {connectionRequests.map((x) => (
                  <div className="item" key={x.id}>
                    <ConnectionRequest connectionRequest={x} />
                  </div>
                ))}
                <Sentinel
                  fetchPage={fetchNextConnectionRequests}
                  hasMore={hasMoreConnectionRequests}
                  isFetchingPage={isFetchingConnectionRequests}
                />
              </>
            )}

            {userInvitations.length > 0 && (
              <>
                <div className="sectionTitle">Invitations</div>
                {userInvitations.map((x) => (
                  <div className="item" key={x.id}>
                    <Invitation
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
                  fetchPage={fetchNextInvitations}
                  hasMore={hasMoreInvitations}
                  isFetchingPage={isFetchingInvitations}
                />
              </>
            )}

            {notifications.length > 0 && (
              <>
                <div className="sectionTitle">Activity</div>
                {notifications.map((x) => (
                  <div
                    className={`activityItem${x.url ? ' clickable' : ''}`}
                    key={x.id}
                    onClick={() => {
                      if (!x.url) return;
                      menu.value = null;
                      navigate(x.url);
                    }}
                  >
                    <div className="activityTitle">{x.title}</div>
                    <div className="activityBody">{x.body}</div>
                    <div className="activityDate">
                      {formatNotificationDate(x.created, timeZoneId)}
                    </div>
                  </div>
                ))}
                <Sentinel
                  fetchPage={fetchNextNotifications}
                  hasMore={hasMoreNotifications}
                  isFetchingPage={isFetchingNotifications}
                />
              </>
            )}
          </div>
        )}
      </div>
    </StyledNotificationsMenu>
  );
}
