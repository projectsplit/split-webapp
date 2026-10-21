import { useState } from 'react';
import { Signal } from '@preact/signals-react';
import IonIcon from '@reacticons/ionicons';
import MyButton from '../MyButton/MyButton';
import { StyledPendingTransactionDialog } from './PendingTransactionDialog.styled';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import { FormatDateTime } from '@/helpers/timeHelpers';
import {
  dropPendingTransaction,
  isPendingExpense,
  isPendingInGroup,
  isPendingSettleUp,
  PendingTransaction,
  pendingTransactions,
  requeuePendingTransaction,
} from '@/api/offline/pendingTransactions';
import {
  isSyncing,
  syncPendingTransactions,
} from '@/api/offline/pendingTransactionSync';
import { isOnline } from '@/api/offline/connectivity';
import {
  pendingAmount,
  pendingName,
  pendingNoun,
  pendingOccurred,
  pendingTitle,
  transfersOf,
} from '@/api/offline/pendingTransactionItems';

type Props = {
  menu: Signal<string | null>;
  transaction: PendingTransaction;
  timeZoneId: string;
};

const destinationOf = (x: PendingTransaction) =>
  isPendingInGroup(x)
    ? x.groupName || 'the group'
    : x.kind === 'personalExpense'
      ? 'your expenses'
      : 'your quick splits';

const money = (amount: number, currency: string) =>
  displayCurrencyAndAmount(amount.toString(), currency);

/** "You 12.00, Sam 8.00": who paid or who owes, by the names the form had. */
const describeParts = (
  x: PendingTransaction,
  parts: { id: string; amount: number }[],
  currency: string
) =>
  parts
    .map((part) => `${pendingName(x, part.id)} ${money(part.amount, currency)}`)
    .join(', ');

/** The rows under the summary: who paid and owes for an expense, who sent what for transfers. */
const Details = ({ x }: { x: PendingTransaction }) => {
  if (isPendingExpense(x)) {
    if (x.kind === 'personalExpense') return null;

    const parts =
      x.kind === 'groupExpense'
        ? {
            paid: x.request.payments.map((p) => ({
              id: p.memberId,
              amount: p.amount,
            })),
            owed: x.request.shares.map((s) => ({
              id: s.memberId,
              amount: s.amount,
            })),
          }
        : {
            paid: x.request.payments.map((p) => ({
              id: p.userId,
              amount: p.amount,
            })),
            owed: x.request.shares.map((s) => ({
              id: s.userId,
              amount: s.amount,
            })),
          };

    return (
      <>
        {parts.paid.length > 0 && (
          <div className="row">
            <span className="label">Paid by</span>
            <span>{describeParts(x, parts.paid, x.request.currency)}</span>
          </div>
        )}
        {parts.owed.length > 0 && (
          <div className="row">
            <span className="label">Split</span>
            <span>{describeParts(x, parts.owed, x.request.currency)}</span>
          </div>
        )}
      </>
    );
  }

  if (isPendingSettleUp(x)) {
    return (
      <div className="row">
        <span className="label">Transfers</span>
        <span>
          {transfersOf(x).map((t) => (
            <div key={t.id}>
              {pendingName(x, t.senderId)} → {pendingName(x, t.receiverId)}{' '}
              {money(Number(t.amount), t.currency)}
            </div>
          ))}
        </span>
      </div>
    );
  }

  return x.request.description ? (
    <div className="row">
      <span className="label">Note</span>
      <span>{x.request.description}</span>
    </div>
  ) : null;
};

