import { ComponentProps, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useSignal } from '@preact/signals-react';
import IonIcon from '@reacticons/ionicons';
import { isOnline } from '@/api/offline/connectivity';
import {
  PendingTransaction,
  pendingTransactions,
} from '@/api/offline/pendingTransactions';
import { isSyncing } from '@/api/offline/pendingTransactionSync';
import { useGetMe } from '@/api/auth/QueryHooks/useGetMe';
import { getSignedInUserId } from '@/helpers/isUserAuthenticated';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';
import MenuAnimationBackground from '../Animations/MenuAnimationBackground';
import PendingTransactionAnimation from '../Animations/PendingTransactionAnimation';
import PendingTransactionsDialog from '../PendingTransaction/PendingTransactionsDialog';
import { StyledConnectionStatus } from './ConnectionStatus.styled';

type Status = {
  icon: ComponentProps<typeof IonIcon>['name'];
  text: string;
  spin?: boolean;
  danger?: boolean;
};

/**
 * A line under the page title for what the person should know before trusting the screen: that the
 * app is offline and showing what it last loaded, or that expenses and transfers they filed are
 * still only on this phone. Silent when everything is in sync. Kept short, since on the home page it shares the
 * bar with the support button. While anything is unsynced it opens the list of it.
 */
export default function ConnectionStatus() {
  const menu = useSignal<string | null>(null);
  const selected = useSignal<PendingTransaction | null>(null);
  const listRef = useRef(null);
  const { data: userInfo } = useGetMe();
  const timeZoneId =
    userInfo?.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;

  useCloseOnBack(menu.value === 'pendingList', () => (menu.value = null));

  const userId = getSignedInUserId();
  const mine = pendingTransactions.value.filter((x) => x.userId === userId);
  const rejected = mine.filter((x) => x.rejection).length;
  const waiting = mine.length - rejected;

  const status: Status | null = !isOnline.value
    ? {
        icon: 'cloud-offline-outline',
        text: waiting > 0 ? `Offline · ${waiting} to sync` : 'Offline',
      }
    : isSyncing.value
      ? { icon: 'sync-outline', text: 'Syncing…', spin: true }
      : rejected > 0
        ? {
            icon: 'alert-circle-outline',
            text: `${rejected} couldn't sync`,
            danger: true,
          }
        : waiting > 0
          ? { icon: 'cloud-upload-outline', text: `${waiting} to sync` }
          : null;

  const opensList = mine.length > 0;

  return (
    <>
      {status && (
        <StyledConnectionStatus
          as={opensList ? 'button' : 'div'}
          type={opensList ? 'button' : undefined}
          className={status.danger ? 'danger' : undefined}
          role={opensList ? undefined : 'status'}
          onClick={opensList ? () => (menu.value = 'pendingList') : undefined}
        >
          <IonIcon
            name={status.icon}
            className={`icon${status.spin ? ' spin' : ''}`}
          />
          <span className="text">{status.text}</span>
        </StyledConnectionStatus>
      )}

      {/* Mounted even with nothing left to show, so a list that empties while open says so. */}
      <MenuAnimationBackground menu={menu} />
      <CSSTransition
        in={menu.value === 'pendingList'}
        timeout={100}
        classNames="infoBox"
        unmountOnExit
        nodeRef={listRef}
      >
        <PendingTransactionsDialog
          menu={menu}
          transactions={mine}
          timeZoneId={timeZoneId}
          onOpen={(transaction) => {
            selected.value = transaction;
            menu.value = 'pendingTransaction';
          }}
        />
      </CSSTransition>
      <PendingTransactionAnimation
        menu={menu}
        transaction={selected.value}
        timeZoneId={timeZoneId}
      />
    </>
  );
}
