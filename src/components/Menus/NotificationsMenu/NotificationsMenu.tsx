import IonIcon from "@reacticons/ionicons";
import { NotificationsMenuProps } from "../../../interfaces";
import { StyledNotificationsMenu } from "./NotificationsMenu.styled";
import { IoIosNotificationsOff } from "react-icons/io";
import Sentinel from "../../Sentinel";
import Invitation from "../../Invitation/Invitation";
import Separator from "../../Separator/Separator";
import { useEffect } from "react";
import { useLastViewedNotification } from "../../../api/auth/CommandHooks/useLastViewedNotification";
import { useGetUserInvitations } from "../../../api/auth/QueryHooks/useGetUserInvitations";
import Spinner from "../../Spinner/Spinner";

export default function NotificationsMenu({
  menu,
  userInfo,
}: NotificationsMenuProps) {
  const timeZoneId = userInfo?.timeZone;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isSuccess } =
    useGetUserInvitations(10);

  const userInvitations = data?.pages.flatMap((p) => p.invitations);

  const { mutate: updateNotification } = useLastViewedNotification();

  useEffect(() => {
    if (isSuccess && data.pages.length === 1 && data?.pages[0].invitations.length > 0) {
      const latestTimeStamp = data?.pages[0].invitations[0].created
      updateNotification(latestTimeStamp);
    }

  }, [isSuccess, data]);

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
        {!userInvitations ? (
          <Spinner />
        ) : userInvitations.length === 0 ? (
          <div className="noData">
            <div className="msg">No notifications</div>
            <IoIosNotificationsOff className="icon" />
          </div>
        ) : (
          <div className="data">
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
                    guestName: x.guestName

                  }}
                  menu={menu}
                  timeZoneId={timeZoneId}
                />
              </div>
            ))}
            <Sentinel
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
            />
          </div>
        )}
      </div>
    </StyledNotificationsMenu>
  );
}
