import type { TransactionDraft } from '@/api/offline/pendingTransactionSync';
import type { Group } from '@/types';
import { split } from '@/components/MemberPicker/helpers/split';
import { significantDigitsFromTicker } from '../openExchangeRates';
import { parseAmount } from './parsePayment';
import { ReviewItem } from './reviewItems';

/**
 * The expense a reviewed row files. In a group, the person paid it all and everyone in the group
 * shares it equally, guests included. Cents that do not divide go to the person who paid first, so
 * nobody else's share is ever rounded up.
 *
 * An error instead when the group cannot be filed in: without the groups loaded the members are
 * unknown, and a group the person has left takes no expenses from them.
 */
export const draftFor = (
  item: ReviewItem,
  { groups, userId }: { groups: Group[] | null; userId: string }
): { draft: TransactionDraft } | { error: string } => {
  const amount = parseAmount(item.amount) ?? 0;

  const request = {
    expenseId: item.id,
    amount,
    currency: item.currency,
    description: item.description.trim(),
    location: null,
    occurred: item.occurred,
    labels: item.labels.map(({ text, color }) => ({ text, color })),
  };

  if (item.destination.kind === 'personal') {
    return {
      draft: { id: item.id, kind: 'personalExpense', request, names: {} },
    };
  }

  const { groupId, groupName } = item.destination;
  const group = groups?.find((x) => x.id === groupId);

  if (!group) {
    return {
      error:
        groups === null
          ? `Adding it to ${groupName} needs a connection`
          : `You're no longer in ${groupName}`,
    };
  }

  const me = group.members.find((member) => member.userId === userId);
  if (!me) return { error: `You're no longer in ${group.name}` };

  const everyone = [
    me,
    ...[...group.members, ...group.guests].filter((x) => x.id !== me.id),
  ].map(({ id, name }) => ({ id, name }));

  // split() returns the shares smallest first; largest first puts any extra cent on the payer.
  const shares = split(
    amount,
    everyone.length,
    significantDigitsFromTicker(item.currency)
  ).reverse();

  return {
    draft: {
      id: item.id,
      kind: 'groupExpense',
      request: {
        ...request,
        groupId,
        payments: [{ memberId: me.id, amount }],
        shares: everyone.map((member, index) => ({
          memberId: member.id,
          amount: shares[index],
        })),
      },
      groupName: group.name,
      memberId: me.id,
      names: Object.fromEntries(
        everyone.map((member) => [member.id, member.name])
      ),
    },
  };
};
