import { useQuery } from '@tanstack/react-query';
import { loadSplitGroups, loadSplitPeople } from '@/helpers/splitTargets';

const FIVE_MINUTES = 5 * 60 * 1000;

/**
 * The groups and people an expense can be split with. Loaded as soon as `enabled` turns true (the
 * detail of a personal expense opening), so they are there by the time Split is tapped. Null until
 * they have loaded, and without a connection.
 */
export const useSplitTargets = (enabled: boolean) => {
  const groups = useQuery({
    queryKey: ['splitTargets', 'groups'],
    queryFn: loadSplitGroups,
    enabled,
    staleTime: FIVE_MINUTES,
  });

  const people = useQuery({
    queryKey: ['splitTargets', 'people'],
    queryFn: loadSplitPeople,
    enabled,
    staleTime: FIVE_MINUTES,
  });

  return { groups: groups.data ?? null, people: people.data ?? null };
};
