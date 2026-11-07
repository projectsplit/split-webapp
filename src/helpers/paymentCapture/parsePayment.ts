import { currencyData } from '../openExchangeRates';

/**
 * What a payment notification turned out to be. Only spending becomes an expense by default; the
 * rest are offered unticked, since Buqs has no income and a refund or a declined payment is not
 * money spent. A prompt (a one-time code, a request to approve a purchase) is never offered: the
 * purchase it is about is notified again once it goes through.
 */
export type PaymentKind =
  | 'spend'
  | 'refund'
  | 'incoming'
  | 'declined'
  | 'transfer'
  | 'promo'
  | 'prompt';

export type ParsedPayment = {
  /** Null when no amount in the text could be read. */
  amount: number | null;
  /** Null when there was no amount, or its currency is not one Buqs has. */
  currency: string | null;
  /** Who was paid, tidied for use as a description. Empty when the text did not say. */
  merchant: string;
  kind: PaymentKind;
};

type NotificationText = { appName: string; title: string; text: string };

const KNOWN_CURRENCIES = new Set(
  currencyData.map((currency) => currency.symbol)
);

/** Symbols that stand for one currency wherever they appear. */
const SYMBOL_CURRENCIES: Record<string, string> = {
  '€': 'EUR',
  '£': 'GBP',
  '¥': 'JPY',
  '₹': 'INR',
  '₺': 'TRY',
  '₽': 'RUB',
  '₩': 'KRW',
  '₪': 'ILS',
  '₫': 'VND',
  '฿': 'THB',
  '₱': 'PHP',
  '₦': 'NGN',
  '₴': 'UAH',
  zł: 'PLN',
  Kč: 'CZK',
  lei: 'RON',
  Ft: 'HUF',
  лв: 'BGN',
  'лв.': 'BGN',
  'Fr.': 'CHF',
  US$: 'USD',
  A$: 'AUD',
  AU$: 'AUD',
  C$: 'CAD',
  CA$: 'CAD',
  NZ$: 'NZD',
  S$: 'SGD',
  HK$: 'HKD',
  R$: 'BRL',
  MX$: 'MXN',
};

/**
 * Symbols several currencies share. The person's own currency is the likely one when it is among
 * them; otherwise the first is.
 */
const SHARED_SYMBOLS: Record<string, string[]> = {
  $: ['USD', 'CAD', 'AUD', 'NZD', 'SGD', 'HKD', 'MXN'],
  kr: ['SEK', 'NOK', 'DKK', 'ISK'],
  'kr.': ['DKK', 'SEK', 'NOK', 'ISK'],
};

const escapeRegExp = (value: string) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const SYMBOLS = [
  ...Object.keys(SYMBOL_CURRENCIES),
  ...Object.keys(SHARED_SYMBOLS),
]
  .sort((a, b) => b.length - a.length)
  .map(escapeRegExp)
  .join('|');

// Never part of a longer word: the "kr" in "Ukraine" is no currency. Three capitals are checked
// against the currencies Buqs knows afterwards, which is what turns away a PIN or an ATM.
const CURRENCY = `(?<!\\p{L})(?:${SYMBOLS}|[A-Z]{3})(?!\\p{L})`;

// What groups thousands: a comma, a point, an apostrophe or a space, the no-break kinds included.
// Not \s, which would let a line break join the title's amount to digits starting the text.
const GROUP = "[.,' \\u00a0\\u202f]";

// Grouped thousands with optional decimals (1,234.56 or 1.234,56 or 1 234,56), or plain digits.
const NUMBER = `\\d{1,3}(?:${GROUP}\\d{3})+(?:[.,]\\d{1,2})?(?!\\d)|\\d+(?:[.,]\\d{1,2})?(?!\\d)`;

// JavaScript's \s already takes in the no-break spaces.
const SPACE = String.raw`\s?`;

// A symbol between two numbers belongs to the second when it touches it or the second has cents:
// in "card 1234 €5.00" and "card 1234 EUR 12.50" the card digits are no amount. A date after a
// trailing symbol ("12,50 € 07/11") has no cents, so it leaves the symbol with the first.
const NOT_A_PREFIX = `(?!\\d)(?!${SPACE}[-−+]?${SPACE}\\d{1,3}(?:${GROUP}\\d{3})*[.,]\\d{2}(?!\\d))`;

