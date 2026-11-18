import { describe, expect, it } from 'vitest';
import { PlusMembership } from '@/types';
import {
  annualPricePerMonth,
  annualSavingPercent,
  daysLeftText,
  isAnnualRenewalDue,
  membershipStatusText,
  renewalPriceText,
  trialDaysLeft,
} from './plusPlans';

const member = (overrides: Partial<PlusMembership> = {}): PlusMembership => ({
  plan: 'annual',
  expiresAt: '2027-12-12T10:00:00Z',
  autoRenewing: true,
  inGracePeriod: false,
  renewalPrice: 19.99,
  renewalCurrencyCode: 'GBP',
  ...overrides,
});

describe('annualSavingPercent', () => {
  it('rounds down, so the label never promises more than the prices give', () => {
    // 19.99 against 35.88 is 44.29% off.
    expect(annualSavingPercent(19.99, 2.99)).toBe(44);
    // 29.99 against 35.88 is 16.4% off.
    expect(annualSavingPercent(29.99, 2.99)).toBe(16);
  });

  it('says nothing when the annual plan saves little or nothing', () => {
    expect(annualSavingPercent(35.88, 2.99)).toBeNull();
    expect(annualSavingPercent(34.99, 2.99)).toBeNull();
    expect(annualSavingPercent(40, 2.99)).toBeNull();
  });

  it('says nothing for prices it cannot compare', () => {
    expect(annualSavingPercent(0, 2.99)).toBeNull();
    expect(annualSavingPercent(19.99, 0)).toBeNull();
    expect(annualSavingPercent(Number.NaN, 2.99)).toBeNull();
  });
});

describe('annualPricePerMonth', () => {
  it('spreads the year over twelve months in the plan currency', () => {
    expect(annualPricePerMonth(19.99, 'GBP', 'en-GB')).toBe('£1.67');
    expect(annualPricePerMonth(19.99, 'USD', 'en-US')).toBe('$1.67');
  });

  it('follows the currency for decimals', () => {
    expect(annualPricePerMonth(2950, 'JPY', 'en-GB')).toBe('JP¥246');
  });

  it('gives up on a currency code Intl does not know', () => {
    expect(annualPricePerMonth(19.99, 'not a code', 'en-GB')).toBeNull();
  });
});

describe('renewalPriceText', () => {
  it('names the price and the period', () => {
    expect(renewalPriceText(member(), 'en-GB')).toBe('£19.99 a year');
    expect(
      renewalPriceText(member({ plan: 'monthly', renewalPrice: 2.99 }), 'en-GB')
    ).toBe('£2.99 a month');
  });

  it('is absent when Play did not report a price', () => {
    expect(renewalPriceText(member({ renewalPrice: null }), 'en-GB')).toBeNull();
    expect(
      renewalPriceText(member({ renewalCurrencyCode: null }), 'en-GB')
    ).toBeNull();
  });
});

describe('isAnnualRenewalDue', () => {
  const now = new Date('2027-12-01T10:00:00Z');

  it('is true for an annual plan renewing within thirty days', () => {
    expect(isAnnualRenewalDue(member(), now)).toBe(true);
    expect(
      isAnnualRenewalDue(member({ expiresAt: '2027-12-31T09:00:00Z' }), now)
    ).toBe(true);
  });

  it('is false further out, and once the date has passed', () => {
    expect(
      isAnnualRenewalDue(member({ expiresAt: '2028-01-05T10:00:00Z' }), now)
    ).toBe(false);
    expect(
      isAnnualRenewalDue(member({ expiresAt: '2027-11-30T10:00:00Z' }), now)
    ).toBe(false);
  });

  it('is false for a monthly plan and for one that will not renew', () => {
    expect(isAnnualRenewalDue(member({ plan: 'monthly' }), now)).toBe(false);
    expect(isAnnualRenewalDue(member({ autoRenewing: false }), now)).toBe(false);
  });
});

describe('membershipStatusText', () => {
  it('says when a renewing plan renews and for how much', () => {
    expect(membershipStatusText(member(), 'en-GB')).toBe(
      'Renews on 12 December 2027 for £19.99, unless you cancel before then.'
    );
  });

  it('leaves the amount out when Play did not report one', () => {
    expect(membershipStatusText(member({ renewalPrice: null }), 'en-GB')).toBe(
      'Renews on 12 December 2027, unless you cancel before then.'
    );
  });

  it('says a cancelled plan runs to the end of what was paid for', () => {
    expect(
      membershipStatusText(member({ autoRenewing: false }), 'en-GB')
    ).toBe('Renewal is off. Plus stays yours until 12 December 2027.');
  });

  it('puts a failing payment ahead of everything else', () => {
    expect(
      membershipStatusText(member({ inGracePeriod: true }), 'en-GB')
    ).toContain('could not take your payment');
  });
});

describe('trialDaysLeft', () => {
  const now = new Date('2026-12-01T10:00:00Z');

  it('counts whole days, and a part of a day as one', () => {
    expect(trialDaysLeft('2026-12-13T10:00:00Z', now)).toBe(12);
    expect(trialDaysLeft('2026-12-13T09:00:00Z', now)).toBe(12);
    expect(trialDaysLeft('2026-12-01T22:00:00Z', now)).toBe(1);
  });

  it('is zero once the free days are over', () => {
    expect(trialDaysLeft('2026-12-01T10:00:00Z', now)).toBe(0);
    expect(trialDaysLeft('2026-11-20T10:00:00Z', now)).toBe(0);
  });

  it('reads naturally for one day and for several', () => {
    expect(daysLeftText(1)).toBe('1 day left');
    expect(daysLeftText(12)).toBe('12 days left');
  });
});
