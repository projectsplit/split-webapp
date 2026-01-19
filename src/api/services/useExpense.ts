import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { ExpenseRequest, Group, Guest, Member, User } from "../../types";
import { Signal } from "@preact/signals-react";
import { NavigateFunction } from "react-router-dom";

export const useExpense = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  navigate: NavigateFunction,
  setIsSubmitting: (value: boolean) => void,
  nonGroupUsers: Signal<User[]>,
  nonGroupGroup:Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  makePersonalClicked:boolean,
  isNonGroupExpense: Signal<boolean> | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, ExpenseRequest>({
    mutationFn: (expense) =>
      isNonGroupExpense?.value
        ? createNonGroupExpense(expense)
        : createGroupExpense(expense),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["debts"],
        exact: false,
      });

      if (isNonGroupExpense?.value) {
        menu.value = null;
        navigate(`/shared/nongroup/expenses`);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["groupExpenses"],
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: ["home"],
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: ["shared"],
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: ["mostRecentGroup"],
          exact: false,
        });
        await queryClient.invalidateQueries({
          queryKey: [groupId],
          exact: false,
        });

        if (isNonGroupExpense && isNonGroupExpense.value) {
          const data = {
            nonGroupUsers: nonGroupUsers.value,
            nonGroupGroup: nonGroupGroup?.value,
            groupMembers: groupMembers.value,
          };
          if (
            groupMembers.value.length > 0 ||
            nonGroupUsers.value.length > 0 ||
            nonGroupGroup?.value
          )
            localStorage.setItem("nonGroupExpenseData", JSON.stringify(data));
        }
        if (makePersonalClicked) {
          localStorage.removeItem("nonGroupExpenseData");
        }
        menu.value = null;
        navigate(`/shared/${groupId}/expenses`);
      }
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
};

const createGroupExpense = async (req: ExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/expenses/create", req);
};

const createNonGroupExpense = async (req: ExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>(
    "/expenses/create-non-group",
    req
  );
};
