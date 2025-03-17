import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { UpdateSelectedCurrencyRequest } from "../../types";

export const useSelectedCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (currency) => updateSelectedCurrency({ currency }),
    onSuccess: async () => {
      queryClient.refetchQueries({
        queryKey: ["getMe"],
        exact: false,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const updateSelectedCurrency = async (
  req: UpdateSelectedCurrencyRequest
): Promise<void> => {
  const response = await apiClient.put<void, AxiosResponse<void>>(
    "/users/preferences/currency",
    req
  );
  return response.data;
};
