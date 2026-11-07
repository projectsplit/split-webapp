import { describe, expect, it } from 'vitest';
import type { GeoLocation, Group } from '@/types';
import { draftForExpense, ExpenseBasics } from './expenseSplit';

const me = { userId: 'u-me', username: 'christos' };

const place: GeoLocation = {
  coordinates: { latitude: 37.98, longitude: 23.73 },
  google: { id: 'place-1', name: 'Lidl Kifisias', address: 'Kifisias 1' },
} as GeoLocation;

// A personal expense as it is split after the fact: it keeps its place and labels.
const lidl: ExpenseBasics = {
  id: 'new-id',
  amount: 10,
  currency: 'EUR',
  description: 'Lidl',
  location: place,
  occurred: '2026-11-07T12:00:00.000Z',
  labels: [{ text: 'groceries', color: 'color1' }],
};

const flat: Group = {
  id: 'g1',
  created: new Date(),
  updated: new Date(),
  ownerId: 'u-me',
  name: 'Flat',
  currency: 'EUR',
  members: [
    { id: 'm-me', name: 'christos', userId: 'u-me', joined: new Date() },
    { id: 'm-maria', name: 'maria', userId: 'u-maria', joined: new Date() },
  ],
  guests: [],
  labels: [],
  isArchived: false,
};

describe('draftForExpense', () => {
  it('keeps the place, labels and time when splitting in a group, under the new id', () => {
    const result = draftForExpense(
      lidl,
      { kind: 'group', groupId: 'g1', groupName: 'Flat' },
      { groups: [flat], me }
    );
    if (!('draft' in result) || result.draft.kind !== 'groupExpense') {
      throw new Error(JSON.stringify(result));
    }

    expect(result.draft.id).toBe('new-id');
    expect(result.draft.request).toMatchObject({
      expenseId: 'new-id',
      groupId: 'g1',
      description: 'Lidl',
      location: place,
      occurred: '2026-11-07T12:00:00.000Z',
      labels: [{ text: 'groceries', color: 'color1' }],
      payments: [{ memberId: 'm-me', amount: 10 }],
      shares: [
        { memberId: 'm-me', amount: 5 },
        { memberId: 'm-maria', amount: 5 },
      ],
    });
  });

  it('keeps the place when quick-splitting', () => {
    const result = draftForExpense(
      lidl,
      {
        kind: 'quickSplit',
        people: [{ userId: 'u-maria', username: 'maria' }],
        withMe: true,
      },
      { groups: null, me }
    );
    if (!('draft' in result) || result.draft.kind !== 'nonGroupExpense') {
      throw new Error(JSON.stringify(result));
    }

    expect(result.draft.request.location).toBe(place);
    expect(result.draft.request.shares).toEqual([
      { userId: 'u-me', amount: 5 },
      { userId: 'u-maria', amount: 5 },
    ]);
  });

  it('files the amounts set on the split screen, the person first', () => {
    const result = draftForExpense(
      lidl,
      {
        kind: 'group',
        groupId: 'g1',
        groupName: 'Flat',
        shares: { 'm-maria': 7.5, 'm-me': 2.5 },
      },
      { groups: [flat], me }
    );
    if (!('draft' in result) || result.draft.kind !== 'groupExpense') {
      throw new Error(JSON.stringify(result));
    }

    expect(result.draft.request.shares).toEqual([
      { memberId: 'm-me', amount: 2.5 },
      { memberId: 'm-maria', amount: 7.5 },
    ]);
  });

  it('leaves out whoever joined after the amounts were set', () => {
    const grown: Group = {
      ...flat,
      members: [
        ...flat.members,
        { id: 'm-eleni', name: 'eleni', userId: 'u-eleni', joined: new Date() },
      ],
    };

    const result = draftForExpense(
      lidl,
      {
        kind: 'group',
        groupId: 'g1',
        groupName: 'Flat',
        shares: { 'm-me': 4, 'm-maria': 6 },
      },
      { groups: [grown], me }
    );
    if (!('draft' in result) || result.draft.kind !== 'groupExpense') {
      throw new Error(JSON.stringify(result));
    }

    expect(result.draft.request.shares).toEqual([
      { memberId: 'm-me', amount: 4 },
      { memberId: 'm-maria', amount: 6 },
    ]);
  });

  it('refuses set amounts that no longer add up to the expense', () => {
    expect(
      draftForExpense(
        { ...lidl, amount: 12 },
        {
          kind: 'quickSplit',
          people: [{ userId: 'u-maria', username: 'maria' }],
          withMe: true,
          shares: { 'u-me': 3, 'u-maria': 7 },
        },
        { groups: null, me }
      )
    ).toEqual({
      error: "The split doesn't add up to the amount. Open it to fix it.",
    });
  });

  it('files set amounts in a quick split', () => {
    const result = draftForExpense(
      lidl,
      {
        kind: 'quickSplit',
        people: [{ userId: 'u-maria', username: 'maria' }],
        withMe: true,
        shares: { 'u-me': 3, 'u-maria': 7 },
      },
      { groups: null, me }
    );
    if (!('draft' in result) || result.draft.kind !== 'nonGroupExpense') {
      throw new Error(JSON.stringify(result));
    }

    expect(result.draft.request.shares).toEqual([
      { userId: 'u-me', amount: 3 },
      { userId: 'u-maria', amount: 7 },
    ]);
  });
});