const AMOUNT = new RegExp(
  `(?<signBefore>[-−+])?${SPACE}(?<before>${CURRENCY})${SPACE}(?<signAfter>[-−+])?${SPACE}(?<number>${NUMBER})` +
    `|(?<signLead>[-−+])?(?<number2>${NUMBER})${SPACE}(?<after>${CURRENCY})${NOT_A_PREFIX}`,
  'gu'
);

/** Lower case without accents, so one pattern serves "Αγορά" and "αγορα" alike. */
const normalise = (value: string) =>
  value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/ς/g, 'σ');

const SPEND_HINT =
  /paid|spent|spend|payment|purchase|charged|debited|withdrawal|αγορα|πληρωμη|χρεωση|αναληψη|zahlung|bezahlt|paiement|achat|pago|compra|pagamento|acquisto/;
const BALANCE_HINT =
  /balance|available|remaining|limit|υπολοιπο|διαθεσιμο|kontostand|guthaben|solde|saldo|disponible|disponibile/;

// Codes and requests to approve a payment, which come before the payment itself. Narrow on purpose:
// a capture read as one is deleted unseen, so "Code Coffee" or a "one-time payment" must not match.
const PROMPT =
  /\b(otp|passcode)\b|\bone.?time (password|passcode|code|pin)\b|\b(verification|security|confirmation|authori[sz]ation|auth|login|sign.?in|access) code\b|\bcode\s*(is|:)?\s*\d{4,8}\b|\b\d{4,8} is your\b|κωδικ|\b(confirm|approve|authori[sz]e) (your|this|the) (payment|purchase|transaction|order|card|login|sign.?in)\b|επιβεβαιωστε|εγκρινετε|bestatigen sie|confirmez/;
const DECLINED =
  /declin|rejected|unsuccessful|not approved|failed|insufficient|απορριφθ|απορριψ|ανεπιτυχ|δεν ολοκληρωθ|δεν εγκριθ|abgelehnt|fehlgeschlagen|refuse|rechaz|rifiutat/;
const REFUND =
  /refund|reversal|reversed|returned|chargeback|επιστροφ|αντιλογισ|erstatt|rembours|reembols|devoluc|rimbors|storno/;
const INCOMING =
  /received|you got|sent you|credited|deposited|top.?up|topped up|added to your|salary|cashback|πιστωσ|καταθεσ|εισερχ|ελαβεσ|λαβατε|erhalten|gutschrift|eingang|\brecue?s?\b|recibid|ricevut|accredit/;
const PROMO =
  /\b(offer|promo|deal|discount|earn|win|reward|invite|refer|bonus|chance)\b|% off|save up to|προσφορ|εκπτωσ|κερδισ|δωρο|angebot|rabatt|offre|oferta|offerta|sconto/;

/** Accounts people hold in their own name. Paying one from another account is moving money. */
const OWN_ACCOUNTS = /\b(revolut|wise|transferwise|monzo|starling|n26)\b/;

