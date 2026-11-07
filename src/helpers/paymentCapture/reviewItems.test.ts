import { describe, expect, it } from 'vitest';
import { CapturedPayment, GOOGLE_WALLET } from './paymentCapture';
import {
  buildReviewItems,
  GroupOption,
  KnownExpense,
  MerchantChoice,
  Person,
} from './reviewItems';

const FLAT: GroupOption = {
  id: 'g1',
  name: 'Flat',
  memberIds: ['m-me', 'm-maria', 'g-nikos'],
};
const MARIA: Person = { userId: 'u-maria', username: 'maria' };
const NIKOS: Person = { userId: 'u-nikos', username: 'nikos' };

const MINUTE = 60 * 1000;
const NOON = Date.parse('2026-11-07T12:00:00Z');

let next = 0;

const capture = (overrides: Partial<CapturedPayment>): CapturedPayment => ({
  id: `00000000-0000-5000-8000-${String(++next).padStart(12, '0')}`,
  packageName: 'com.revolut.revolut',
  appName: 'Revolut',
  title: '',
  text: 'You paid €4.50 at Pret',
  postedAt: NOON,
  ...overrides,
});

const build = (
  captures: CapturedPayment[],
  {
    known = [] as KnownExpense[],
    remembered = {} as Record<string, MerchantChoice>,
    groups = [] as GroupOption[] | null,
    people = [] as Person[] | null,
  } = {}
) =>
  buildReviewItems(captures, {
    homeCurrency: 'EUR',
    known,
    groups,
    people,
    recall: (merchant) => remembered[merchant],
  });

