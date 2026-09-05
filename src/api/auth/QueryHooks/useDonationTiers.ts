import { useQuery } from '@tanstack/react-query';
import { DonationProduct } from '@/types';
import { loadDonationTiers } from '@/helpers/playBilling';

/**
 * Puts Google Play's prices on the tiers the server offers.
 *
 * Kept apart from the server's own answer because the two come from different places and fail
 * differently: the server says which tiers exist, Play says what each costs here. Splitting them
 * means a Play outage leaves the prompt saying nothing rather than saying the wrong price.
 *
 * Prices change only when they are changed in the Play Console, so there is nothing to poll for.
 */
export const useDonationTiers = (
  products: DonationProduct[] | undefined,
  enabled: boolean
) => {
  return useQuery({
    // Keyed on the ids so a change to the offered set refetches, without the query restarting every
    // time the server's response object is a new reference.
    queryKey: ['donationTiers', products?.map((x) => x.productId).join(',')],
    queryFn: () => loadDonationTiers(products ?? []),
    enabled: enabled && Boolean(products?.length),
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
