import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import type { PersistQueryClientOptions } from '@tanstack/react-query-persist-client';
import { createStore, del, get, set } from 'idb-keyval';
import packageJson from '../../../package.json';
import { getSignedInUserId } from '@/helpers/isUserAuthenticated';

const store = createStore('buqs-query-cache', 'cache');

const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

// Kept out of the saved copy: one-off answers, which would be wrong to show from memory, and the
// support prompt, which offline could only lead to a failed purchase.
const NOT_SAVED = new Set([
  'searchUsersToInvite',
  'expensesExport',
  'joinCode',
  'getGroupJoinCodes',
  'usernameStatus',
  'donationPrompt',
  'donationTiers',
]);

// The pickers for who an expense is with open on these lists unfiltered, and offline the saved
// unfiltered list is all there is to pick from. What someone typed into them is not worth keeping.
const SEARCHES = new Set(['searchUsers', 'searchGroupsByName']);

const isSaved = (queryKey: readonly unknown[]) => {
  const [name, keyword] = queryKey;

  if (NOT_SAVED.has(String(name))) return false;
  return !SEARCHES.has(String(name)) || keyword === '';
};

type SavedCache = { userId: string; cache: string };

/**
 * The saved copy belongs to whoever was signed in when it was written. Someone else signing in on
 * this device must never see it, not even for the moment before their own data arrives, so it is
 * only read back for the same person and never written while nobody is signed in.
 */
const storage = {
  getItem: async (key: string) => {
    const userId = getSignedInUserId();
    if (!userId) return null;

    const saved = await get<SavedCache>(key, store);
    return saved?.userId === userId ? saved.cache : null;
  },
  setItem: async (key: string, cache: string) => {
    const userId = getSignedInUserId();
    await (userId ? set(key, { userId, cache }, store) : del(key, store));
  },
  removeItem: (key: string) => del(key, store),
};

const persister = createAsyncStoragePersister({
  storage,
  key: 'queries',
  throttleTime: 2000,
});

/**
 * Saves what the screens have loaded, so the app opened without a connection shows the last of it
 * instead of spinners. The version busts the copy on every release, since a newer build may expect
 * responses shaped differently from the ones saved.
 */
export const queryCachePersistOptions: Omit<
  PersistQueryClientOptions,
  'queryClient'
> = {
  persister,
  maxAge: MAX_AGE_MS,
  buster: packageJson.version,
  dehydrateOptions: {
    // The age limit keeps the copy from growing with every screen ever opened: each launch puts
    // the saved queries back in the cache, so without it nothing would ever leave.
    shouldDehydrateQuery: (query) =>
      query.state.status === 'success' &&
      isSaved(query.queryKey) &&
      Date.now() - query.state.dataUpdatedAt < MAX_AGE_MS,
    // New expenses filed offline have a store of their own. A paused mutation of any other kind
    // would come back after a restart with nothing to run it.
    shouldDehydrateMutation: () => false,
  },
};

export const clearSavedQueryCache = () => persister.removeClient();