/** Words that introduce who was paid: "at Pret", "στο Σκλαβενίτης", "to Maria". */
const MERCHANT_LEAD =
  /(?:^|[\s(,:])(?:at|@|to|from|στο|στη|στην|στον|στα|στις|σε|bei|chez|à)\s+(?=\S)/giu;

/** Where a merchant's name stops: "with your card", "on 3 May", a full stop, a bracket. */
const MERCHANT_END =
  /\s+(?:on|with|using|via|for|by|was|has|is|declined|failed|με|μέσω|μεσω|για|mit|über|avec|par|con|per|op)\s|\s+(?:declined|failed)$|[;!|\n(•·]|[.,](?:\s|$)|\s[-–—]\s/iu;

// JavaScript's \b only knows ASCII letters, so the patterns below that must also end a Greek word
// say so with a lookahead instead.

/** Titles that say a payment happened without saying where. */
const GENERIC_TITLE =
  /^(payment|card payment|payment sent|purchase|transaction|new transaction|spending|spent|paid|money out|αγορα|πληρωμη|συναλλαγη|χρεωση|κινηση|zahlung|kartenzahlung|paiement|achat|pago|compra|pagamento|acquisto)(?![\p{L}\p{N}])/u;

/** Merchants that are really a description of the person's own account. */
const NOT_A_MERCHANT =
  /^(your|the|a|an|account|card|σασ|τον|την|το)(?![\p{L}\p{N}])/u;

/** Words leading up to an amount rather than naming anyone: "Earn up to €50", "a payment of €5". */
const ENDS_IN_LEAD =
  /(?:^|\s)(?:at|@|to|from|of|στο|στη|στην|στον|στα|στις|σε|bei|chez|à)$/iu;

const EMOJI = /[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu;

/** What card processors and marketplaces put in front of the shop's name: SQ *, PAYPAL *, CRV*. */
const PROCESSOR_PREFIX =
  /^(?:sq|sp|sumup|zettle|ztl|iz|pp|paypal|crv|curve|gpay|apple ?pay|amzn mktp \w+|amazon mktplace)\s*\*\s*/i;

type AmountMatch = {
  index: number;
  end: number;
  amount: number;
  currency: string | null;
  sign: string;
};

/**
 * Reads a number the way it was written for whichever convention: 1,234.56, 1.234,56 and 1 234,56
 * are all the same. A single separator followed by exactly three digits groups thousands (1,500);
 * followed by one or two it marks decimals (12,5). Null for anything that is not a positive amount.
 */
export const parseAmount = (raw: string): number | null => {
  const compact = raw.trim().replace(/[\s']/g, '');
  if (!/^\d[\d.,]*$/.test(compact)) return null;

  const lastDot = compact.lastIndexOf('.');
  const lastComma = compact.lastIndexOf(',');

  let decimal: string | null = null;

  if (lastDot >= 0 && lastComma >= 0) {
    decimal = lastDot > lastComma ? '.' : ',';
  } else if (lastDot >= 0 || lastComma >= 0) {
    const separator = lastDot >= 0 ? '.' : ',';
    const parts = compact.split(separator);

    if (parts.length === 2 && parts[1].length !== 3) decimal = separator;
  }

  const [whole, fraction = ''] = decimal
    ? [
        compact.slice(0, compact.lastIndexOf(decimal)),
        compact.slice(compact.lastIndexOf(decimal) + 1),
      ]
    : [compact];

  const value = Number(`${whole.replace(/[.,]/g, '')}.${fraction || '0'}`);

  return Number.isFinite(value) && value > 0 ? value : null;
};

/** The ISO code a symbol stands for; null when Buqs has no such currency; undefined when it is no currency. */
const currencyOf = (
  symbol: string,
  homeCurrency: string
): string | null | undefined => {
  const shared = SHARED_SYMBOLS[symbol];

  const code = shared
    ? shared.includes(homeCurrency)
      ? homeCurrency
      : shared[0]
    : (SYMBOL_CURRENCIES[symbol] ?? symbol);

  if (KNOWN_CURRENCIES.has(code)) return code;

  // Three capitals that are no currency code at all, such as PIN or ATM.
  return symbol === code ? undefined : null;
};

const findAmounts = (text: string, homeCurrency: string): AmountMatch[] => {
  const found: AmountMatch[] = [];

  for (const match of text.matchAll(AMOUNT)) {
    const groups = match.groups ?? {};
    const currency = currencyOf(groups.before ?? groups.after, homeCurrency);
    const amount = parseAmount(groups.number ?? groups.number2);

    if (currency === undefined || amount === null) continue;

    found.push({
      index: match.index ?? 0,
      end: (match.index ?? 0) + match[0].length,
      amount,
      currency,
      sign: groups.signBefore ?? groups.signAfter ?? groups.signLead ?? '',
    });
  }

  return found;
};

/**
 * The amount the notification is about. Banks often add the balance left, so an amount right after
 * "balance" loses to one right after "paid"; otherwise the first one wins.
 */
const mainAmount = (text: string, amounts: AmountMatch[]) => {
  let best: AmountMatch | null = null;
  let bestScore = -Infinity;

  for (const match of amounts) {
    const before = normalise(
      text.slice(Math.max(0, match.index - 30), match.index)
    );
    const score =
      (SPEND_HINT.test(before) ? 2 : 0) - (BALANCE_HINT.test(before) ? 3 : 0);

    if (score > bestScore) {
      best = match;
      bestScore = score;
    }
  }

  return best;
};

const isAllCaps = (value: string) =>
  /\p{Lu}/u.test(value) && value === value.toUpperCase();

const titleCase = (value: string) =>
  value
    .toLowerCase()
    .replace(
      /(^|[\s\-/&(])(\p{L})/gu,
      (_, separator, letter) => separator + letter.toUpperCase()
    );

/**
 * A merchant as a person would write it: SQ *COFFEE CORNER LONDON GB becomes Coffee Corner London.
 * Shouting is lowered to title case, since that is how card networks send names, not how shops spell
 * them.
 */
export const cleanMerchant = (raw: string): string => {
  let merchant = raw
    .replace(EMOJI, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(PROCESSOR_PREFIX, '')
    // Card numbers and references banks add at the end: •••• 1234, *1234, #000123.
    .replace(/\s*[•*#]*\s*\d{4,}$/, '')
    .replace(/^[\s:;,.\-–—]+|[\s:;,.\-–—]+$/g, '');

  if (isAllCaps(merchant)) {
    // A trailing country code, as in LONDON GB, says nothing about the shop.
    merchant = titleCase(merchant.replace(/\s[A-Z]{2}$/, ''));
  }

  return merchant.slice(0, 60).trim();
};

/** The text after a lead word, up to wherever the merchant's name plainly ends. */
const merchantAfter = (text: string, from: number) => {
  const rest = text.slice(from);
  const end = rest.search(MERCHANT_END);
  let merchant = end >= 0 ? rest.slice(0, end) : rest;

  // An amount written after the name is not part of it: "to Pret €4.50".
  const amount = merchant.search(new RegExp(AMOUNT.source, 'u'));
  if (amount >= 0) merchant = merchant.slice(0, amount);

  return cleanMerchant(merchant);
};

const merchantOf = (
  { appName, title }: NotificationText,
  text: string,
  main: AmountMatch | null
): string => {
  const leads = [...text.matchAll(MERCHANT_LEAD)].map(
    (match) => (match.index ?? 0) + match[0].length
  );

  // The lead after the amount describes it; "€4.50 at Pret" beats a "from" earlier on.
  const ordered = main
    ? [
        ...leads.filter((at) => at >= main.end),
        ...leads.filter((at) => at < main.end),
      ]
    : leads;

  for (const at of ordered) {
    const merchant = merchantAfter(text, at);
    if (merchant && !NOT_A_MERCHANT.test(normalise(merchant))) return merchant;
  }

  // Wallets and some banks put the merchant in the title and the amount in the text.
  const cleanTitle = cleanMerchant(title);
  if (
    cleanTitle &&
    normalise(cleanTitle) !== normalise(appName) &&
    !GENERIC_TITLE.test(normalise(cleanTitle)) &&
    !new RegExp(AMOUNT.source, 'u').test(title)
  ) {
    return cleanTitle;
  }

  // Or the merchant comes first on the line with the amount: "Tesco €12.30".
  if (main) {
    const lineStart = text.lastIndexOf('\n', main.index) + 1;
    const before = cleanMerchant(text.slice(lineStart, main.index));

    if (
      before.length > 0 &&
      before.length <= 40 &&
      !GENERIC_TITLE.test(normalise(before)) &&
      !SPEND_HINT.test(normalise(before)) &&
      !ENDS_IN_LEAD.test(before)
    ) {
      return before;
    }
  }

  return '';
};

const kindOf = (
  text: string,
  main: AmountMatch | null,
  merchant: string,
  appName: string
): PaymentKind => {
  const normalised = normalise(text);

  if (PROMPT.test(normalised)) return 'prompt';
  if (DECLINED.test(normalised)) return 'declined';
  if (REFUND.test(normalised)) return 'refund';
  // Before spending, since an offer is worded as one: "Spend €50 and earn €5".
  if (PROMO.test(normalised)) return 'promo';

  const ownAccount = normalise(merchant).match(OWN_ACCOUNTS)?.[1];
  const spendOrTransfer =
    ownAccount && !normalise(appName).includes(ownAccount)
      ? 'transfer'
      : 'spend';

  // "You spent €10 and got €0.10 cashback" is spending, whatever else it mentions.
  const spentBefore =
    main !== null &&
    SPEND_HINT.test(
      normalise(text.slice(Math.max(0, main.index - 30), main.index))
    );
  if (spentBefore) return spendOrTransfer;

  if (main?.sign === '+' || INCOMING.test(normalised)) return 'incoming';

  return spendOrTransfer;
};

/**
 * Reads a payment out of a notification's title and text. Written to the shapes banks and wallets
 * actually use across the languages Buqs is used in; anything it misreads is still put in front of
 * the person, who fixes it before anything is filed.
 */
export const parsePayment = (
  notification: NotificationText,
  homeCurrency: string
): ParsedPayment => {
  const text = [notification.title, notification.text]
    .filter(Boolean)
    .join('\n');

  const main = mainAmount(text, findAmounts(text, homeCurrency));
  const merchant = merchantOf(notification, text, main);

  return {
    amount: main?.amount ?? null,
    currency: main?.currency ?? null,
    merchant,
    kind: kindOf(text, main, merchant, notification.appName),
  };
};
