import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { recordDonationPromptShown } from '../api';

/**
 * Tells the server the prompt actually reached the screen, which is what starts the next cooldown.
 *
 * Reported from the client rather than counted when eligibility is fetched, because that fetch
 * happens on every app load and usually ends in nothing being shown — counting it there would burn
 * through the handful of asks a person ever gets without them having seen one.
 *
 * Failure is ignored on purpose. The worst case is that someone is asked again sooner than intended,
 * which is a far better outcome than an error surfacing over a prompt that is asking them a favour.
 */
export const useRecordDonationPromptShown = () => {
  return useMutation<unknown, AxiosError, void>({
    mutationFn: recordDonationPromptShown,
    onError: (error) =>
      console.error('Failed to record donation prompt as shown:', error),
  });
};
