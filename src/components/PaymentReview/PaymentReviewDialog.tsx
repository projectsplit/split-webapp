import { useEffect, useRef, useState } from 'react';
import { Signal, useSignal } from '@preact/signals-react';
import { useNavigate } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';
import { IoClose } from 'react-icons/io5';
import MyButton from '../MyButton/MyButton';
import MenuAnimationBackground from '../Animations/MenuAnimationBackground';
import CurrencyOptionsAnimation from '../Animations/CurrencyOptionsAnimation';
import { StyledPaymentReviewDialog } from './PaymentReviewDialog.styled';
import { FormatDateTime } from '@/helpers/timeHelpers';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import { getSymbolFromCurrency } from '@/helpers/currency-symbol-map';
import { PaymentKind } from '@/helpers/paymentCapture/parsePayment';
import { ReviewItem } from '@/helpers/paymentCapture/reviewItems';
import {
  fileReviewedPayments,
  paymentReviewItems,
  rowProblem,
} from '@/helpers/paymentCapture/paymentReview';
import routes from '@/routes';

type Props = {
  menu: Signal<string | null>;
  timeZoneId: string;
};

/** Why a row starts unticked, for the kinds that are not spending. */
const kindNotes: Partial<Record<PaymentKind, string>> = {
  refund: 'A refund, not spending',
  incoming: 'Money in, not spending',
  declined: 'Declined',
  transfer: 'Between your own accounts?',
  promo: 'Looks like an offer',
};

const noteOf = (item: ReviewItem, timeZoneId: string) => {
  if (item.alreadyIn) {
    const { description, amount, currency, occurred } = item.alreadyIn;
    return `Already in Buqs? ${description || displayCurrencyAndAmount(String(amount), currency)} · ${FormatDateTime(occurred, timeZoneId)}`;
  }
  if (item.problem === 'amount' && !item.amount)
    return "Couldn't read the amount";
  if (item.problem === 'currency') return 'Check the currency';

  return kindNotes[item.kind] ?? null;
};

/**
 * The payments Buqs collected from notifications, each ready to file as a personal expense. The
 * person ticks the ones to keep and corrects anything read wrong; filing lets go of the rest.
 * Closing keeps everything for later.
 */
