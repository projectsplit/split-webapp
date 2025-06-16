import { useQueryClient,useMutation } from "@tanstack/react-query";
import {  CreateTransferFilterRequest } from "../../types";
import { apiClient } from "../apiClients";
import { AxiosError } from "axios";
import { Signal } from "@preact/signals-react";

export const useSubmitTransferFilters = (submitFiltersError:Signal<string>) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateTransferFilterRequest>({
    mutationFn: (req: CreateTransferFilterRequest) => submitFilters(req), 
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["groupTransfers"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["groupExpenses"],
        exact: false,
      });
        await queryClient.invalidateQueries({
        queryKey: ["filters"],
        exact: false,
      });
    },
 onError: (err) => {
      const error = err as AxiosError;
      submitFiltersError.value = String(error.response?.data);
    }
  });
};

const submitFilters = async (req: CreateTransferFilterRequest) => {
  const response = await apiClient.post<CreateTransferFilterRequest>(
    `/filters/create`,
    req
  );
  return response.data;
};
