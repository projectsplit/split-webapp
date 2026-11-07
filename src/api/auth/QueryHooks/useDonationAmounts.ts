import { useQuery } from '@tanstack/react-query';
import {
  DonationCustomAmount,
  DonationProduct,
  DonationTierKind,
  DonationTierKindValue,
} from '@/types';
import { loadDonationTiers } from '@/helpers/playBilling';

/** Every amount "Other amount" can buy of one kind, as the Play products that sell them. */
const amountProducts = (
  custom: DonationCustomAmount,
  kind: DonationTierKindValue
): DonationProduct[] => {
  const isMonthly = kind === DonationTierKind.Monthly;
  const maxMinor = isMonthly ? custom.monthlyMaxMinor : custom.maxMinor;
  const prefix = isMonthly
    ? custom.monthlyProductPrefix
    : custom.oneTimeProductPrefix;
  const products: DonationProduct[] = [];

  for (let minor = custom.stepMinor; minor <= maxMinor; minor += custom.stepMinor) {
    products.push({
      productId: `${prefix}${minor}`,
      kind,
      basePlanId: isMonthly ? custom.monthlyBasePlanId : null,
    });
  }

  return products;
};

/**
 * Google Play's price, in the reader's currency, for every amount "Other amount" can buy, cheapest
 * first.
 *
 * Each amount is its own Play product priced per country: the amount itself in US dollars, euros,
 * pounds and Swiss francs, and Play's conversion of that many dollars everywhere else. A typed
 * figure can only be matched to a product through those prices, so the whole set is asked for at
 * once, and only when "Other amount" is opened. Play answers the list in a single call.
 */
export const useDonationAmounts = (
  custom: DonationCustomAmount | null,
  kind: DonationTierKindValue,
  enabled: boolean
) => {
  const products = custom ? amountProducts(custom, kind) : [];

  return useQuery({
    // The first and last ids pin down the whole set, since the step is part of the first.
    queryKey: [
      'donationAmounts',
      products[0]?.productId,
      products[products.length - 1]?.productId,
    ],
    queryFn: async () =>
      (await loadDonationTiers(products)).sort((a, b) => a.price - b.price),
    enabled: enabled && products.length > 0,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
