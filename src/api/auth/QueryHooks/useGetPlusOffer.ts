import { useQuery } from '@tanstack/react-query';
import { getPlusOffer } from '@/api/auth/api';

/**
 * Asks the server whether Plus is on sale, and under which Play product and plans.
 *
 * Only the Plus sheet needs it, so it is asked for when the sheet opens rather than on every app
 * load. A server that predates Plus answers 404, which leaves this with no data, and no data reads
 * as "not on sale": the sheet then explains Plus exactly as it did before there was anything to buy.
 */
export const useGetPlusOffer = (enabled: boolean) => {
  return useQuery({
    queryKey: ['plusOffer'],
    queryFn: getPlusOffer,
    enabled,
  });
};
