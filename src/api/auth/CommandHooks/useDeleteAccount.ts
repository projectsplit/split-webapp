import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../apiClients';
import { logOut } from '../api';
import { unsubscribeFromPush } from '../../../helpers/pushNotifications';
import routes from '../../../routes';

/**
 * Deletes the signed-in account, then leaves this device as signed out as the server already is.
 *
 * The server does the deleting and drops every session with it, so nothing here is what makes the
 * account go. What is left for the client is its own leftovers: the push registration the browser
 * or phone still holds, the refresh cookie, the token, and whatever the query cache remembers of
 * someone who no longer exists.
 */
export const useDeleteAccount = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation<void, AxiosError<unknown>, void>({
    // The dialog shows the failure itself, next to the button that caused it.
    meta: { errorHandled: true },

    mutationFn: async () => {
      // First, while there is still an account to unsubscribe as. Failing here must not stop the
      // deletion: the server removes its own copy of the registration either way.
      try {
        await unsubscribeFromPush();
      } catch (error) {
        console.error(
          'Failed to remove push subscription before deletion:',
          error
        );
      }

      await apiClient.post('/users/delete-account', {});
    },

    onSuccess: async () => {
      // No session is left for this to end. It is called for the one thing only the server can
      // do from here, which is clear the HttpOnly refresh cookie.
      try {
        await logOut();
      } catch (error) {
        console.error('Log out after deletion failed:', error);
      }

      localStorage.removeItem('accessToken');
      sessionStorage.removeItem('submittedFromHomePersistData');

      navigate(
        `${routes.AUTH}?message=${encodeURIComponent(
          'Your account has been deleted.'
        )}`
      );

      setTimeout(() => queryClient.clear(), 0);
    },
  });
};
