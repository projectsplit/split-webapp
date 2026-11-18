import { describe, expect, it } from 'vitest';
import { PlusMembership, PlusStatus, UserInfo } from '@/types';
import { plusStateOf } from './plusState';

const subscription: PlusMembership = {
  plan: 'annual',
  expiresAt: '2027-12-12T10:00:00Z',
  autoRenewing: true,
  inGracePeriod: false,
  renewalPrice: 19.99,
  renewalCurrencyCode: 'GBP',
};

const account = (plus?: PlusStatus) => ({ userId: 'u1', plus }) as UserInfo;

describe('plusStateOf', () => {
  it('treats an account that has not loaded as open, so nothing flashes locked', () => {
    const state = plusStateOf(undefined);

    expect(state.access).toBe('open');
    expect(state.hasPlus).toBe(true);
    expect(state.isLocked).toBe(false);
    expect(state.isMember).toBe(false);
  });

  it('treats a server that says nothing about Plus as open', () => {
    expect(plusStateOf(account()).access).toBe('open');
    expect(plusStateOf(account()).isLocked).toBe(false);
  });

  it('locks only an account whose free days are over', () => {
    const state = plusStateOf(
      account({
        access: 'none',
        trialEndsAt: '2026-12-01T00:00:00Z',
        subscription: null,
      })
    );

    expect(state.isLocked).toBe(true);
    expect(state.hasPlus).toBe(false);
    expect(state.isMember).toBe(false);
  });

  it('gives someone in their free days Plus without making them a member', () => {
    const state = plusStateOf(
      account({
        access: 'trial',
        trialEndsAt: '2026-12-18T00:00:00Z',
        subscription: null,
      })
    );

    expect(state.hasPlus).toBe(true);
    expect(state.isLocked).toBe(false);
    // Not a member: the Plus marks stay, because they are how the end of the free days is known.
    expect(state.isMember).toBe(false);
    expect(state.trialEndsAt).toBe('2026-12-18T00:00:00Z');
  });

  it('counts a subscriber and a founding account as members', () => {
    const subscriber = plusStateOf(
      account({ access: 'subscription', trialEndsAt: null, subscription })
    );
    const founder = plusStateOf(
      account({ access: 'lifetime', trialEndsAt: null, subscription: null })
    );

    expect(subscriber.isMember).toBe(true);
    expect(subscriber.subscription).toEqual(subscription);
    expect(founder.isMember).toBe(true);
    expect(founder.hasPlus).toBe(true);
    expect(founder.subscription).toBeNull();
  });

  it('only reports a subscription when that is what gives the account Plus', () => {
    const state = plusStateOf(
      account({ access: 'lifetime', trialEndsAt: null, subscription })
    );

    expect(state.subscription).toBeNull();
  });
});
