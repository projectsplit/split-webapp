import { PlusAccess, PlusMembership, UserInfo } from '@/types';

/**
 * The server's answer about an account and Plus, turned into the three questions the screens ask.
 * The server decides all of it: who subscribes, who was given Plus for life, when the free days
 * end. Nothing here grants or withholds anything on its own.
 */
export type PlusState = {
  access: PlusAccess;
  /** May use the Plus features: everyone except an account whose free days are over. */
  hasPlus: boolean;
  /**
   * Has Plus as their own, by subscribing or as a founding account. The Plus marks and the Support
   * heart are for people who do not, so both go away.
   */
  isMember: boolean;
  /** The free days are over and there is no subscription. The Plus features show a lock. */
  isLocked: boolean;
  trialEndsAt: string | null;
  subscription: PlusMembership | null;
};

/**
 * Until the account has loaded, and against a server that predates Plus, the answer is "open".
 * Guessing the other way would flash locks at people who have every right to what is behind them.
 */
export const OPEN_PLUS_STATE: PlusState = {
  access: 'open',
  hasPlus: true,
  isMember: false,
  isLocked: false,
  trialEndsAt: null,
  subscription: null,
};

export const plusStateOf = (userInfo: UserInfo | undefined): PlusState => {
  const plus = userInfo?.plus;

  if (!plus) return OPEN_PLUS_STATE;

  return {
    access: plus.access,
    hasPlus: plus.access !== 'none',
    isMember: plus.access === 'subscription' || plus.access === 'lifetime',
    isLocked: plus.access === 'none',
    trialEndsAt: plus.trialEndsAt,
    subscription: plus.access === 'subscription' ? plus.subscription : null,
  };
};
