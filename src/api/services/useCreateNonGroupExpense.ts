import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { ExpenseRequest, Group, Guest, Member, User } from "../../types";
import { Signal } from "@preact/signals-react";
import { NavigateFunction } from "react-router-dom";

export const useCreateNonGroupExpense = (
  menu: Signal<string | null>,
  navigate: NavigateFunction,
  setIsSubmitting: (value: boolean) => void,
  nonGroupUsers: Signal<User[]>,
  nonGroupGroup: Signal<Group | null> | undefined,
  groupMembers: Signal<(Member | Guest)[]>,
  makePersonalClicked: boolean,
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, ExpenseRequest>({
    mutationFn: (expense) => createNonGroupExpense(expense),
    onSuccess: async () => {
      menu.value = null;
      navigate(`/shared/nongroup/expenses`);

      await queryClient.invalidateQueries({
        queryKey: ["debts"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["nonGroupExpenses"],
        exact: false,
      });

      const data = {
        nonGroupUsers: nonGroupUsers.value,
        nonGroupGroup: nonGroupGroup?.value,
        groupMembers: groupMembers.value,
      };
      if (
        groupMembers.value.length > 0 ||
        nonGroupUsers.value.length > 0 ||
        nonGroupGroup?.value
      ) {
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

const createNonGroupExpense = async (req: ExpenseRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>(
    "/expenses/create-non-group",
    req
  );
};
