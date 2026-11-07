import { describe, expect, it } from 'vitest';
import { cleanMerchant, parseAmount, parsePayment } from './parsePayment';

const NO_BREAK_SPACE = String.fromCharCode(0xa0);

const parse = (
  text: string,
  { title = '', appName = 'Revolut', home = 'EUR' } = {}
) => parsePayment({ appName, title, text }, home);

describe('parseAmount', () => {
  it.each([
    ['12.50', 12.5],
    ['12,50', 12.5],
    ['12,5', 12.5],
    ['1,234.56', 1234.56],
    ['1.234,56', 1234.56],
    ['1 234,56', 1234.56],
    [`1${NO_BREAK_SPACE}234,56`, 1234.56],
    ["1'234.50", 1234.5],
    ['1,500', 1500],
    ['1.234.567', 1234567],
    ['0.99', 0.99],
    ['12.', 12],
  ])('reads %s as %d', (raw, expected) => {
    expect(parseAmount(raw)).toBe(expected);
  });

  it.each(['', '0', 'abc', '-5', '12a'])('turns away %j', (raw) => {
    expect(parseAmount(raw)).toBeNull();
  });
});

describe('parsePayment', () => {
  it('takes the merchant from the title when the text only has the amount', () => {
    expect(
      parse('Paid £4.50 with Apple Pay', {
        title: 'Pret A Manger',
        home: 'GBP',
      })
    ).toEqual({
      amount: 4.5,
      currency: 'GBP',
      merchant: 'Pret A Manger',
      kind: 'spend',
    });
  });

  it('reads "at" a merchant', () => {
    expect(parse('You paid €12.40 at Lidl', { title: 'Revolut' })).toEqual({
      amount: 12.4,
      currency: 'EUR',
      merchant: 'Lidl',
      kind: 'spend',
    });
  });

  it('reads a Greek purchase with a comma decimal and a trailing euro sign', () => {
    expect(
      parse('Αγορά 12,50 € στο ΣΚΛΑΒΕΝΙΤΗΣ με κάρτα *1234', {
        title: 'Αγορά με κάρτα',
        appName: 'Piraeus Bank',
      })
    ).toEqual({
      amount: 12.5,
      currency: 'EUR',
      merchant: 'Σκλαβενιτης',
      kind: 'spend',
    });
  });

  it('reads grouped thousands either way round', () => {
    expect(parse('Card payment of 1.234,56 € at MEDIA MARKT').amount).toBe(
      1234.56
    );
    expect(parse('Card payment of €1,234.56 at MEDIA MARKT').amount).toBe(
      1234.56
    );
    expect(parse('Πληρωμή 1 234,56 € στο Public').amount).toBe(1234.56);
  });

  it('reads no-break spaces between thousands and before the symbol', () => {
    expect(
      parse(
        `Card payment of 1${NO_BREAK_SPACE}234,56${NO_BREAK_SPACE}€ at IKEA`
      ).amount
    ).toBe(1234.56);
  });

  it('does not join the amount in the title to digits starting the text', () => {
    expect(parse('345 Main Street', { title: 'Paid €12' }).amount).toBe(12);
  });

  it('prefers the amount paid over the balance left', () => {
    const parsed = parse('Balance €1,234.00 · You spent €4.50 at Pret');
    expect(parsed.amount).toBe(4.5);
    expect(parsed.merchant).toBe('Pret');
  });

  it('ignores the balance mentioned after the payment', () => {
    expect(
      parse('You paid €9.99 at Netflix. Available balance: €310.20').amount
    ).toBe(9.99);
  });

  it('cuts the merchant at the card and the date', () => {
    expect(
      parse('€23.10 at Shell Kifisias with card •••• 4321 on 3 May').merchant
    ).toBe('Shell Kifisias');
  });

  it('strips card processor prefixes and shouting', () => {
    expect(parse('Paid €3.20 at SQ *COFFEE CORNER LONDON GB').merchant).toBe(
      'Coffee Corner London'
    );
  });

  it('takes the merchant from a wallet-style title', () => {
    expect(
      parse('€5.45 with Mastercard •••• 4321', {
        title: 'Starbucks',
        appName: 'Google Wallet',
      })
    ).toEqual({
      amount: 5.45,
      currency: 'EUR',
      merchant: 'Starbucks',
      kind: 'spend',
    });
  });

  // The shape of a real Google Wallet purchase notification, seen on a Pixel in November 2026: the
  // card network's name for the merchant as the title, the amount and the card as the text.
  it('reads a Google Wallet purchase', () => {
    expect(
      parse('€10.60 with Example Bank Member Credit Card ••1234', {
        title: 'CORNER SHOP EE',
        appName: 'Google Wallet',
      })
    ).toEqual({
      amount: 10.6,
      currency: 'EUR',
      merchant: 'Corner Shop',
      kind: 'spend',
    });
  });

  it('drops emoji and reads a minus sign as spending', () => {
    expect(parse('-€8.90', { title: "🍔 McDonald's" })).toEqual({
      amount: 8.9,
      currency: 'EUR',
      merchant: "McDonald's",
      kind: 'spend',
    });
  });

  it('takes the merchant written before the amount', () => {
    expect(parse('Tesco €12.30', { title: 'Revolut' }).merchant).toBe('Tesco');
  });

  it('settles a dollar sign by the home currency', () => {
    expect(parse('$5.00 at Tim Hortons', { home: 'CAD' }).currency).toBe('CAD');
    expect(parse('$5.00 at Tim Hortons', { home: 'EUR' }).currency).toBe('USD');
    expect(parse('US$5.00 at Tim Hortons', { home: 'CAD' }).currency).toBe(
      'USD'
    );
  });

  it('reads currency codes before and after the number', () => {
    expect(parse('EUR 12.50 at Cafe Nero')).toMatchObject({
      amount: 12.5,
      currency: 'EUR',
    });
    expect(parse('12.50 GBP at Cafe Nero')).toMatchObject({
      amount: 12.5,
      currency: 'GBP',
    });
  });

  it('does not mistake capitals for a currency', () => {
    expect(parse('Your PIN 1234 was changed').amount).toBeNull();
    expect(parse('ATM 2000 nearby').amount).toBeNull();
  });

  it('reads yen without decimals', () => {
    expect(parse('¥1,200 at Lawson', { home: 'JPY' })).toMatchObject({
      amount: 1200,
      currency: 'JPY',
    });
  });

  it('cuts the merchant before the outcome', () => {
    const parsed = parse('Payment of €30.00 at Shell declined');
    expect(parsed.merchant).toBe('Shell');
    expect(parsed.kind).toBe('declined');
  });

  it('knows a refund', () => {
    expect(parse('Refund of €20.00 from Amazon')).toMatchObject({
      kind: 'refund',
      merchant: 'Amazon',
    });
    expect(parse('Επιστροφή χρημάτων 15,00 € από ΖΑΡΑ').kind).toBe('refund');
  });

  it('knows money coming in', () => {
    expect(parse('+€50.00 from Maria').kind).toBe('incoming');
    expect(parse('Maria sent you €20').kind).toBe('incoming');
    expect(parse('Πίστωση 100,00 € στον λογαριασμό σας').kind).toBe('incoming');
  });

  it('counts a purchase with cashback as spending', () => {
    expect(parse('You spent €10.00 at Lidl and got €0.10 cashback').kind).toBe(
      'spend'
    );
  });

  it('never offers a code or an approval request', () => {
    expect(parse('Your code is 123456 for €12.50 at Amazon').kind).toBe(
      'prompt'
    );
    expect(
      parse('Confirm your purchase of €12.50 at Amazon in the app').kind
    ).toBe('prompt');
    expect(parse('Επιβεβαιώστε την αγορά 12,50 € στο Amazon').kind).toBe(
      'prompt'
    );
  });

  it('still offers a payment that says it was confirmed', () => {
    expect(parse('Payment of €12.50 at Amazon confirmed').kind).toBe('spend');
  });

  it('knows an offer, and finds no merchant in its wording', () => {
    expect(parse('Earn up to €50 when you invite friends')).toMatchObject({
      kind: 'promo',
      merchant: '',
    });
    expect(parse('Spend €50 abroad and earn €5 back').kind).toBe('promo');
  });

  it('reads paying one of the person own accounts as a transfer', () => {
    expect(
      parse('Payment €100.00 to Revolut', { appName: 'Piraeus Bank' }).kind
    ).toBe('transfer');
    expect(parse('You paid €4.50 at Pret', { appName: 'Revolut' }).kind).toBe(
      'spend'
    );
  });

  it('knows when there is no amount', () => {
    expect(parse('Your statement is ready', { title: 'Revolut' })).toEqual({
      amount: null,
      currency: null,
      merchant: '',
      kind: 'spend',
    });
  });
});

describe('cleanMerchant', () => {
  it.each([
    ['PAYPAL *NETFLIX', 'Netflix'],
    ['CRV*PRET A MANGER', 'Pret A Manger'],
    ['Pret A Manger •••• 1234', 'Pret A Manger'],
    ['  Lidl.  ', 'Lidl'],
    ['🛒', ''],
    ['McDonald’s', 'McDonald’s'],
  ])('tidies %j to %j', (raw, expected) => {
    expect(cleanMerchant(raw)).toBe(expected);
  });
});
