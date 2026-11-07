import type { Group } from '@/types';
import { draftForExpense, Person } from '../expenseSplit';
import { parseAmount } from './parsePayment';
import { ReviewItem } from './reviewItems';

/**
 * The expense a reviewed row files, where the person chose and shared as they ticked. A payment read
 * from a notification has no location: the listener cannot ask for one with the app closed.
 */
export const draftFor = (
  item: ReviewItem,
  context: { groups: Group[] | null; me: Person }
) =>
  draftForExpense(
    {
      id: item.id,
      amount: parseAmount(item.amount) ?? 0,
      currency: item.currency,
      description: item.description.trim(),
      location: null,
      occurred: item.occurred,
      labels: item.labels.map(({ text, color }) => ({ text, color })),
    },
    item.destination,
    context
  );
