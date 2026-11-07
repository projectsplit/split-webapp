import { signal } from '@preact/signals-react';
import { AxiosError } from 'axios';
import { apiClient } from '@/api/apiClients';
import { queryClient } from '@/api/queryClient';
import { pendingTransactions } from '@/api/offline/pendingTransactions';
import {
  refreshAfterNewTransactions,
  sendOrKeep,
  TransactionDraft,
} from '@/api/offline/pendingTransactionSync';
import { getSignedInUserId } from '@/helpers/isUserAuthenticated';
import { loadSplitGroups, loadSplitPeople } from '@/helpers/splitTargets';
import { GetExpensesResponse, Group } from '@/types';
import { rememberMerchants, recallMerchant } from './merchantMemory';
import { parseAmount } from './parsePayment';
import {
  CapturedPayment,
  isPaymentCaptureAvailable,
  PaymentCapture,
} from './paymentCapture';
import { draftFor } from './paymentDraft';
import { Person } from '../expenseSplit';
import { buildReviewItems, KnownExpense, ReviewItem } from './reviewItems';

/** The payments waiting for the person, rebuilt whenever the phone has collected more. */
export const paymentReviewItems = signal<ReviewItem[]>([]);

/**
 * The groups payments can be filed in. Null until they have been loaded once, which without a
 * connection they may never be: rows remembered for a group then keep it, and filing one waits
 * until the members can be known.
 */
export const paymentReviewGroups = signal<Group[] | null>(null);

/**
 * The people a payment can be quick-split with: those the person is connected to. Null until loaded
 * once. A quick split needs no lookup to be filed, so a remembered one works offline as it is.
 */
export const paymentReviewPeople = signal<Person[] | null>(null);

const DAY_MS = 24 * 60 * 60 * 1000;

const dateOf = (ms: number) => new Date(ms).toISOString().slice(0, 10);

/**
 * The person's expenses around the payments' dates, to tell the ones already in Buqs. Without a
 * connection there is nothing to compare with, and every payment is offered.
 */
const expensesAround = async (
  captures: CapturedPayment[]
): Promise<KnownExpense[]> => {
  const times = captures.map((capture) => capture.postedAt);
  const params = new URLSearchParams({
    pageSize: '100',
    after: dateOf(Math.min(...times) - 2 * DAY_MS),
    before: dateOf(Math.max(...times) + 2 * DAY_MS),
  });

  try {
    const { data } = await apiClient.get<GetExpensesResponse>(
      '/expenses/personal',
      { params }
    );

    return data.expenses.map(
      ({ id, amount, currency, occurred, description }) => ({
        id,
        amount,
        currency,
        occurred,
        description,
      })
    );
  } catch {
    return [];
  }
};

// Without a connection, whatever was loaded last stands in.
const loadGroups = () =>
  loadSplitGroups().catch(() => paymentReviewGroups.peek());
const loadPeople = () =>
  loadSplitPeople().catch(() => paymentReviewPeople.peek());

/** Expenses filed on this phone that the server has not confirmed yet, which count as in Buqs. */
const pendingExpenses = (): KnownExpense[] => {
  const userId = getSignedInUserId();

  return pendingTransactions.value.flatMap((x) =>
    x.userId === userId && x.kind === 'personalExpense'
      ? [
          {
            id: x.id,
            amount: x.request.amount,
            currency: x.request.currency,
            occurred: x.request.occurred,
            description: x.request.description,
          },
        ]
      : []
  );
};

/** Keeps what the person has already changed in a row when the rows are rebuilt under them. */
const keepEdits = (previous: ReviewItem[], next: ReviewItem[]) =>
  next.map((item) => {
    const edited = previous.find((x) => x.id === item.id);
    if (!edited) return item;

    const {
      amount,
      currency,
      description,
      destination,
      labels,
      selected,
      problem,
      error,
    } = edited;

    return {
      ...item,
      amount,
      currency,
      description,
      destination,
      labels,
      selected,
      problem,
      error,
    };
  });

let running: Promise<void> | null = null;
let runAgain = false;

