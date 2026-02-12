import { useGetGroupsTotalAmounts } from "@/api/auth/QueryHooks/useGetGroupsTotalAmounts";
import { Signal } from "@preact/signals-react";
import { useMemo } from "react";

export function useGroupsList(
  pageSize: number,
  debouncedKeyword: string,
  activeGroupCatAsState: Signal<string>
) {
  const isGroupsMode = activeGroupCatAsState.value !== "NonGroup";

  const query = useGetGroupsTotalAmounts(pageSize, debouncedKeyword, activeGroupCatAsState);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = query;

  const groups = data?.pages.flatMap((p) => p.groups) ?? [];

  const filteredGroups = useMemo(() => {
    if (!isGroupsMode) return [];

    return groups.filter((g) => {
      if (activeGroupCatAsState.value === "Active") return !g.isArchived;
      if (activeGroupCatAsState.value === "Archived") return g.isArchived;
      return false;
    });
  }, [groups, activeGroupCatAsState.value, isGroupsMode]);

  return {
    filteredGroups,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching: isFetching && isGroupsMode,
  };
}