export default function PendingTransactionDialog({
  menu,
  transaction: opened,
  timeZoneId,
}: Props) {
  const [confirmingDiscard, setConfirmingDiscard] = useState(false);
  const [isDiscarding, setIsDiscarding] = useState(false);

  // The store's copy, since it can be sent or turned down while this is open.
  const current = pendingTransactions.value.find((x) => x.id === opened.id);
  const transaction = current ?? opened;

  const close = () => (menu.value = null);

  const noun = pendingNoun(transaction);
  const amount = pendingAmount(transaction);
  // A settle-up across currencies has no one total to show, so it shows its size instead.
  const amountText = amount
    ? money(amount.amount, amount.currency)
    : isPendingSettleUp(transaction)
      ? `${transfersOf(transaction).length} transfers`
      : '';

  const discard = async () => {
    setIsDiscarding(true);
    try {
      await dropPendingTransaction(transaction.id);
      close();
    } finally {
      setIsDiscarding(false);
    }
  };

  const tryAgain = async () => {
    await requeuePendingTransaction(transaction);
    void syncPendingTransactions();
  };

  const status = !current
    ? 'synced'
    : transaction.rejection
      ? 'rejected'
      : 'waiting';

  return (
    <StyledPendingTransactionDialog>
      <div className="dialogHeader">
        <IonIcon
          name={
            status === 'rejected'
              ? 'alert-circle-outline'
              : status === 'synced'
                ? 'cloud-done-outline'
                : 'cloud-upload-outline'
          }
          className={`dialogIcon${status === 'rejected' ? ' danger' : ''}`}
        />
        <div className="dialogTitle">
          {status === 'rejected'
            ? "Couldn't sync"
            : status === 'synced'
              ? 'Synced'
              : 'Not synced yet'}
        </div>
        <div className="closeButton" onClick={close}>
          <IonIcon name="close-outline" />
        </div>
      </div>

      <div className="summary">
        <span className="title">{pendingTitle(transaction)}</span>
        <span className="amount">{amountText}</span>
      </div>

      <div className="info">
        {confirmingDiscard ? (
          <p>
            Discard this {noun}? It was never sent, so it can't be brought back.
          </p>
        ) : status === 'synced' ? (
          <p>It's been added to {destinationOf(transaction)}.</p>
        ) : status === 'rejected' ? (
          <>
            <p>Buqs couldn't add this {noun}:</p>
            <p className="reason">{transaction.rejection}</p>
          </>
        ) : !isOnline.value ? (
          <p>
            Saved on this phone. It will be added to{' '}
            {destinationOf(transaction)} as soon as you're back online.
          </p>
        ) : isSyncing.value ? (
          <p>Sending it now…</p>
        ) : (
          <p>
            Saved on this phone. Buqs couldn't be reached just now, so it will
            try again shortly.
          </p>
        )}
      </div>

      {!confirmingDiscard && (
        <div className="details">
          <div className="row">
            <span className="label">When</span>
            <span>
              {FormatDateTime(pendingOccurred(transaction), timeZoneId)}
            </span>
          </div>
          {isPendingInGroup(transaction) && transaction.groupName && (
            <div className="row">
              <span className="label">Group</span>
              <span>{transaction.groupName}</span>
            </div>
          )}
          <Details x={transaction} />
        </div>
      )}

      <div className="buttons">
        {confirmingDiscard ? (
          <>
            <MyButton isLoading={isDiscarding} onClick={discard}>
              Discard
            </MyButton>
            <MyButton
              variant="secondary"
              onClick={() => setConfirmingDiscard(false)}
            >
              Cancel
            </MyButton>
          </>
        ) : status === 'synced' ? (
          <MyButton onClick={close}>Done</MyButton>
        ) : (
          <>
            {status === 'rejected' && (
              <MyButton onClick={tryAgain}>Try again</MyButton>
            )}
            {status === 'waiting' && isOnline.value && !isSyncing.value && (
              <MyButton onClick={() => void syncPendingTransactions()}>
                Send now
              </MyButton>
            )}
            {/* A request already on its way cannot be called back, so nothing is offered that
                would claim to stop it. */}
            {!(status === 'waiting' && isSyncing.value) && (
              <MyButton
                variant="secondary"
                onClick={() => setConfirmingDiscard(true)}
              >
                Discard
              </MyButton>
            )}
          </>
        )}
      </div>
    </StyledPendingTransactionDialog>
  );
}
