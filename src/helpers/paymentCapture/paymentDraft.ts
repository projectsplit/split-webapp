import type { TransactionDraft } from '@/api/offline/pendingTransactionSync';
import type { Group } from '@/types';
import { split } from '@/components/MemberPicker/helpers/split';
import { significantDigitsFromTicker } from '../openExchangeRates';
import { parseAmount } from './parsePayment';
import { Person, ReviewItem } from './reviewItems';

/**
 * Equal shares of an amount, to the currency's smallest unit, by id. Cents that do not divide go to
 * the payer first when they share it, so nobody else's share is ever rounded up; otherwise to the
 * first in the list.
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

  // split() returns the shares smallest first; largest first puts the extra cents at the front.
  const amounts = split(
    amount,
    ordered.length,
    significantDigitsFromTicker(currency)
  ).reverse();

  return new Map(ordered.map((id, index) => [id, amounts[index]]));
};

/**
 * The expense a reviewed row files. The person paid it all; whoever shares it shares it equally.
 *
 * An error instead when it cannot be filed as chosen: without the groups loaded a group's members
 * are unknown, a group the person has left takes no expenses from them, and a split needs someone
 * to share it.
 */
export const draftFor = (
  item: ReviewItem,
  { groups, me }: { groups: Group[] | null; me: Person }
): { draft: TransactionDraft } | { error: string } => {
  const amount = parseAmount(item.amount) ?? 0;
  const { destination } = item;

  const request = {
    expenseId: item.id,
    amount,
    currency: item.currency,
    description: item.description.trim(),
    location: null,
    occurred: item.occurred,
    labels: item.labels.map(({ text, color }) => ({ text, color })),
  };

  if (destination.kind === 'personal') {
    return {
      draft: { id: item.id, kind: 'personalExpense', request, names: {} },
    };
  }

  if (destination.kind === 'quickSplit') {
    const sharing = [
      ...(destination.withMe ? [me] : []),
      ...destination.people,
    ];

    if (destination.people.length === 0) {
      return { error: 'Choose who to split it with' };
    }

    const shares = equalShares(
      amount,
      sharing.map((person) => person.userId),
      me.userId,
      item.currency
    );

    return {
      draft: {
        id: item.id,
        kind: 'nonGroupExpense',
        request: {
          ...request,
          payments: [{ userId: me.userId, amount }],
          shares: sharing.map((person) => ({
            userId: person.userId,
            amount: shares.get(person.userId) ?? 0,
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

  const shares = equalShares(
    amount,
    sharing.map((member) => member.id),
    myMember.id,
    item.currency
  );

  return {
    draft: {
      id: item.id,
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
