import { MutationCache, QueryClient } from '@tanstack/react-query';
import {
  isSilentError,
  messageFromError,
  showGlobalWarning,
} from '../components/GlobalWarning/globalWarningState';

// Its own module so code outside React, such as the sync that sends expenses filed offline, can
// refresh the same cache the screens read.
export const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.errorHandled) return;
      if (isSilentError(error)) return;

      showGlobalWarning(
        messageFromError(error, 'Something went wrong. Please try again.')
      );
    },
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 15 * 60 * 1000,
      refetchOnMount: true,
      // A query has to still be in the cache to be saved for offline use, so a screen visited this
      // morning is kept rather than dropped five minutes after leaving it.
      gcTime: 24 * 60 * 60 * 1000,
    },
  },
});