describe('buildReviewItems', () => {
  it('offers a payment ticked, dated when it was posted', () => {
    const payment = capture({});
    const { items, dropped } = build([payment]);

    expect(dropped).toEqual([]);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: payment.id,
      amount: '4.50',
      currency: 'EUR',
      description: 'Pret',
      occurred: '2026-11-07T12:00:00.000Z',
      selected: true,
      alreadyIn: null,
      problem: null,
    });
  });

  it('makes one payment of the bank and wallet notifications, named as the wallet names it', () => {
    const bank = capture({ text: 'Card payment €4.50 at PRET A MANGER LDN' });
    const wallet = capture({
      packageName: GOOGLE_WALLET,
      appName: 'Google Wallet',
      title: 'Pret A Manger',
      text: '€4.50 with Visa •••• 1234',
      postedAt: NOON + 4 * MINUTE,
    });

    const { items } = build([wallet, bank]);

    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      id: bank.id,
      captureIds: [bank.id, wallet.id],
      appNames: ['Revolut', 'Google Wallet'],
      description: 'Pret A Manger',
    });
  });

  it('keeps two payments from the same app apart, however alike', () => {
    const { items } = build([
      capture({}),
      capture({ postedAt: NOON + 5 * MINUTE }),
    ]);
    expect(items).toHaveLength(2);
  });

  it('keeps apart two apps telling of different amounts', () => {
    const { items } = build([
      capture({}),
      capture({ packageName: GOOGLE_WALLET, text: '€5.50 at Pret' }),
    ]);
    expect(items).toHaveLength(2);
  });

  it('keeps apart the same amount from two apps far apart in time', () => {
    const { items } = build([
      capture({}),
      capture({ packageName: GOOGLE_WALLET, postedAt: NOON + 2 * 60 * MINUTE }),
    ]);
    expect(items).toHaveLength(2);
  });

  it('ties a card in another currency to the wallet by the merchant, keeping the wallet’s amount', () => {
    const wallet = capture({
      packageName: GOOGLE_WALLET,
      appName: 'Google Wallet',
      title: 'CORNER SHOP EE',
      text: '€10.60 with Example Credit Card ••1234',
    });
    const card = capture({
      packageName: 'uk.example.bank',
      appName: 'Example Bank',
      text: 'Card payment of £9.27 at CORNER SHOP',
      postedAt: NOON + 2 * MINUTE,
    });

    const { items } = build([card, wallet]);

    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({
      amount: '10.60',
      currency: 'EUR',
      description: 'Corner Shop',
      captureIds: [wallet.id, card.id],
    });
  });

  it('keeps apart payments in two currencies at different merchants', () => {
    const { items } = build([
      capture({
        packageName: GOOGLE_WALLET,
        title: 'Corner Shop',
        text: '€10.60',
      }),
      capture({
        packageName: 'uk.example.bank',
        text: 'Card payment of £9.27 at Bakery Lane',
        postedAt: NOON + MINUTE,
      }),
    ]);

    expect(items).toHaveLength(2);
  });

  it('unticks a payment that looks already in Buqs, and says which expense', () => {
    const typedAtTheTill: KnownExpense = {
      id: 'other',
      amount: 4.5,
      currency: 'EUR',
      occurred: '2026-11-07T11:58:00Z',
      description: 'Coffee',
    };

    const { items } = build([capture({})], { known: [typedAtTheTill] });

    expect(items[0].selected).toBe(false);
    expect(items[0].alreadyIn).toEqual(typedAtTheTill);
  });

  it('does not take a different amount or a distant day for the same payment', () => {
    const { items } = build([capture({})], {
      known: [
        {
          id: 'a',
          amount: 4.6,
          currency: 'EUR',
          occurred: '2026-11-07T12:00:00Z',
          description: '',
        },
        {
          id: 'b',
          amount: 4.5,
          currency: 'GBP',
          occurred: '2026-11-07T12:00:00Z',
          description: '',
        },
        {
          id: 'c',
          amount: 4.5,
          currency: 'EUR',
          occurred: '2026-11-03T12:00:00Z',
          description: '',
        },
      ],
    });

    expect(items[0].alreadyIn).toBeNull();
    expect(items[0].selected).toBe(true);
  });

  it('drops a payment already filed under its id, the other app’s notification with it', () => {
    const bank = capture({});
    const wallet = capture({
      packageName: GOOGLE_WALLET,
      postedAt: NOON + MINUTE,
    });

    const { items, dropped } = build([bank, wallet], {
      known: [
        {
          id: bank.id,
          amount: 4.5,
          currency: 'EUR',
          occurred: '',
          description: '',
        },
      ],
    });

    expect(items).toEqual([]);
    expect(dropped.sort()).toEqual([bank.id, wallet.id].sort());
  });

  it('never offers a prompt, and lets the phone forget it', () => {
    const code = capture({ text: 'Your code is 123456 for €12.50 at Amazon' });
    const { items, dropped } = build([code]);

    expect(items).toEqual([]);
    expect(dropped).toEqual([code.id]);
  });

  it('offers what is not spending unticked', () => {
    const { items } = build([
      capture({ text: 'Refund of €20.00 from Amazon' }),
    ]);
    expect(items[0]).toMatchObject({ kind: 'refund', selected: false });
  });

  it('asks for the amount when there was none to read', () => {
    const { items } = build([capture({ text: '€ at Pret' })]);

    // The listener only keeps notifications with an amount, so this is a misread, not an empty one.
    expect(items[0]).toMatchObject({
      amount: '',
      problem: 'amount',
      selected: false,
    });
  });

  it('uses what the person called a merchant before, and leaves out one they skip', () => {
    const { items } = build(
      [capture({}), capture({ text: 'You paid €9.99 at Netflix' })],
      {
        remembered: {
          Pret: { description: 'Coffee' },
          Netflix: { skip: true },
        },
      }
    );

    expect(items[0]).toMatchObject({ description: 'Coffee', selected: true });
    expect(items[1]).toMatchObject({
      description: 'Netflix',
      selected: false,
      suggested: false,
    });
  });

  it('remembers which rows Buqs ticked itself', () => {
    const { items } = build([
      capture({}),
      capture({ text: 'Refund of €20.00 from Amazon' }),
    ]);

    expect(items.map((x) => x.suggested)).toEqual([true, false]);
  });

  it('files a payment as personal and unlabelled by default', () => {
    expect(build([capture({})]).items[0]).toMatchObject({
      destination: { kind: 'personal' },
      labels: [],
    });
  });

  it('files a merchant in the group and with the labels chosen last time, under its current name', () => {
    const { items } = build([capture({})], {
      remembered: {
        Pret: {
          destination: { kind: 'group', groupId: 'g1', groupName: 'Old name' },
          labels: [{ text: 'coffee', color: 'brown' }],
        },
      },
      groups: [FLAT],
    });

    expect(items[0]).toMatchObject({
      destination: { kind: 'group', groupId: 'g1', groupName: 'Flat' },
      labels: [{ id: 'coffee', text: 'coffee', color: 'brown' }],
    });
  });

  it('keeps who shared it last time, without anyone who has left the group since', () => {
    const { items } = build([capture({})], {
      remembered: {
        Pret: {
          destination: {
            kind: 'group',
            groupId: 'g1',
            groupName: 'Flat',
            memberIds: ['m-me', 'm-left'],
          },
        },
      },
      groups: [FLAT],
    });

    expect(items[0].destination).toEqual({
      kind: 'group',
      groupId: 'g1',
      groupName: 'Flat',
      memberIds: ['m-me'],
    });
  });

  it('shares it with everyone when nobody chosen last time is still in the group', () => {
    const { items } = build([capture({})], {
      remembered: {
        Pret: {
          destination: {
            kind: 'group',
            groupId: 'g1',
            groupName: 'Flat',
            memberIds: ['m-left'],
          },
        },
      },
      groups: [FLAT],
    });

    expect(items[0].destination).toEqual({
      kind: 'group',
      groupId: 'g1',
      groupName: 'Flat',
      memberIds: undefined,
    });
  });

  it('quick-splits a merchant with the people chosen last time, under their current names', () => {
    const { items } = build([capture({})], {
      remembered: {
        Pret: {
          destination: {
            kind: 'quickSplit',
            people: [{ userId: 'u-maria', username: 'old name' }, NIKOS],
            withMe: true,
          },
        },
      },
      people: [MARIA],
    });

    expect(items[0].destination).toEqual({
      kind: 'quickSplit',
      people: [MARIA],
      withMe: true,
    });
  });

  it('falls back to personal when nobody from a quick split is still connected', () => {
    const { items } = build([capture({})], {
      remembered: {
        Pret: {
          destination: { kind: 'quickSplit', people: [NIKOS], withMe: true },
        },
      },
      people: [MARIA],
    });

    expect(items[0].destination).toEqual({ kind: 'personal' });
  });

  it('trusts a remembered quick split while the connections cannot be loaded', () => {
    const remembered: MerchantChoice = {
      destination: { kind: 'quickSplit', people: [NIKOS], withMe: false },
    };

    const { items } = build([capture({})], {
      remembered: { Pret: remembered },
      people: null,
    });

    expect(items[0].destination).toEqual(remembered.destination);
  });

  it('falls back to personal for a group the person is no longer in', () => {
    const { items } = build([capture({})], {
      remembered: {
        Pret: {
          destination: { kind: 'group', groupId: 'gone', groupName: 'Trip' },
        },
      },
      groups: [FLAT],
    });

    expect(items[0].destination).toEqual({ kind: 'personal' });
  });

  it('trusts the remembered group while the groups cannot be loaded', () => {
    const remembered: MerchantChoice = {
      destination: { kind: 'group', groupId: 'g1', groupName: 'Flat' },
    };

    const { items } = build([capture({})], {
      remembered: { Pret: remembered },
      groups: null,
    });

    expect(items[0].destination).toEqual(remembered.destination);
  });

  it('quotes the notification without a title that is only the app name', () => {
    const { items } = build([
      capture({ title: 'Revolut', text: 'You paid €4.50 at Pret' }),
      capture({
        title: 'Pret A Manger',
        text: 'Paid €3.00 with Apple Pay',
        postedAt: NOON + 60 * MINUTE,
      }),
    ]);

    expect(items.map((x) => x.source)).toEqual([
      'You paid €4.50 at Pret',
      'Pret A Manger · Paid €3.00 with Apple Pay',
    ]);
  });

  it('lists payments oldest first', () => {
    const later = capture({
      postedAt: NOON + 30 * MINUTE,
      text: 'You paid €2.00 at Lidl',
    });
    const earlier = capture({ postedAt: NOON });

    expect(build([later, earlier]).items.map((x) => x.id)).toEqual([
      earlier.id,
      later.id,
    ]);
  });
});
