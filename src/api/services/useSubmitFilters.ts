import { useQueryClient,useMutation } from "@tanstack/react-query";
import { CreateFiltersRequest } from "../../types";
import { apiClient } from "../apiClients";
import { AxiosError } from "axios";
import { Signal } from "@preact/signals-react";

export const useSubmitFilters = (submitFiltersError:Signal<string>) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateFiltersRequest>({
    mutationFn: (req: CreateFiltersRequest) => submitFilters(req), 
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

const submitFilters = async (req: CreateFiltersRequest) => {
  const response = await apiClient.post<CreateFiltersRequest>(
    `/filters/create`,
    req
  );
  return response.data;
};
