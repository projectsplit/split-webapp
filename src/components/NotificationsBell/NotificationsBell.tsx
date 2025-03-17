import { IoIosNotificationsOutline } from "react-icons/io";
import { NotificationsBellProps } from "../../interfaces";
import { StyledNotificationsBell } from "./NotificationsBell.styled";

export default function NotificationsBell({ onClick }: NotificationsBellProps) {
  return (
    <StyledNotificationsBell onClick={onClick}>
      <IoIosNotificationsOutline />
    </StyledNotificationsBell>
  );
}
