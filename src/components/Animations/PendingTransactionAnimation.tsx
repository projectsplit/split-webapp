import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Signal } from '@preact/signals-react';
import PendingTransactionDialog from '../PendingTransaction/PendingTransactionDialog';
import { PendingTransaction } from '@/api/offline/pendingTransactions';
import { useCloseOnBack } from '../../hooks/useCloseOnBack';

type Props = {
  menu: Signal<string | null>;
  transaction: PendingTransaction | null;
  timeZoneId: string;
};

export default function PendingTransactionAnimation({
  menu,
  transaction,
  timeZoneId,
}: Props) {
  const nodeRef = useRef(null);
  useCloseOnBack(
    menu.value === 'pendingTransaction',
    () => (menu.value = null)
  );

  return (
    <CSSTransition
      in={menu.value === 'pendingTransaction' && !!transaction}
      timeout={100}
      classNames="infoBox"
      unmountOnExit
      nodeRef={nodeRef}
    >
      {transaction ? (
        <PendingTransactionDialog
          menu={menu}
          transaction={transaction}
          timeZoneId={timeZoneId}
        />
      ) : (
        <></>
      )}
    </CSSTransition>
  );
}
