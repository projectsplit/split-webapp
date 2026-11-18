import { PlusMembership, PlusPlan } from '@/types';

/**
 * The small sums and sentences of the Plus sheet, kept out of the components so they can be tested
 * on their own. Nothing here decides who is a member or what anything costs: the prices are Google
 * Play's and the dates are the server's reading of Play.
 */

/** A saving smaller than this is not worth a label on the plan. */
const MIN_SAVING_WORTH_SAYING = 5;

/** How close an annual renewal has to be before the sheet stops mentioning it in passing. */
export const RENEWAL_NOTICE_DAYS = 30;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Whole percent the annual plan saves against twelve months of the monthly one, rounded down so the
 * label never claims more than the prices deliver. Null when there is nothing worth saying.
 */
export const annualSavingPercent = (
  annualPrice: number,
  monthlyPrice: number
): number | null => {
  if (!(annualPrice > 0) || !(monthlyPrice > 0)) return null;

  const saving = Math.floor((1 - annualPrice / (monthlyPrice * 12)) * 100);

  return saving >= MIN_SAVING_WORTH_SAYING ? saving : null;
};

/**
 * Whole days left of the free days, counting a part of a day as one so the last evening still reads
 * "1 day left" rather than none. Zero once they are over.
 */
export const trialDaysLeft = (
  trialEndsAt: string,
  now: Date = new Date()
): number =>
  Math.max(
    0,
    Math.ceil((new Date(trialEndsAt).getTime() - now.getTime()) / DAY_MS)
  );

export const daysLeftText = (days: number): string =>
  days === 1 ? '1 day left' : `${days} days left`;

/** An amount in a currency as the reader's locale writes it, or null for a code Intl does not know. */
export const formatPrice = (
  amount: number,
  currencyCode: string,
  locale?: string
): string | null => {
  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  } catch {
    return null;
  }
};

/** The annual price spread over twelve months: what a year of Plus comes to per month. */
export const annualPricePerMonth = (
  annualPrice: number,
  currencyCode: string,
  locale?: string
): string | null => formatPrice(annualPrice / 12, currencyCode, locale);

/** "12 December 2027", in the reader's own locale. */
export const formatPlusDate = (isoDate: string, locale?: string): string =>
  new Date(isoDate).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

export const planName = (plan: PlusPlan): string =>
  plan === 'annual' ? 'Annual plan' : 'Monthly plan';

/** "a year" / "a month", for after a price. */
export const planPeriod = (plan: PlusPlan): string =>
  plan === 'annual' ? 'a year' : 'a month';

/** What the next renewal costs, written out: "£19.99 a year". Null when Play did not say. */
export const renewalPriceText = (
  membership: PlusMembership,
  locale?: string
): string | null => {
  if (membership.renewalPrice === null || !membership.renewalCurrencyCode) {
    return null;
  }

  const price = formatPrice(
    membership.renewalPrice,
    membership.renewalCurrencyCode,
    locale
  );

  return price ? `${price} ${planPeriod(membership.plan)}` : null;
};

/**
 * Whether an annual plan is about to renew. A year's charge is the one worth a notice of its own:
 * it is the larger sum, and long enough after the last one to have been forgotten. Monthly plans
 * renew too often for a reminder to be anything but noise.
 */
export const isAnnualRenewalDue = (
  membership: PlusMembership,
  now: Date = new Date()
): boolean => {
  if (membership.plan !== 'annual' || !membership.autoRenewing) return false;

  const remaining = new Date(membership.expiresAt).getTime() - now.getTime();

  return remaining > 0 && remaining <= RENEWAL_NOTICE_DAYS * DAY_MS;
};

/** The one sentence under a member's plan that says what happens next, and when. */
export const membershipStatusText = (
  membership: PlusMembership,
  locale?: string
): string => {
  const date = formatPlusDate(membership.expiresAt, locale);

  if (membership.inGracePeriod) {
    return 'Google Play could not take your payment and is trying again. Check your payment method in Google Play to keep Plus.';
  }

  if (!membership.autoRenewing) {
    return `Renewal is off. Plus stays yours until ${date}.`;
  }

  // The bare amount, without "a year": the sentence already says when.
  const amount =
    membership.renewalPrice !== null && membership.renewalCurrencyCode
      ? formatPrice(
          membership.renewalPrice,
          membership.renewalCurrencyCode,
          locale
        )
      : null;

  return amount
    ? `Renews on ${date} for ${amount}, unless you cancel before then.`
    : `Renews on ${date}, unless you cancel before then.`;
};
