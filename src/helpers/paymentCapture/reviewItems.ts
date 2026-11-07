import { Label } from '@/types';
import { CapturedPayment, GOOGLE_WALLET } from './paymentCapture';
import { ParsedPayment, parsePayment, PaymentKind } from './parsePayment';

/** An expense already in Buqs, as far as telling a repeat goes. */
export type KnownExpense = {
  id: string;
  amount: number;
  currency: string;
  occurred: string;
  description: string;
};

/**
 * Where a payment is filed: the person's own expenses, or a group, split equally among everyone in
 * it. The group's name is kept for showing it while the groups themselves cannot be loaded.
 */
export type Destination =
  | { kind: 'personal' }
  | { kind: 'group'; groupId: string; groupName: string };

export const PERSONAL: Destination = { kind: 'personal' };

/** A group a payment can be filed in, as far as choosing one goes. */
export type GroupOption = { id: string; name: string };

/** What the person chose for a merchant last time. */
export type MerchantChoice = {
  description?: string;
  skip?: boolean;
  destination?: Destination;
  labels?: { text: string; color: string }[];
};

export type ReviewItem = {
  /** What the expense is filed under: its earliest capture's id, so filing it twice stores it once. */
  id: string;
  captureIds: string[];
  appNames: string[];
  occurred: string;
  /** As written in the row. Read with parseAmount when filed. */
  amount: string;
  currency: string;
  description: string;
  /** The merchant as read from the notification, which choices are remembered by. */
  merchant: string;
  destination: Destination;
  /** Shaped as the label picker keeps them; a label new to the person has its text as its id. */
  labels: Label[];
  kind: PaymentKind;
  /** The notification as posted, shown so the person can check what Buqs made of it. */
  source: string;
  selected: boolean;
  /** Whether Buqs ticked it to begin with. Unticking one it suggested is what says "not this one". */
  suggested: boolean;
  /** An expense already in Buqs that looks like the same payment. */
  alreadyIn: KnownExpense | null;
  /** Something the person has to put right before this one can be filed. */
  problem: 'amount' | 'currency' | null;
  /** Why filing it failed, when it did. */
  error?: string;
};

/**
 * How far apart two apps' notifications of one payment arrive. The bank's comes at once; a wallet's
 * can take a few minutes.
 */
const SAME_PAYMENT_MS = 15 * 60 * 1000;

/**
 * How far an expense already filed can be from the payment and still be taken for it. A recurring
 * expense is filed at its scheduled time, and the charge appears whenever the bank processes it.
 */
const ALREADY_IN_MS = 36 * 60 * 60 * 1000;

type Parsed = CapturedPayment & ParsedPayment;

const sameAmount = (a: number | null, b: number | null) =>
  a !== null && b !== null && Math.abs(a - b) < 0.005;

/** The words long enough to tell merchants apart: QUALITY STORES EE gives quality and stores. */
const merchantWords = (merchant: string) =>
  new Set(
    merchant
      .toLowerCase()
      .split(/[^\p{L}\p{N}]+/u)
      .filter((word) => word.length >= 4)
  );

const sameMerchant = (a: string, b: string) => {
  const words = merchantWords(a);
  return [...merchantWords(b)].some((word) => words.has(word));
};

/**
 * One payment told by two apps, such as the bank and the wallet the card is in, or a card and the
 * Curve card in front of it. Two notifications from the same app are two payments: the same coffee
 * twice in a morning is two coffees.
 *
 * In one currency the amounts must agree. A card held in another currency tells of the payment in
 * its own (€10.60 in the wallet, £9.27 from the bank), so there only the merchant can tie them.
 */
const isSamePayment = (group: Parsed[], capture: Parsed) =>
  group.every((other) => other.packageName !== capture.packageName) &&
  group.some(
    (other) =>
      Math.abs(other.postedAt - capture.postedAt) <= SAME_PAYMENT_MS &&
      (other.currency === capture.currency
        ? sameAmount(other.amount, capture.amount)
        : sameMerchant(other.merchant, capture.merchant))
  );

const formatAmount = (amount: number) =>
  Number.isInteger(amount) ? String(amount) : amount.toFixed(2);

/**
 * The group remembered for a merchant, under its current name, if the person is still in it.
 * Without the list of groups (no connection) the memory is trusted as it is; filing a payment in a
 * group needs the connection anyway, and says so.
 */
