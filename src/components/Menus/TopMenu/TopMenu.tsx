import { TopMenuProps } from '../../../interfaces';
import NotificationsBell from '../../NotificationsBell/NotificationsBell';
import UserOptionsButton from '../../UserOptionsButton/UserOptionsButton';
import { StyledTopMenu } from './TopMenu.styled';
import { useState } from 'react';
import IonIcon from '@reacticons/ionicons';
import ConnectionStatus from '../../ConnectionStatus/ConnectionStatus';
import PaymentReviewStatus from '../../PaymentReview/PaymentReviewStatus';

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
      <div className="side left">
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
        <PaymentReviewStatus menu={menu} />
      </div>

      <div className="side right">
        {onSupportClick && (
          <button
            type="button"
            className="supportButton"
            aria-label="Support Buqs"
            onClick={onSupportClick}
          >
            <IonIcon name="heart-outline" />
          </button>
        )}

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
