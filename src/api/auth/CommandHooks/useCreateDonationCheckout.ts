import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  CreateDonationCheckoutSessionRequest,
  CreateDonationCheckoutSessionResponse,
} from '../../../types';
import { createDonationCheckoutSession } from '../api';

/**
 * Swaps an amount for a Stripe-hosted Checkout URL and sends the browser there.
 *
 * No card field exists anywhere in this app, and that is the point: payment details are typed on
 * Stripe's page, on Stripe's domain, so nothing here is ever in a position to see or store them.
 *
 * The redirect happens inside the mutation rather than in a caller's `onSuccess`, so the button
 * stays in its pending state until the page is actually leaving. Resolving first would flash the
 * form back to idle in the moment before navigation and invite a second click.
 */
export const useCreateDonationCheckout = () => {
  return useMutation<
    CreateDonationCheckoutSessionResponse,
    AxiosError<string>,
    CreateDonationCheckoutSessionRequest
  >({
    mutationFn: async (request) => {
      const response = await createDonationCheckoutSession(request);

      window.location.assign(response.checkoutUrl);

      return response;
    },
  });
};