const load = async (homeCurrency: string) => {
  if (!(await isPaymentCaptureAvailable())) return;

  const { captures } = await PaymentCapture.getCaptures();

  if (captures.length === 0) {
    paymentReviewItems.value = [];
    return;
  }

  const [expenses, groups, people] = await Promise.all([
    expensesAround(captures),
    loadGroups(),
    loadPeople(),
  ]);

  paymentReviewGroups.value = groups;
  paymentReviewPeople.value = people;

  const { items, dropped } = buildReviewItems(captures, {
    homeCurrency,
    known: [...expenses, ...pendingExpenses()],
    groups:
      groups?.map(({ id, name, members, guests }) => ({
        id,
        name,
        memberIds: [...members, ...guests].map((member) => member.id),
      })) ?? null,
    people,
    recall: recallMerchant,
  });

  if (dropped.length > 0) await PaymentCapture.removeCaptures({ ids: dropped });

  paymentReviewItems.value = keepEdits(paymentReviewItems.peek(), items);
};

/**
 * Reads what the phone has collected into rows. A capture that arrives while this runs is picked
 * up by running once more, rather than waiting for the next time the app comes to the front.
 */
export const loadPaymentReview = (homeCurrency: string): Promise<void> => {
  if (running) {
    runAgain = true;
    return running;
  }

  running = (async () => {
    try {
      do {
        runAgain = false;
        await load(homeCurrency);
      } while (runAgain);
    } catch (error) {
      console.error('Reading collected payments failed:', error);
    } finally {
      running = null;
    }
  })();

  return running;
};

/** Why a row cannot be filed as it stands, or null when it can. */
export const rowProblem = (item: ReviewItem): string | null => {
  if (!item.selected) return null;
  if (parseAmount(item.amount) === null) return 'Enter the amount';
  if (!item.description.trim()) return 'Add a description';
  return null;
};

/**
 * Files the ticked rows, each where the person chose, and lets go of the rest, which they have
 * looked at and left out. Each goes the same way as one from the expense form, so without a
 * connection it waits on the phone and is sent later, under the id that keeps it from being stored
 * twice.
 *
 * Rows that could not be filed stay, with the reason, for the person to put right. Resolves to how
 * many were filed. `me` is who is filing, by name too, since a quick split records names.
 */
export const fileReviewedPayments = async (items: ReviewItem[], me: Person) => {
  const groups = paymentReviewGroups.peek();

  const errors = new Map<string, string>();
  const drafts: TransactionDraft[] = [];

  for (const item of items.filter((x) => x.selected)) {
    const result = draftFor(item, { groups, me });

    if ('error' in result) errors.set(item.id, result.error);
    else drafts.push(result.draft);
  }

  const results = await Promise.allSettled(
    drafts.map((draft) => sendOrKeep(draft))
  );

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') return;

    const error = result.reason as AxiosError;
    errors.set(
      drafts[index].id,
      error.response?.data
        ? String(error.response.data)
        : 'Could not add this expense. Please try again.'
    );
  });

  const settled = items.filter((x) => !errors.has(x.id));

  await PaymentCapture.removeCaptures({
    ids: settled.flatMap((x) => x.captureIds),
  });

  rememberMerchants(
    settled.map((x) => ({
      merchant: x.merchant,
      description: x.description.trim(),
      destination: x.destination,
      labels: x.labels,
      added: x.selected,
      deliberate: x.suggested && !x.selected,
    }))
  );

  paymentReviewItems.value = items
    .filter((x) => errors.has(x.id))
    .map((x) => ({ ...x, error: errors.get(x.id) }));

  // A kept expense changed nothing on the server yet; the sync refreshes once it has.
  const sent = drafts.filter((_, index) => {
    const result = results[index];
    return result.status === 'fulfilled' && result.value === 'sent';
  });

  if (sent.length > 0) {
    await refreshAfterNewTransactions(
      queryClient,
      sent.map((draft) => ({
        kind: draft.kind,
        groupId:
          draft.kind === 'groupExpense' ? draft.request.groupId : undefined,
      }))
    );
  }

  return results.filter((result) => result.status === 'fulfilled').length;
};
