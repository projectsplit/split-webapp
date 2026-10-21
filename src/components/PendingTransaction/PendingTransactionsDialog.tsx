import { Signal } from '@preact/signals-react';
import IonIcon from '@reacticons/ionicons';
import MyButton from '../MyButton/MyButton';
import { StyledPendingTransactionsDialog } from './PendingTransactionsDialog.styled';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import { FormatDateTime } from '@/helpers/timeHelpers';
import {
  isPendingSettleUp,
  PendingTransaction,
} from '@/api/offline/pendingTransactions';
import {
  pendingAmount,
  pendingOccurred,
  pendingPlace,
  pendingTitle,
  transfersOf,
} from '@/api/offline/pendingTransactionItems';
import { isOnline } from '@/api/offline/connectivity';

type Props = {
  menu: Signal<string | null>;
  transactions: PendingTransaction[];
  timeZoneId: string;
  onOpen: (transaction: PendingTransaction) => void;
};

const amountOf = (x: PendingTransaction) => {
  const amount = pendingAmount(x);
  if (amount) {
    return displayCurrencyAndAmount(amount.amount.toString(), amount.currency);
  }
  return isPendingSettleUp(x) ? `${transfersOf(x).length} transfers` : '';
};

/**
 * Everything the person filed that the server has not confirmed, whichever list it is headed for.
 * The lists show their own, but this is the one place to reach a record whose list is gone, such as
 * one for a group the person has since left.
 */
export default function PendingTransactionsDialog({
  menu,
  transactions,
  timeZoneId,
  onOpen,
}: Props) {
  const close = () => (menu.value = null);

  return (
    <StyledPendingTransactionsDialog>
      <div className="dialogHeader">
        <IonIcon
          name={
            isOnline.value ? 'cloud-upload-outline' : 'cloud-offline-outline'
          }
          className="dialogIcon"
        />
        <div className="dialogTitle">
          {transactions.length > 0 ? 'Not synced yet' : 'All synced'}
        </div>
        <div className="closeButton" onClick={close}>
          <IonIcon name="close-outline" />
        </div>
      </div>

      <div className="info">
        <p>
          {transactions.length === 0
            ? 'Everything you added is in Buqs.'
            : isOnline.value
              ? 'Open one to see where it stands.'
              : "Saved on this phone, and sent as soon as you're back online."}
        </p>
      </div>

      {transactions.length > 0 ? (
        <div className="list">
          {transactions.map((transaction) => (
            <button
              type="button"
              className="row"
              key={transaction.id}
              onClick={() => onOpen(transaction)}
            >
              <span className="title">{pendingTitle(transaction)}</span>
              <span className="amount">{amountOf(transaction)}</span>
              <span
                className={`meta${transaction.rejection ? ' rejected' : ''}`}
              >
                {transaction.rejection
                  ? "Couldn't sync"
                  : `${pendingPlace(transaction)} · ${FormatDateTime(
                      pendingOccurred(transaction),
                      timeZoneId
                    )}`}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <div className="buttons">
          <MyButton onClick={close}>Done</MyButton>
        </div>
      )}
    </StyledPendingTransactionsDialog>
  );
}
