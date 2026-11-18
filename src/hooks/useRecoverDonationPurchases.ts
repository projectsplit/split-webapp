import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { findUnregisteredPurchases } from '@/helpers/playBilling';
import {
  getPlusOffer,
  registerDonationPurchase,
  registerPlusPurchase,
} from '@/api/auth/api';
import { isNativeApp } from '@/helpers/platform';

/**
 * Which Play product is the Plus subscription, or null if the server cannot say. A Plus purchase
 * is registered somewhere else than a gift, and the product id is what tells the two apart.
 */
const plusProductId = async (): Promise<string | null> => {
  try {
    return (await getPlusOffer()).productId;
  } catch {
    // A server that predates Plus has no such answer, and has sold no Plus to recover either.
    return null;
  }
};

/**
 * Catches purchases that were paid for but never recorded: gifts, and Plus subscriptions.
 *
 * Registration happens right after the payment sheet closes, and almost always lands. When it does
 * not — the app was killed, the connection dropped — Google Play has taken the money and this
 * server knows nothing about it, and Play refunds anything left unacknowledged after three days.
 * So the app checks once on start, which is the only moment it is guaranteed to get.
 *
 * Silent throughout. Someone opening the app has not asked about this, and the failure being
 * recovered from is one they already believe is behind them.
 */
export function useRecoverDonationPurchases(enabled: boolean) {
  const queryClient = useQueryClient();

  // Once per app start, not once per mount. Protected remounts on navigation, and each remount
  // would otherwise re-run the sweep and its purchase lookups.
  const hasRun = useRef(false);

  useEffect(() => {
    if (!enabled || !isNativeApp() || hasRun.current) return;

    hasRun.current = true;

    void (async () => {
      const purchases = await findUnregisteredPurchases();

      if (purchases.length === 0) return;

      // Asked only now, when there is something to sort: almost every app start finds nothing.
      const plusId = await plusProductId();

      for (const purchase of purchases) {
        try {
          if (plusId !== null && purchase.productId === plusId) {
            await registerPlusPurchase({ purchaseToken: purchase.purchaseToken });
          } else {
            await registerDonationPurchase(purchase);
          }
        } catch (error) {
          // Left for the next app start. The purchase stays unacknowledged, so it will be found
          // again, and Play's own notification is the backstop if it never is.
          console.error('Could not register a recovered purchase:', error);
        }
      }

      queryClient.invalidateQueries({ queryKey: ['donationPrompt'] });
      // A recovered subscription is what makes this account Plus.
      queryClient.invalidateQueries({ queryKey: ['getMe'] });
    })();
  }, [enabled, queryClient]);
}
