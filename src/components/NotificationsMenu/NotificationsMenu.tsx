import IonIcon from "@reacticons/ionicons";
import { NotificationsMenuProps } from "../../interfaces";
import { StyledNotificationsMenu } from "./NotificationsMenu.styled";
import { useGetUserInvitations } from "../../api/services/useGetUserInvitations";
import Spinner from "../Spinner/Spinner";
import { IoIosNotificationsOff } from "react-icons/io";
import Sentinel from "../Sentinel";
import Invitation from "../Invitation/Invitation";
import Separator from "../Separator/Separator";

export default function NotificationsMenu({ menu }: NotificationsMenuProps) {
  const timeZoneId = "Europe/Athens";
  const pageSize = 10;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useGetUserInvitations(pageSize);

  const userInvitations = data?.pages.flatMap((p) => p.invitations);

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
        <div className="separator"><Separator /></div>
        
      </div>

      <div className="notifications">
        {!userInvitations || isFetching ? (
          <Spinner />
        ) : userInvitations.length === 0 ? (
          <div className="noData">
            <div className="msg">No notifications</div>
            <IoIosNotificationsOff className="icon" />
          </div>
        ) : (
          <div className="data">
            {userInvitations.map((x) => (
              <div className="item">
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
                  }}
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
