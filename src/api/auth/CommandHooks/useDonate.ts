import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DonationTier } from '@/types';
import { purchaseDonation } from '@/helpers/playBilling';
import { registerDonationPurchase } from '../api';

/**
 * The whole gift, from tapping a tier to the server having a record of it.
 *
 * Two steps that must not come apart. Google Play takes the money and hands back a token; the
 * server takes that token to Google, records the gift, and acknowledges it. Play refunds anything
 * unacknowledged after three days, so a purchase that never reaches the second step is a payment
 * that quietly reverses — which is why registration failing is surfaced as an error rather than
 * swallowed, and why the caller must not treat the sheet closing as success.
 *
 * No card field exists anywhere in this app, and that is the point: payment details are typed into
 * Play's own sheet, so nothing here is ever in a position to see or store them.
 */

export type DonationOutcome = 'given' | 'cancelled';

export const useDonate = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation<DonationOutcome, Error, DonationTier>({
    mutationFn: async (tier) => {
      if (!userId) {
        throw new Error('Not signed in');
      }

      const purchase = await purchaseDonation(tier, userId);

      if (!purchase.ok) {
        // Backing out of the sheet is an ordinary thing to do and is not a failure. It resolves so
        // the form returns quietly to where it was, rather than showing someone who just changed
        // their mind an error about it.
        if (purchase.cancelled) return 'cancelled';

        throw new Error('The payment could not be completed');
      }

      await registerDonationPurchase({
        productId: tier.productId,
        purchaseToken: purchase.purchaseToken,
      });

      return 'given';
    },

    onSuccess: (outcome) => {
      if (outcome !== 'given') return;

      // The prompt's answer now says this person has given, which is what turns the settings entry
      // from an ask into a thank-you and stops them being asked again for a year.
      queryClient.invalidateQueries({ queryKey: ['donationPrompt'] });
    },
  });
};
