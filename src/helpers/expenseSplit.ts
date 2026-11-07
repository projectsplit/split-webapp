import type { TransactionDraft } from '@/api/offline/pendingTransactionSync';
import type { GeoLocation, Group } from '@/types';
import { split } from '@/components/MemberPicker/helpers/split';
import { significantDigitsFromTicker } from './openExchangeRates';

/** Someone the person can quick-split with, which takes being connected to them. */
export type Person = { userId: string; username: string };

/**
 * Where an expense goes and who shares it. The person filing it paid it, and whoever shares it
 * shares it equally unless `shares` says otherwise. Used for payments read from notifications and
 * for splitting a personal expense after the fact.
 *
 * - `group`: `memberIds` are the members and guests sharing it. Without them everyone in the group
 *   shares it, whoever is in the group when it is filed (or whoever `shares` names). The group's
 *   name is kept for showing it while the groups themselves cannot be loaded.
 * - `quickSplit`: shared with people outside any group, the person among them unless `withMe` is
 *   false.
 *
 * Either way `shares`, when there, says what each one pays instead of an equal split: the amounts
 * the person set on the expense form's split screen, by member or user id.
 */
export type Destination =
  | { kind: 'personal' }
  | {
      kind: 'group';
      groupId: string;
      groupName: string;
      memberIds?: string[];
      shares?: Record<string, number>;
    }
  | {
      kind: 'quickSplit';
      people: Person[];
      withMe: boolean;
      shares?: Record<string, number>;
    };

export const PERSONAL: Destination = { kind: 'personal' };

/**
 * The same destination split equally among the same people. Amounts set for one payment mean
 * nothing for the next, which is what is remembered for a merchant.
 */
export const evenly = (destination: Destination): Destination =>
  destination.kind === 'personal'
    ? destination
    : { ...destination, shares: undefined };

/** What an expense says, whichever list it goes into. */
export type ExpenseBasics = {
  id: string;
  amount: number;
  currency: string;
  description: string;
  location: GeoLocation | null;
  occurred: string;
  labels: { text: string; color: string }[];
};

/** Whether amounts add up to a total, to the currency's smallest unit. */
export const addsUp = (amounts: number[], total: number, currency: string) => {
  const digits = significantDigitsFromTicker(currency);
  const sum = amounts.reduce((acc, amount) => acc + amount, 0);

  return Number(sum.toFixed(digits)) === Number(total.toFixed(digits));
};

/**
 * Equal shares of an amount, to the currency's smallest unit, by id: the payer first when they share
 * it, then the rest in the order given. That is the order the split screen lists them in, and the
 * cents that do not divide go to the last ones as they do there, so what it shows is what is filed.
 */
export const equalShares = (
  amount: number,
  ids: string[],
  payerId: string,
  currency: string
): Map<string, number> => {
  const ordered = ids.includes(payerId)
    ? [payerId, ...ids.filter((id) => id !== payerId)]
    : ids;

  const amounts = split(
    amount,
    ordered.length,
    significantDigitsFromTicker(currency)
  );

  return new Map(ordered.map((id, index) => [id, amounts[index]]));
};

/**
 * What each one pays: the amounts set on the split screen when there are some, otherwise equal
 * shares. Set amounts name who shares it, so anyone who has joined since is left out of it; set
 * amounts that no longer add up to the expense (its amount was changed after they were set, or one
 * of them has left) are refused rather than filed wrong.
 */
const sharesFor = (
  amount: number,
  ids: string[],
  payerId: string,
  currency: string,
  set: Record<string, number> | undefined
): Map<string, number> | { error: string } => {
  if (!set) return equalShares(amount, ids, payerId, currency);

  const sharing = ids.filter((id) => set[id] !== undefined);

  if (
    !addsUp(
      sharing.map((id) => set[id]),
      amount,
      currency
    )
  ) {
    return {
      error: "The split doesn't add up to the amount. Open it to fix it.",
    };
  }

  const ordered = sharing.includes(payerId)
    ? [payerId, ...sharing.filter((id) => id !== payerId)]
    : sharing;

  return new Map(ordered.map((id) => [id, set[id]]));
};

/**
 * The new expense filed for `expense` where `destination` says: the person paid it all, and whoever
 * shares it shares it equally or as the split screen set.
 *
 * An error instead when it cannot be filed as chosen: without the groups loaded a group's members
 * are unknown, a group the person has left takes no expenses from them, and a split needs someone
 * to share it.
 */
export const draftForExpense = (
  expense: ExpenseBasics,
  destination: Destination,
  { groups, me }: { groups: Group[] | null; me: Person }
): { draft: TransactionDraft } | { error: string } => {
  const { id, amount, currency } = expense;

  const request = {
    expenseId: id,
    amount,
    currency,
    description: expense.description,
    location: expense.location,
    occurred: expense.occurred,
    labels: expense.labels,
  };

  if (destination.kind === 'personal') {
    return { draft: { id, kind: 'personalExpense', request, names: {} } };
  }

  if (destination.kind === 'quickSplit') {
    const sharing = [
      ...(destination.withMe ? [me] : []),
      ...destination.people,
    ];

    if (destination.people.length === 0) {
      return { error: 'Choose who to split it with' };
    }

    const shares = sharesFor(
      amount,
      sharing.map((person) => person.userId),
      me.userId,
      currency,
      destination.shares
    );
    if ('error' in shares) return shares;

    return {
      draft: {
        id,
        kind: 'nonGroupExpense',
        request: {
          ...request,
          payments: [{ userId: me.userId, amount }],
          shares: [...shares].map(([userId, share]) => ({
            userId,
            amount: share,
          })),
        },
        names: Object.fromEntries(
          [me, ...destination.people].map((person) => [
            person.userId,
            person.username,
          ])
        ),
      },
    };
  }

  const { groupId, groupName, memberIds } = destination;
  const group = groups?.find((x) => x.id === groupId);

  if (!group) {
    return {
      error:
        groups === null
          ? `Adding it to ${groupName} needs a connection`
          : `You're no longer in ${groupName}`,
    };
  }

  const myMember = group.members.find((member) => member.userId === me.userId);
  if (!myMember) return { error: `You're no longer in ${group.name}` };

  const everyone = [...group.members, ...group.guests].map(({ id, name }) => ({
    id,
    name,
  }));
  const sharing = memberIds
    ? everyone.filter((member) => memberIds.includes(member.id))
    : everyone;

  if (sharing.length === 0) return { error: 'Choose who shares it' };

  const shares = sharesFor(
    amount,
    sharing.map((member) => member.id),
    myMember.id,
    currency,
    destination.shares
  );
  if ('error' in shares) return shares;

  return {
    draft: {
      id,
      kind: 'groupExpense',
      request: {
        ...request,
        groupId,
        payments: [{ memberId: myMember.id, amount }],
        shares: [...shares].map(([memberId, share]) => ({
          memberId,
          amount: share,
        })),
      },
      groupName: group.name,
      memberId: myMember.id,
      names: Object.fromEntries(
        everyone.map((member) => [member.id, member.name])
      ),
    },
  };
};
