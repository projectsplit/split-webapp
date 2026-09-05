import { useEffect, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { findUnregisteredPurchases } from '@/helpers/playBilling';
import { registerDonationPurchase } from '@/api/auth/api';
import { isNativeApp } from '@/helpers/platform';

/**
 * Catches gifts that were paid for but never recorded.
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

      for (const purchase of purchases) {
        try {
          await registerDonationPurchase(purchase);
        } catch (error) {
          // Left for the next app start. The purchase stays unacknowledged, so it will be found
          // again, and Play's own notification is the backstop if it never is.
          console.error('Could not register a recovered purchase:', error);
        }
      }

      queryClient.invalidateQueries({ queryKey: ['donationPrompt'] });
    })();
  }, [enabled, queryClient]);
}
