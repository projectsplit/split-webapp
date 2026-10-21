import { TopMenuProps } from '../../../interfaces';
import NotificationsBell from '../../NotificationsBell/NotificationsBell';
import UserOptionsButton from '../../UserOptionsButton/UserOptionsButton';
import { StyledTopMenu } from './TopMenu.styled';
import { useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import ConnectionStatus from '../../ConnectionStatus/ConnectionStatus';

export default function TopMenu({
  title,
  menu,
  username,
  hasNewerNotifications,
  openGroupOptionsMenu,
  groupIsArchived,
  confirmUnarchiveMenu,
  onSupportClick,
}: TopMenuProps) {
  const [visuallyShowNotification, setVisuallyShowNotification] =
    useState<boolean>(true);

  const isInGroup =
    title !== '' &&
    title !== 'Groups' &&
    title !== 'Quick splits' &&
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
        <div
          className={`title${isInGroup && groupIsArchived ? ' archived' : ''}`}
        >
          {title}
        </div>
        <ConnectionStatus />
      </div>

      {onSupportClick && (
        <button
          type="button"
          className="supportButton"
          onClick={onSupportClick}
        >
          <IonIcon name="heart-outline" className="heart" />
          Support Buqs
        </button>
      )}

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
