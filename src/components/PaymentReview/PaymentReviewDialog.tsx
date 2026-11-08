import { useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { Signal, useSignal } from '@preact/signals-react';
import { useNavigate } from 'react-router-dom';
import IonIcon from '@reacticons/ionicons';
import { IoClose } from 'react-icons/io5';
import MyButton from '../MyButton/MyButton';
import MenuAnimationBackground from '../Animations/MenuAnimationBackground';
import CurrencyOptionsAnimation from '../Animations/CurrencyOptionsAnimation';
import { LabelMenu } from '../ExpenseForm/components/LabelMenu/LabelMenu';
import ExpenseDestinationSheet from '../ExpenseDestinationSheet/ExpenseDestinationSheet';
import { StyledPaymentReviewDialog } from './PaymentReviewDialog.styled';
import { useCloseOnBack } from '@/hooks/useCloseOnBack';
import { FormatDateTime } from '@/helpers/timeHelpers';
import { displayCurrencyAndAmount } from '@/helpers/displayCurrencyAndAmount';
import { getSymbolFromCurrency } from '@/helpers/currency-symbol-map';
import { getSignedInUserId } from '@/helpers/isUserAuthenticated';
import {
  labelChipBackground,
  labelChipInk,
  resolveLabelColor,
} from '@/helpers/labelChip';
import {
  parseAmount,
  PaymentKind,
} from '@/helpers/paymentCapture/parsePayment';
import { Destination, Person } from '@/helpers/expenseSplit';
import { ReviewItem } from '@/helpers/paymentCapture/reviewItems';
import {
  fileReviewedPayments,
  paymentReviewGroups,
  paymentReviewItems,
  paymentReviewPeople,
  rowProblem,
} from '@/helpers/paymentCapture/paymentReview';
import routes from '@/routes';
import { Group } from '@/types';

type Props = {
  menu: Signal<string | null>;
  timeZoneId: string;
  /** Who is filing; null only while their profile is still loading. */
  me: Person | null;
};

/**
 * Where a row's chip says it goes: "Personal", the group's name, with how many share it when not
 * everyone does ("Flat · 2 of 3"), or who a quick split is with ("Quick split · maria +1"); then
 * "· uneven" when the amounts were set on the split screen.
 */
const destinationText = (destination: Destination, groups: Group[] | null) => {
  switch (destination.kind) {
    case 'personal':
      return 'Personal';
    case 'group': {
      const group = groups?.find((x) => x.id === destination.groupId);
      const size = group ? group.members.length + group.guests.length : 0;
      const sharing = destination.memberIds?.length;
      const uneven = destination.shares ? ' · uneven' : '';

      return sharing && size && sharing < size
        ? `${destination.groupName} · ${sharing} of ${size}${uneven}`
        : `${destination.groupName}${uneven}`;
    }
    case 'quickSplit': {
      const [first, ...rest] = destination.people;
      const names =
        rest.length > 0 ? `${first.username} +${rest.length}` : first.username;
      return `Quick split · ${names}${destination.shares ? ' · uneven' : ''}`;
    }
  }
};

const destinationIcon = (destination: Destination) =>
  destination.kind === 'group'
    ? 'people-outline'
    : destination.kind === 'quickSplit'
      ? 'person-add-outline'
      : 'person-outline';

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
 * The payments Buqs collected from notifications, each ready to file: as a personal expense, or
 * split equally in a group or a quick split, with labels, all as the person filed that merchant last
 * time. The person ticks the ones to keep and corrects anything read wrong; filing lets go of the
 * rest. Closing keeps everything for later.
 */
export default function PaymentReviewDialog({ menu, timeZoneId, me }: Props) {
  const navigate = useNavigate();
  const items = paymentReviewItems.value;
  const [isFiling, setIsFiling] = useState(false);

  // Which row each sheet is open for. State rather than refs: the sheets are handed that row's
  // current choice to show as selected.
  const currencyMenu = useSignal<string | null>(null);
  const [currencyFor, setCurrencyFor] = useState<string | null>(null);
  const destinationMenu = useSignal<string | null>(null);
  const [destinationFor, setDestinationFor] = useState<string | null>(null);
  const destinationRef = useRef<HTMLDivElement>(null);
  const labelMenuIsOpen = useSignal<boolean>(false);
  const [labelsFor, setLabelsFor] = useState<string | null>(null);

  const rows = useRef(new Map<string, HTMLDivElement>());
  const list = useRef<HTMLDivElement>(null);

  useCloseOnBack(
    destinationMenu.value === 'destination',
    () => (destinationMenu.value = null)
  );

  const labelsRow = labelMenuIsOpen.value
    ? items.find((x) => x.id === labelsFor)
    : undefined;
  const destinationRow = items.find((x) => x.id === destinationFor);

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

    if (!me) return;

    setIsFiling(true);

    try {
      const filed = await fileReviewedPayments(items, me);

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

                  <div className="chips">
                    <button
                      type="button"
                      className="chip destination"
                      onClick={() => {
                        setDestinationFor(item.id);
                        destinationMenu.value = 'destination';
                      }}
                    >
                      <IonIcon
                        name={destinationIcon(item.destination)}
                        className="chipIcon"
                      />
                      <span className="chipText">
                        {destinationText(
                          item.destination,
                          paymentReviewGroups.value
                        )}
                      </span>
                      <IonIcon
                        name="chevron-down-outline"
                        className="chipIcon"
                      />
                    </button>

                    {item.labels.map((label) => {
                      const color = resolveLabelColor(label.color);

                      return (
                        <button
                          type="button"
                          key={label.id}
                          className="chip label"
                          style={{
                            backgroundColor: labelChipBackground(color),
                            color: labelChipInk(color),
                          }}
                          onClick={() => {
                            setLabelsFor(item.id);
                            labelMenuIsOpen.value = true;
                          }}
                        >
                          {label.text}
                        </button>
                      );
                    })}

                    {item.labels.length === 0 ? (
                      <button
                        type="button"
                        className="chip addLabel"
                        onClick={() => {
                          setLabelsFor(item.id);
                          labelMenuIsOpen.value = true;
                        }}
                      >
                        <IonIcon name="pricetag-outline" className="chipIcon" />
                        <span className="chipText">Label</span>
                      </button>
                    ) : null}
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

      <MenuAnimationBackground menu={destinationMenu} />
      <CSSTransition
        in={destinationMenu.value === 'destination'}
        timeout={100}
        classNames="bottomslide"
        unmountOnExit
        nodeRef={destinationRef}
      >
        {destinationRow && me ? (
          <ExpenseDestinationSheet
            nodeRef={destinationRef}
            groups={paymentReviewGroups.value}
            people={paymentReviewPeople.value}
            me={me}
            chosen={destinationRow.destination}
            amount={parseAmount(destinationRow.amount)}
            currency={destinationRow.currency}
            onClose={() => (destinationMenu.value = null)}
            onChoose={(destination) => {
              update(destinationRow.id, { destination });
              destinationMenu.value = null;
            }}
          />
        ) : (
          <div ref={destinationRef} />
        )}
      </CSSTransition>

      {labelsRow ? (
        <LabelMenu
          labelMenuIsOpen={labelMenuIsOpen}
          labels={labelsRow.labels}
          setLabels={(labels) => update(labelsRow.id, { labels })}
          isPersonal={labelsRow.destination.kind === 'personal'}
          groupId={
            labelsRow.destination.kind === 'group'
              ? labelsRow.destination.groupId
              : undefined
          }
          userId={getSignedInUserId() ?? undefined}
        />
      ) : null}
    </StyledPaymentReviewDialog>
  );
}
