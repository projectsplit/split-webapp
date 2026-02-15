import { useMemo } from "react";
import { useGetNonGroupExpensesUsers } from "./useGetNonGroupExpensesUsers";
import { useGetNonGroupTransferUsers } from "./useGetNonGroupTransfersUsers";
import { TransactionType, User } from "../../../types";

export const useGetAllNonGroupUsers = (transactionType: TransactionType) => {
    const expenseUsers = useGetNonGroupExpensesUsers(transactionType);
    const transferUsers = useGetNonGroupTransferUsers(transactionType);

    const allUsers = useMemo(() => {
        const combinedUsers = [
            ...(expenseUsers.data?.data.users || []),
            ...(transferUsers.data?.data.users || []),
        ];

        // Deduplicate by userId
        const uniqueUsersMap = new Map<string, User>();
        combinedUsers.forEach((user) => {
            if (user.userId) {
                uniqueUsersMap.set(user.userId, user);
            }
        });

        return Array.from(uniqueUsersMap.values());
    }, [expenseUsers.data, transferUsers.data]);

    const isLoading = expenseUsers.isLoading || transferUsers.isLoading;
    const isError = expenseUsers.isError || transferUsers.isError;

    return { allUsers, isLoading, isError };
};
