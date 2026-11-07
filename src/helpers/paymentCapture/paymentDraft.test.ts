import { describe, expect, it } from 'vitest';
import type { Group } from '@/types';
import { draftFor } from './paymentDraft';
import { ReviewItem } from './reviewItems';

const row = (overrides: Partial<ReviewItem> = {}): ReviewItem => ({
  id: 'c0ffee00-0000-5000-8000-000000000001',
  captureIds: ['c0ffee00-0000-5000-8000-000000000001'],
  appNames: ['Revolut'],
  occurred: '2026-11-07T12:00:00.000Z',
  amount: '10.00',
  currency: 'EUR',
  description: ' Lidl ',
  merchant: 'Lidl',
  destination: { kind: 'personal' },
  labels: [{ id: 'groceries', text: 'groceries', color: 'green' }],
  kind: 'spend',
  source: 'You paid €10.00 at Lidl',
  selected: true,
  suggested: true,
  alreadyIn: null,
  problem: null,
  ...overrides,
});

const flat: Group = {
  id: 'g1',
  created: new Date(),
  updated: new Date(),
  ownerId: 'u-me',
  name: 'Flat',
  currency: 'EUR',
  // The person filing is deliberately not first: the extra cent should still be theirs.
  members: [
    { id: 'm-maria', name: 'maria', userId: 'u-maria', joined: new Date() },
    { id: 'm-me', name: 'christos', userId: 'u-me', joined: new Date() },
  ],
  guests: [
    { id: 'g-nikos', name: 'nikos', canBeRemoved: true, joined: new Date() },
  ],
  labels: [],
  isArchived: false,
};

const inFlat = row({
  destination: { kind: 'group', groupId: 'g1', groupName: 'Flat' },
});

describe('draftFor', () => {
  it('files a personal expense under the row id, with the labels as text and colour', () => {
    expect(
      draftFor(row({ amount: '12,50' }), { groups: [], userId: 'u-me' })
    ).toEqual({
      draft: {
        id: 'c0ffee00-0000-5000-8000-000000000001',
        kind: 'personalExpense',
        names: {},
        request: {
          expenseId: 'c0ffee00-0000-5000-8000-000000000001',
          amount: 12.5,
          currency: 'EUR',
          description: 'Lidl',
          location: null,
          occurred: '2026-11-07T12:00:00.000Z',
          labels: [{ text: 'groceries', color: 'green' }],
        },
      },
    });
  });

  it('files a group expense paid by the person and split equally, guests included', () => {
    const result = draftFor(inFlat, { groups: [flat], userId: 'u-me' });
    if (!('draft' in result) || result.draft.kind !== 'groupExpense') {
      throw new Error(`Expected a group draft: ${JSON.stringify(result)}`);
    }

    const { draft } = result;
    expect(draft.groupName).toBe('Flat');
    expect(draft.memberId).toBe('m-me');
    expect(draft.names).toEqual({
      'm-me': 'christos',
      'm-maria': 'maria',
      'g-nikos': 'nikos',
    });
    expect(draft.request.groupId).toBe('g1');
    expect(draft.request.payments).toEqual([{ memberId: 'm-me', amount: 10 }]);
    expect(draft.request.shares).toEqual([
      { memberId: 'm-me', amount: 3.34 },
      { memberId: 'm-maria', amount: 3.33 },
      { memberId: 'g-nikos', amount: 3.33 },
    ]);
  });

  it('splits a currency without decimals in whole units', () => {
    const result = draftFor(
      row({ ...inFlat, amount: '1000', currency: 'JPY' }),
      {
        groups: [flat],
        userId: 'u-me',
      }
    );
    if (!('draft' in result) || result.draft.kind !== 'groupExpense') {
      throw new Error(`Expected a group draft: ${JSON.stringify(result)}`);
    }

    expect(result.draft.request.shares.map((share) => share.amount)).toEqual([
      334, 333, 333,
    ]);
  });

  it('waits for a connection when the groups are not loaded', () => {
    expect(draftFor(inFlat, { groups: null, userId: 'u-me' })).toEqual({
      error: 'Adding it to Flat needs a connection',
    });
  });

  it('refuses a group the person has left', () => {
    expect(draftFor(inFlat, { groups: [], userId: 'u-me' })).toEqual({
      error: "You're no longer in Flat",
    });
    expect(
      draftFor(inFlat, { groups: [flat], userId: 'u-someone-else' })
    ).toEqual({
      error: "You're no longer in Flat",
    });
  });
});
