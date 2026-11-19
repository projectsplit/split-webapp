import { useQuery } from '@tanstack/react-query';
import { PlusOffer } from '@/types';
import { loadPlusPlans } from '@/helpers/playBilling';

/**
 * Puts Google Play's prices on the Plus plans the server offers.
 *
 * Kept apart from the server's answer for the reason the tip tiers are: the server says which
 * plans exist, Play says what each costs here, and the two fail differently. Prices change only
 * when they are changed in the Play Console, so an answer is kept for the session; a lookup that
 * failed has no answer to keep, and is asked again the next time the sheet opens.
 */
export const usePlusPlans = (offer: PlusOffer | undefined, enabled: boolean) => {
  return useQuery({
    // Keyed on what would change the answer: the product and the plans under it.
    queryKey: [
      'plusPlans',
      offer?.productId,
      offer?.plans.map((plan) => plan.basePlanId).join(','),
    ],
    queryFn: () => loadPlusPlans(offer as PlusOffer),
    enabled: enabled && Boolean(offer?.isAvailable && offer.plans.length),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