export default function PaymentReviewDialog({ menu, timeZoneId }: Props) {
  const navigate = useNavigate();
  const items = paymentReviewItems.value;
  const [isFiling, setIsFiling] = useState(false);

  const currencyMenu = useSignal<string | null>(null);
  // State rather than a ref: the sheet is handed this row's currency as its selection.
  const [currencyFor, setCurrencyFor] = useState<string | null>(null);
  const rows = useRef(new Map<string, HTMLDivElement>());
  const list = useRef<HTMLDivElement>(null);

  // The keyboard shrinks the list from below, and the browser does not scroll a list inside the
  // page to keep the field being typed in on screen, so a row low down ended up behind the footer.
  // Brought back into view as the field is focused and again once the keyboard has opened, the way
  // the member picker does it.
  useEffect(() => {
    let frame = 0;

    const revealFocusedRow = () => {
      const focused = document.activeElement;
      if (!(focused instanceof HTMLInputElement)) return;
      if (!list.current?.contains(focused)) return;

      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        focused.closest('.row')?.scrollIntoView({ block: 'center' });
      });
    };

    document.addEventListener('focusin', revealFocusedRow);
    window.visualViewport?.addEventListener('resize', revealFocusedRow);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('focusin', revealFocusedRow);
      window.visualViewport?.removeEventListener('resize', revealFocusedRow);
    };
  }, []);

  const close = () => (menu.value = null);

  const update = (id: string, change: Partial<ReviewItem>) => {
    paymentReviewItems.value = paymentReviewItems
      .peek()
      .map((x) => (x.id === id ? { ...x, ...change, error: undefined } : x));
  };

  // Putting right what Buqs could not read is as good as saying "add this one", for a payment that
  // would have been ticked had it been read.
  const resolve = (
    item: ReviewItem,
    change: Partial<ReviewItem>,
    problem: ReviewItem['problem']
  ) =>
    update(
      item.id,
      item.problem === problem
        ? {
            ...change,
            problem: null,
            selected:
              item.selected || (item.kind === 'spend' && !item.alreadyIn),
          }
        : change
    );

  const selectedCount = items.filter((x) => x.selected).length;

  const handleSubmit = async () => {
    const problems = new Map(
      items.flatMap((x) => {
        const problem = rowProblem(x);
        return problem ? [[x.id, problem] as const] : [];
      })
    );

    if (problems.size > 0) {
      paymentReviewItems.value = items.map((x) =>
        problems.has(x.id) ? { ...x, error: problems.get(x.id) } : x
      );

      const [first] = problems.keys();
      rows.current
        .get(first)
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsFiling(true);

    try {
      const filed = await fileReviewedPayments(items);

      // Anything left is a row the server turned down, shown with its reason.
      if (paymentReviewItems.peek().length > 0) return;

      close();
      if (filed > 0 && window.location.pathname !== routes.PERSONAL) {
        navigate(routes.PERSONAL);
      }
    } catch (error) {
      console.error('Filing collected payments failed:', error);
    } finally {
      setIsFiling(false);
    }
  };

  return (
    <StyledPaymentReviewDialog>
      <div className="review">
        <div className="header">
          <div className="headerSpacer" />
          <div className="sheetTitle">New payments</div>
          <div className="closeButtonContainer" onClick={close}>
            <IoClose className="closeButton" />
          </div>
        </div>

        <div className="formScroll" ref={list}>
          {items.length === 0 ? (
            <div className="empty">Nothing to review.</div>
          ) : (
            <p className="intro">
              From your payment apps' notifications. Tick the ones to add to
              your expenses; the rest are cleared.
            </p>
          )}

          {items.map((item) => {
            const note = noteOf(item, timeZoneId);

            return (
              <div
                key={item.id}
                ref={(node) => {
                  if (node) rows.current.set(item.id, node);
                  else rows.current.delete(item.id);
                }}
                className={`row${item.selected ? ' selected' : ''}`}
              >
                <button
                  type="button"
                  className="tick"
                  aria-pressed={item.selected}
                  aria-label={item.selected ? 'Leave out' : 'Add'}
                  onClick={() => update(item.id, { selected: !item.selected })}
                >
                  <IonIcon
                    name={
                      item.selected ? 'checkmark-circle' : 'ellipse-outline'
                    }
                  />
                </button>

                <div className="fields">
                  <div className="mainLine">
                    <input
                      className="description"
                      value={item.description}
                      placeholder="Description"
                      enterKeyHint="done"
                      onChange={(event) =>
                        update(item.id, { description: event.target.value })
                      }
                    />
                    <div className="money">
                      <button
                        type="button"
                        className={`symbol${item.problem === 'currency' ? ' checkThis' : ''}`}
                        aria-label={`Currency: ${item.currency}`}
                        onClick={() => {
                          setCurrencyFor(item.id);
                          currencyMenu.value = 'currencyOptions';
                        }}
                      >
                        {getSymbolFromCurrency(item.currency) ?? item.currency}
                      </button>
                      <input
                        className="amount"
                        value={item.amount}
                        placeholder="0.00"
                        inputMode="decimal"
                        enterKeyHint="done"
                        onChange={(event) =>
                          resolve(
                            item,
                            { amount: event.target.value },
                            'amount'
                          )
                        }
                      />
                    </div>
                  </div>

                  <div className="meta">
                    {item.appNames.join(' + ')} ·{' '}
                    {FormatDateTime(item.occurred, timeZoneId)}
                  </div>

                  {note ? (
                    <div
                      className={`note${item.alreadyIn || item.problem ? ' warning' : ''}`}
                    >
                      {note}
                    </div>
                  ) : null}

                  <div className="source">“{item.source}”</div>

                  {item.error ? (
                    <div className="error">{item.error}</div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="footer">
          <div className="submitButton">
            <MyButton
              fontSize="16"
              onClick={items.length === 0 ? close : handleSubmit}
              isLoading={isFiling}
            >
              {items.length === 0
                ? 'Done'
                : selectedCount === 0
                  ? 'Clear all'
                  : `Add ${selectedCount} ${selectedCount === 1 ? 'expense' : 'expenses'}`}
            </MyButton>
          </div>
        </div>
      </div>

      <MenuAnimationBackground menu={currencyMenu} />
      <CurrencyOptionsAnimation
        currencyMenu={currencyMenu}
        selectedCurrency={items.find((x) => x.id === currencyFor)?.currency}
        clickHandler={(currency: string) => {
          const item = items.find((x) => x.id === currencyFor);
          if (item) resolve(item, { currency }, 'currency');
          currencyMenu.value = null;
        }}
      />
    </StyledPaymentReviewDialog>
  );
}
