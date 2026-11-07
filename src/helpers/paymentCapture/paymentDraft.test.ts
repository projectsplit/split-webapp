import { describe, expect, it } from 'vitest';
import type { TransactionDraft } from '@/api/offline/pendingTransactionSync';
import type { Group } from '@/types';
import { Destination, equalShares } from '../expenseSplit';
import { draftFor } from './paymentDraft';
import { ReviewItem } from './reviewItems';

const me = { userId: 'u-me', username: 'christos' };
const maria = { userId: 'u-maria', username: 'maria' };
const nikos = { userId: 'u-nikos', username: 'nikos' };

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
  // The person filing is deliberately not first: the split still lists them first.
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

const inFlat = (memberIds?: string[]): ReviewItem =>
  row({
    destination: { kind: 'group', groupId: 'g1', groupName: 'Flat', memberIds },
  });

const draftOf = (
  item: ReviewItem,
  groups: Group[] | null = [flat]
): TransactionDraft => {
  const result = draftFor(item, { groups, me });
  if (!('draft' in result)) throw new Error(result.error);
  return result.draft;
};

const quickSplit = (
  destination: Omit<Extract<Destination, { kind: 'quickSplit' }>, 'kind'>
) => row({ destination: { kind: 'quickSplit', ...destination } });

describe('equalShares', () => {
  it('puts the payer first and the cents that do not divide last, as the split screen does', () => {
    expect([...equalShares(10, ['a', 'me', 'b'], 'me', 'EUR')]).toEqual([
      ['me', 3.33],
      ['a', 3.33],
      ['b', 3.34],
    ]);
  });

  it('keeps the order given when the payer does not share it', () => {
    expect([...equalShares(10, ['a', 'b', 'c'], 'me', 'EUR')]).toEqual([
      ['a', 3.33],
      ['b', 3.33],
      ['c', 3.34],
    ]);
  });

  it("splits to the currency's smallest unit", () => {
    expect([...equalShares(1000, ['me', 'a', 'b'], 'me', 'JPY')]).toEqual([
      ['me', 333],
      ['a', 333],
      ['b', 334],
    ]);
  });
});

describe('draftFor', () => {
  it('files a personal expense under the row id, with the labels as text and colour', () => {
    expect(draftOf(row({ amount: '12,50' }))).toEqual({
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
    });
  });

  it('files a group expense paid by the person and shared by everyone, guests included', () => {
    const draft = draftOf(inFlat());
    if (draft.kind !== 'groupExpense') throw new Error(draft.kind);

    expect(draft.groupName).toBe('Flat');
    expect(draft.memberId).toBe('m-me');
    expect(draft.names).toEqual({
      'm-maria': 'maria',
      'm-me': 'christos',
      'g-nikos': 'nikos',
    });
    expect(draft.request.groupId).toBe('g1');
    expect(draft.request.payments).toEqual([{ memberId: 'm-me', amount: 10 }]);
    expect(draft.request.shares).toEqual([
      { memberId: 'm-me', amount: 3.33 },
      { memberId: 'm-maria', amount: 3.33 },
      { memberId: 'g-nikos', amount: 3.34 },
    ]);
  });

  it('shares it between only the members chosen', () => {
    const draft = draftOf(inFlat(['m-me', 'm-maria']));
    if (draft.kind !== 'groupExpense') throw new Error(draft.kind);

    expect(draft.request.shares).toEqual([
      { memberId: 'm-me', amount: 5 },
      { memberId: 'm-maria', amount: 5 },
    ]);
  });

  it('can be paid for others without a share for the person', () => {
    const draft = draftOf(inFlat(['m-maria', 'g-nikos']));
    if (draft.kind !== 'groupExpense') throw new Error(draft.kind);

    expect(draft.request.payments).toEqual([{ memberId: 'm-me', amount: 10 }]);
    expect(draft.request.shares).toEqual([
      { memberId: 'm-maria', amount: 5 },
      { memberId: 'g-nikos', amount: 5 },
    ]);
  });

  it('splits a currency without decimals in whole units', () => {
    const draft = draftOf(
      row({ ...inFlat(), amount: '1000', currency: 'JPY' })
    );
    if (draft.kind !== 'groupExpense') throw new Error(draft.kind);

    expect(draft.request.shares.map((share) => share.amount)).toEqual([
      333, 333, 334,
    ]);
  });

  it('files a quick split with the people chosen and the person, paid by the person', () => {
    expect(
      draftOf(quickSplit({ people: [maria, nikos], withMe: true }))
    ).toEqual({
      id: 'c0ffee00-0000-5000-8000-000000000001',
      kind: 'nonGroupExpense',
      names: { 'u-me': 'christos', 'u-maria': 'maria', 'u-nikos': 'nikos' },
      request: {
        expenseId: 'c0ffee00-0000-5000-8000-000000000001',
        amount: 10,
        currency: 'EUR',
        description: 'Lidl',
        location: null,
        occurred: '2026-11-07T12:00:00.000Z',
        labels: [{ text: 'groceries', color: 'green' }],
        payments: [{ userId: 'u-me', amount: 10 }],
        shares: [
          { userId: 'u-me', amount: 3.33 },
          { userId: 'u-maria', amount: 3.33 },
          { userId: 'u-nikos', amount: 3.34 },
        ],
      },
    });
  });

  it('files a quick split paid for someone else entirely', () => {
    const draft = draftOf(quickSplit({ people: [maria], withMe: false }));
    if (draft.kind !== 'nonGroupExpense') throw new Error(draft.kind);

    expect(draft.request.shares).toEqual([{ userId: 'u-maria', amount: 10 }]);
  });

  it('files a quick split without the groups loaded', () => {
    expect(
      draftOf(quickSplit({ people: [maria], withMe: true }), null).kind
    ).toBe('nonGroupExpense');
  });

  it('refuses a quick split with nobody to split it with', () => {
    expect(
      draftFor(quickSplit({ people: [], withMe: true }), { groups: [flat], me })
    ).toEqual({ error: 'Choose who to split it with' });
  });

  it('waits for a connection when the groups are not loaded', () => {
    expect(draftFor(inFlat(), { groups: null, me })).toEqual({
      error: 'Adding it to Flat needs a connection',
    });
  });

  it('refuses a group the person has left', () => {
    expect(draftFor(inFlat(), { groups: [], me })).toEqual({
      error: "You're no longer in Flat",
    });
    expect(
      draftFor(inFlat(), {
        groups: [flat],
        me: { userId: 'u-someone', username: 'x' },
      })
    ).toEqual({ error: "You're no longer in Flat" });
  });

  it('refuses a group split that nobody shares', () => {
    expect(draftFor(inFlat(['m-gone']), { groups: [flat], me })).toEqual({
      error: 'Choose who shares it',
    });
  });
});
