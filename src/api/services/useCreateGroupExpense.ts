import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { ExpenseRequest, Group, Guest, Member, User } from "../../types";
import { Signal } from "@preact/signals-react";
import { NavigateFunction } from "react-router-dom";

export const useCreateGroupExpense = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  navigate: NavigateFunction,
  setIsSubmitting: (value: boolean) => void,
  makePersonalClicked: boolean,
  nonGroupUsers: Signal<User[]>,
  nonGroupGroup: Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  fromHome: boolean | undefined
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, ExpenseRequest>({
    mutationFn: (expense) => createGroupExpense(expense),
    onSuccess: async () => {
      menu.value = null;
      if (groupId) {
        navigate(`/shared/${groupId}/expenses`);
      }
      await queryClient.invalidateQueries({
        queryKey: ["debts"],
        exact: false,
      });
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

      if (fromHome) {
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
          localStorage.setItem("submittedFromHomePersistData", JSON.stringify(data));
      }

      if (makePersonalClicked) {
        localStorage.removeItem("submittedFromHomePersistData");
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
