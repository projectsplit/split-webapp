import { QueryClient } from '@tanstack/react-query';
import { GetUserInvitationsResponse } from '../../../types';

type InvitationsCache =
  | { pages: GetUserInvitationsResponse[]; pageParams: any[] }
  | undefined;

const invitationsKey = ['userInvitations', 10];

export const removeInvitationFromCache = async (
  queryClient: QueryClient,
  invitationId: string
): Promise<InvitationsCache> => {
  await queryClient.cancelQueries({ queryKey: ['userInvitations'] });

  const previousInvitations =
    queryClient.getQueryData<NonNullable<InvitationsCache>>(invitationsKey);

  queryClient.setQueryData(invitationsKey, (old: InvitationsCache) => {
    if (!old) return old;

    const filteredPages = old.pages.map((page) => ({
      ...page,
      invitations: page.invitations.filter((inv) => inv.id !== invitationId),
    }));
    const keepPage = filteredPages.map((page) => page.invitations.length > 0);
    return {
      pages: filteredPages.filter((_, i) => keepPage[i]),
      pageParams: old.pageParams.filter((_, i) => keepPage[i]),
    };
  });

  return previousInvitations;
};

export const restoreInvitationsCache = (
  queryClient: QueryClient,
  previousInvitations: InvitationsCache
) => {
  queryClient.setQueryData(invitationsKey, previousInvitations);
};
