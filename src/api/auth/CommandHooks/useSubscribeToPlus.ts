import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlusPlanPrice } from '@/types';
import { purchasePlus } from '@/helpers/playBilling';
import { registerPlusPurchase } from '../api';

/**
 * Subscribing to Plus, from tapping the button to the server knowing about it.
 *
 * The same two steps as a tip, and for the same reason they must not come apart: Google Play takes
 * the payment and hands back a token, and the server takes that token to Google, records the
 * subscription and acknowledges it. Play refunds a subscription left unacknowledged for three
 * days, so a failed registration is an error to show, never something to pass over.
 *
 * Nobody becomes a Plus member here. The account turns Plus when the server says so, which is why
 * success refetches the account rather than setting anything on this side.
 */

export type PlusSubscribeOutcome = 'subscribed' | 'cancelled';

export const useSubscribeToPlus = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  return useMutation<PlusSubscribeOutcome, Error, PlusPlanPrice>({
    // The sheet says what went wrong beside the button, so the app-wide warning stays out of it.
    meta: { errorHandled: true },

    mutationFn: async (plan) => {
      if (!userId) {
        throw new Error('Not signed in');
      }

      const purchase = await purchasePlus(plan, userId);

      if (!purchase.ok) {
        // Backing out of Play's sheet is an ordinary thing to do, not a failure.
        if (purchase.cancelled) return 'cancelled';

        throw new Error('The payment could not be completed. Please try again.');
      }

      try {
        await registerPlusPurchase({ purchaseToken: purchase.purchaseToken });
      } catch (error) {
        console.error('Could not register the Plus purchase:', error);

        // Money has moved by now, so this must not read like the failure above. Both halves are
        // true: the sweep on the next app start registers anything Play still shows as
        // unacknowledged, and Play itself refunds what stays unacknowledged for three days.
        throw new Error(
          'Google Play took the payment, but Buqs could not confirm it just now. It will try again the next time you open the app, and Google Play refunds a payment that is never confirmed.'
        );
      }

      return 'subscribed';
    },

    onSuccess: async (outcome) => {
      if (outcome !== 'subscribed') return;

      // The account now carries the subscription, which is what takes the Plus marks and the
      // Support heart off the screen. The prompt's answer changes with it: members are not asked.
      await queryClient.invalidateQueries({ queryKey: ['getMe'] });
      queryClient.invalidateQueries({ queryKey: ['donationPrompt'] });
    },
  });
};
