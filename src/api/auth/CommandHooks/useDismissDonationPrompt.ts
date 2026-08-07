import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { DonationPromptInfo } from '../../../types';
import { dismissDonationPrompt } from '../api';

/**
 * Records a dismissal. `optOut` separates a permanent "don't ask again" from an ordinary "not now",
 * which only lets the cooldown run.
 *
 * The prompt closes the moment it is clicked and does not wait for this to come back — nothing about
 * the dismissal is worth making someone sit through a spinner for, and the local cache write below
 * is what keeps it closed for the rest of the session if the request is slow or fails.
 */
export const useDismissDonationPrompt = () => {
  const queryClient = useQueryClient();

  return useMutation<unknown, AxiosError, boolean>({
    mutationFn: (optOut) => dismissDonationPrompt({ optOut }),

    onMutate: async () => {
      const current = queryClient.getQueryData<DonationPromptInfo>([
        'donationPrompt',
      ]);

      if (current) {
        queryClient.setQueryData<DonationPromptInfo>(['donationPrompt'], {
          ...current,
          shouldAsk: false,
        });
      }
    },

    onError: (error) =>
      console.error('Failed to dismiss the donation prompt:', error),
  });
};
