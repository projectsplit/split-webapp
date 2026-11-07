import { signal } from '@preact/signals-react';
import { AxiosError } from 'axios';
import { apiClient } from '@/api/apiClients';
import { queryClient } from '@/api/queryClient';
import { pendingTransactions } from '@/api/offline/pendingTransactions';
import {
  refreshAfterNewTransactions,
  sendOrKeep,
} from '@/api/offline/pendingTransactionSync';
import { getSignedInUserId } from '@/helpers/isUserAuthenticated';
import { GetExpensesResponse } from '@/types';
import { rememberMerchants, recallMerchant } from './merchantMemory';
import { parseAmount } from './parsePayment';
import {
  CapturedPayment,
  isPaymentCaptureAvailable,
  PaymentCapture,
} from './paymentCapture';
import { buildReviewItems, KnownExpense, ReviewItem } from './reviewItems';

/** The payments waiting for the person, rebuilt whenever the phone has collected more. */
export const paymentReviewItems = signal<ReviewItem[]>([]);

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

    const { amount, currency, description, selected, problem, error } = edited;
    return { ...item, amount, currency, description, selected, problem, error };
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

  const known = [...(await expensesAround(captures)), ...pendingExpenses()];
  const { items, dropped } = buildReviewItems(captures, {
    homeCurrency,
    known,
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
 * Files the ticked rows as personal expenses and lets go of the rest, which the person has looked at
 * and left out. Each goes the same way as one from the expense form, so without a connection it
 * waits on the phone and is sent later, under the id that keeps it from being stored twice.
 *
 * Rows the server turned down stay, with its reason, for the person to put right. Resolves to how
 * many were filed.
 */
export const fileReviewedPayments = async (items: ReviewItem[]) => {
  const selected = items.filter((x) => x.selected);

  const results = await Promise.allSettled(
    selected.map((item) =>
      sendOrKeep({
        id: item.id,
        kind: 'personalExpense',
        request: {
          expenseId: item.id,
          amount: parseAmount(item.amount) ?? 0,
          currency: item.currency,
          description: item.description.trim(),
          location: null,
          occurred: item.occurred,
          labels: [],
        },
        names: {},
      })
    )
  );

  const errors = new Map<string, string>();

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') return;

    const error = result.reason as AxiosError;
    errors.set(
      selected[index].id,
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
      added: x.selected,
      deliberate: x.suggested && !x.selected,
    }))
  );

  paymentReviewItems.value = items
    .filter((x) => errors.has(x.id))
    .map((x) => ({ ...x, error: errors.get(x.id) }));

  if (
    results.some(
      (result) => result.status === 'fulfilled' && result.value === 'sent'
    )
  ) {
    await refreshAfterNewTransactions(queryClient, [
      { kind: 'personalExpense' },
    ]);
  }

  return selected.length - errors.size;
};
