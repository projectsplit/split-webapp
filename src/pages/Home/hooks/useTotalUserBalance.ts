import { useGetGroupsAllBalances } from '@/api/auth/QueryHooks/useGetGroupsAllBalances';
import { computeNetPerCurrency } from '@/helpers/computeNetPerCurrency';
import { useFetchAndGroupNonGroupDebts } from '@/pages/Groups/hooks/useFetchAndGroupNonGroupDebts';
import {
  Details,
  GroupedTransaction,
  GroupsAllBalancesResponse,
  Mode,
} from '@/types';
import { useMemo } from 'react';

interface UseTotalUserBalanceResult {
  groupBalances: Details;
  nonGroupBalances: Details;
  isLoading: boolean;
  isFetching: boolean;
  groupsData?: GroupsAllBalancesResponse;
  nonGroupGroupedTransactions: GroupedTransaction[];
}

export function useTotalUserBalance(userId: string): UseTotalUserBalanceResult {
  const {
    data: groupsData,
    isFetching: isFetchingGroups,
    isLoading: isLoadingGroups,
  } = useGetGroupsAllBalances();

  const { groupedTransactions, isFetchingDebts, isLoadingDebts } =
    useFetchAndGroupNonGroupDebts(userId, Mode.NonGroup);

  const nonGroupBalances = useMemo<Details>(
    () => (userId ? computeNetPerCurrency(groupedTransactions, userId) : {}),
    [groupedTransactions, userId]
  );
  const groupBalances = groupsData?.balances ?? {};

  const isLoading = isLoadingGroups || isLoadingDebts;
  const isFetching = isFetchingGroups || isFetchingDebts;
  const nonGroupGroupedTransactions = groupedTransactions;
  return {
    groupBalances,
    nonGroupBalances,
    isLoading,
    isFetching,
    groupsData,
    nonGroupGroupedTransactions,
  };
}
