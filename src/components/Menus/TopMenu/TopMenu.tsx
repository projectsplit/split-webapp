import { TopMenuProps } from '../../../interfaces';
import NotificationsBell from '../../NotificationsBell/NotificationsBell';
import UserOptionsButton from '../../UserOptionsButton/UserOptionsButton';
import { StyledTopMenu } from './TopMenu.styled';
import { useState } from 'react';
import IonIcon from '@reacticons/ionicons';

export default function TopMenu({
  title,
  menu,
  username,
  hasNewerNotifications,
  openGroupOptionsMenu,
  groupIsArchived,
  confirmUnarchiveMenu,
}: TopMenuProps) {
  const [visuallyShowNotification, setVisuallyShowNotification] =
    useState<boolean>(true);

  const isInGroup =
    title !== '' &&
    title !== 'Shared' &&
    title !== 'Non Group Transactions' &&
    title !== 'Your Expenses';

  return (
    <StyledTopMenu>
      <div className="slot left">
        {username ? (
          <UserOptionsButton
            username={username}
            onClick={() => (menu.value = 'settings')}
          />
        ) : null}
      </div>

      <div className="titleStripe">
        <div className="title">{title}</div>
      </div>

      <div className="slot right">
        {isInGroup ? (
          groupIsArchived ? (
            <div
              className="iconButton"
              onClick={() => (confirmUnarchiveMenu.value = 'unarchiveGroup')}
            >
              <IonIcon name="arrow-undo-outline" className="unarchive" />
            </div>
          ) : (
            <div
              className="iconButton"
              onClick={() => (openGroupOptionsMenu.value = true)}
            >
              <IonIcon name="settings-outline" />
            </div>
          )
        ) : (
          <div
            className="iconButton bellIconAndNumberOfNotifications"
            onClick={() => {
              menu.value = 'notifications';
              setVisuallyShowNotification(false);
            }}
          >
            {username ? <NotificationsBell /> : null}
            {hasNewerNotifications && visuallyShowNotification ? (
              <span className="notification" />
            ) : null}
          </div>
        )}
      </div>
    </StyledTopMenu>
  );
}