const currentDestination = (
  remembered: Destination | undefined,
  groups: GroupOption[] | null
): Destination => {
  if (remembered?.kind !== 'group') return PERSONAL;
  if (groups === null) return remembered;

  const group = groups.find((x) => x.id === remembered.groupId);
  return group
    ? { kind: 'group', groupId: group.id, groupName: group.name }
    : PERSONAL;
};

const toReviewItem = (
  group: Parsed[],
  homeCurrency: string,
  known: KnownExpense[],
  groups: GroupOption[] | null,
  recall: (merchant: string) => MerchantChoice | undefined
): ReviewItem => {
  const [first] = group;

  // Google Wallet names merchants from Google's own listings, which beats a card network's
  // abbreviation; otherwise whichever app named one at all.
  const primary =
    group.find((x) => x.packageName === GOOGLE_WALLET && x.merchant) ??
    group.find((x) => x.merchant) ??
    first;

  const kind = group.some((x) => x.kind === 'spend') ? 'spend' : primary.kind;
  const currency = primary.currency ?? homeCurrency;
  const choice = primary.merchant ? recall(primary.merchant) : undefined;

  const alreadyIn =
    known.find(
      (expense) =>
        expense.currency === currency &&
        sameAmount(expense.amount, primary.amount) &&
        Math.abs(Date.parse(expense.occurred) - first.postedAt) <= ALREADY_IN_MS
    ) ?? null;

  const problem =
    primary.amount === null
      ? 'amount'
      : primary.currency === null
        ? 'currency'
        : null;

  const suggested = kind === 'spend' && !problem && !alreadyIn && !choice?.skip;

  // A title that is only the app's name says nothing the row does not already show.
  const title =
    primary.title.trim().toLowerCase() === primary.appName.trim().toLowerCase()
      ? ''
      : primary.title;

  return {
    id: first.id,
    captureIds: group.map((x) => x.id),
    appNames: [...new Set(group.map((x) => x.appName))],
    occurred: new Date(first.postedAt).toISOString(),
    amount: primary.amount === null ? '' : formatAmount(primary.amount),
    currency,
    description: choice?.description ?? primary.merchant,
    merchant: primary.merchant,
    destination: currentDestination(choice?.destination, groups),
    labels: (choice?.labels ?? []).map((label) => ({
      id: label.text,
      ...label,
    })),
    kind,
    source: [title, primary.text].filter(Boolean).join(' · '),
    selected: suggested,
    suggested,
    alreadyIn,
    problem,
  };
};

/**
 * Turns what the phone collected into rows to review, oldest first.
 *
 * Also says which captures need no review at all, for the caller to drop from the phone: prompts,
 * which are never payments, and payments whose expense is already filed under their id — filed in a
 * session that ended before it could tell the phone.
 */
export const buildReviewItems = (
  captures: CapturedPayment[],
  {
    homeCurrency,
    known,
    groups,
    recall,
  }: {
    homeCurrency: string;
    known: KnownExpense[];
    /** The person's groups, or null when they could not be loaded. */
    groups: GroupOption[] | null;
    recall: (merchant: string) => MerchantChoice | undefined;
  }
): { items: ReviewItem[]; dropped: string[] } => {
  const parsed = captures
    .map((capture) => ({ ...capture, ...parsePayment(capture, homeCurrency) }))
    .sort((a, b) => a.postedAt - b.postedAt);

  // The notifications of each payment, usually one, two when a wallet and a bank both tell of it.
  const payments: Parsed[][] = [];

  for (const capture of parsed.filter((x) => x.kind !== 'prompt')) {
    const payment = payments.find((candidate) =>
      isSamePayment(candidate, capture)
    );

    if (payment) payment.push(capture);
    else payments.push([capture]);
  }

  const knownIds = new Set(known.map((expense) => expense.id));
  const isFiled = (payment: Parsed[]) =>
    payment.some((x) => knownIds.has(x.id));

  return {
    items: payments
      .filter((payment) => !isFiled(payment))
      .map((payment) =>
        toReviewItem(payment, homeCurrency, known, groups, recall)
      ),
    dropped: [
      ...parsed.filter((x) => x.kind === 'prompt'),
      ...payments.filter(isFiled).flat(),
    ].map((x) => x.id),
  };
};
