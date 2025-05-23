import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { UpdateSelectedCurrencyRequest, UserInfo } from "../../types";

export const useSelectedCurrency = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (currency) => updateSelectedCurrency({ currency }),
    onMutate: (currency) => {
      const currentUserInfo = queryClient.getQueryData<UserInfo>(["getMe"]);
      if (currentUserInfo) {
        queryClient.setQueryData<UserInfo>(["getMe"], {
          ...currentUserInfo,
          currency: currency,
        });
      }
    },

    onSuccess: async () => {
      queryClient.invalidateQueries({
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
