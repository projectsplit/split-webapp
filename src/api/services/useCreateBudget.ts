import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../apiClients";
import { NavigateFunction } from "react-router-dom";
import { Signal } from "@preact/signals-react";
import { CreateBudgetRequest } from "../../types";

export const useCreateBudget = ( navigate: NavigateFunction,submitBudgetErrors: Signal<any[]>) => {
  const queryClient = useQueryClient();

  return useMutation<any, any, CreateBudgetRequest>({
    mutationKey: ["budget", "create"],
    mutationFn: createBudget,
    onError: (error) => {
      submitBudgetErrors.value = error.response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["budget"], exact: false });
      navigate("/budget/current");
    },
  });
};

const createBudget = async (request: CreateBudgetRequest) => {
  const response = await apiClient.post<CreateBudgetRequest>(
    `/budget/create`,
    request
  );
  return response.data;
};
