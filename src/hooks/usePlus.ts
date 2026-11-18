import { useQuery } from '@tanstack/react-query';
import { getMe } from '@/api/auth/QueryHooks/useGetMe';
import {
  OPEN_PLUS_STATE,
  PlusState,
  plusStateOf,
} from '@/helpers/plusState';

export type { PlusState };

/**
 * Where the signed-in account stands with Plus, read off the account the app already has.
 *
 * It rides on the account query rather than one of its own because that query is already on every
 * screen, is refreshed every minute, and is saved for offline use, so a lock or a lapsed
 * subscription is noticed without anyone asking and holds without a connection.
 *
 * Listens without fetching. Every Plus mark on a screen calls this, and each caller of the account
 * query proper brings its own once-a-minute timer; a dozen marks must not mean a dozen polls.
 */
export const usePlus = (): PlusState => {
  const { data } = useQuery({
    queryKey: ['getMe'],
    queryFn: getMe,
    enabled: false,
    select: plusStateOf,
  });

  return data ?? OPEN_PLUS_STATE;
};
