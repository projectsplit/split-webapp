import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import {  PersonalExpenseRequest } from "../../../types";
import { Signal } from "@preact/signals-react";

export const useCreatePersonalExpense = (
  menu: Signal<string | null>,
  setIsSubmitting: (value: boolean) => void,

) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, PersonalExpenseRequest>({
    mutationFn: (expense) => createPersonalExpense(expense),
    onSuccess: async () => {
      menu.value = null;
      await queryClient.invalidateQueries({
        queryKey: ["personalExpenses"],
        exact: false,
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });
};

const createPersonalExpense = async (req: PersonalExpenseRequest): Promise<void> => {
  console.log(req)
  await apiClient.post<void, AxiosResponse<void>>(
    "/expenses/create-personal",
    req
  );
};
