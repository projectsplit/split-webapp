import { useQuery } from '@tanstack/react-query';
import { getDonationPrompt } from '@/api/auth/api';

/**
 * Asks the server whether this person is due to be asked for a contribution.
 *
 * Fetched once per app load and then left alone: the answer only changes on a timescale of months,
 * so there is nothing to poll for, and a refetch that flipped `shouldAsk` mid-session would make
 * the prompt appear out of nowhere while someone was reading something else.
 */
export const useGetDonationPrompt = (enabled: boolean) => {
  return useQuery({
    queryKey: ['donationPrompt'],
    queryFn: getDonationPrompt,
    enabled,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
