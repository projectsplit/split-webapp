import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Signal } from '@preact/signals-react';
import Confirmation from '../Menus/Confirmations/Confirmation';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';
import { PendingTransaction } from '@/api/offline/pendingTransactions';
import { describePendingCount } from '@/api/offline/pendingTransactionItems';

type Props = {
  menu: Signal<string | null>;
  unsynced: PendingTransaction[];
  onConfirm: () => void;
};

/** Whatever is still only on this phone goes with the session, so logging out has to be a choice. */
export default function LogoutWarningAnimation({
  menu,
  unsynced,
  onConfirm,
}: Props) {
  const nodeRef = useRef(null);
  useCloseOnBack(menu.value === 'logoutWarning', () => (menu.value = null));

  const { text, count } = describePendingCount(unsynced);
  const one = count === 1;

  return (
    <CSSTransition
      in={menu.value === 'logoutWarning'}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      <Confirmation
        menu={menu}
        header="Log out?"
        confirmLabel="Log out anyway"
        isLoading={false}
        onClick={onConfirm}
      >
        <p>
          {text} you added on this phone {one ? "hasn't" : "haven't"} synced
          yet. Logging out deletes {one ? 'it' : 'them'} for good.
        </p>
        <p>
          Once you're back online {one ? 'it syncs' : 'they sync'} on{' '}
          {one ? 'its' : 'their'} own, and logging out is safe.
        </p>
      </Confirmation>
    </CSSTransition>
  );
}
