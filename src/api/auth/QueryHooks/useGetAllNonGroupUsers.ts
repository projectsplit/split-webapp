import { useMemo } from 'react';
import { useGetNonGroupExpensesUsers } from './useGetNonGroupExpensesUsers';
import { useGetNonGroupTransferUsers } from './useGetNonGroupTransfersUsers';
import { Mode, User } from '../../../types';

const NO_USERS: User[] = [];

export const useGetAllNonGroupUsers = (mode: Mode) => {
  const expenseUsers = useGetNonGroupExpensesUsers(mode);
  const transferUsers = useGetNonGroupTransferUsers(mode);

  const allUsers = useMemo(() => {
    const combinedUsers = [
      ...(expenseUsers.data?.data.users || []),
      ...(transferUsers.data?.data.users || []),
    ];

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

  if (mode === Mode.Personal) {
    return { allUsers: NO_USERS, isLoading: false, isError: false };
  }

  return { allUsers, isLoading, isError };
};
