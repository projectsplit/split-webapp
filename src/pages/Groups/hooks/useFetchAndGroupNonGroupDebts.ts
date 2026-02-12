import { useDebts } from "@/api/auth/QueryHooks/useDebts";
import getAllDebtsParticipants from "@/helpers/getAllDebtsParticipants";
import { groupTransactions } from "@/helpers/groupTransactions";
import { TransactionType } from "@/types";
import { useMemo } from "react";

export function useFetchAndGroupNonGroupDebts(userId: string, transactionType: TransactionType) {
    const isNonGroupMode = transactionType === "NonGroup";

    const { data: debtsData, isFetching, isLoading } = useDebts();

    const { debts = [], totalSpent = {} } = debtsData ?? {};

    const allParticipants = useMemo(
        () => (isNonGroupMode ? getAllDebtsParticipants(debts, "NonGroup", [], []) : []),
        [debts, isNonGroupMode]
    );

    const groupedTransactions = useMemo(() => {
        if (!isNonGroupMode) return [];
        return groupTransactions(debts, allParticipants, userId);
    }, [debts, allParticipants, userId, isNonGroupMode]);

    return {
        debts,
        totalSpent,
        groupedTransactions,
        isFetchingDebts: isFetching,
        isLoadingDebts: isLoading,
    };
}