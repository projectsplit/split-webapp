import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { Group, UpdateSelectedCurrencyRequest } from "../../types";
import { Signal } from "@preact/signals-react";


export const useChangeGroupCurrency = (
  groupId: string | undefined,
  noGroupFoundError: Signal<string>,
  refetchQueries:Signal<boolean>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (currency) => {
      if (!groupId) {
        noGroupFoundError.value = "No group found";
        return Promise.reject(new Error("No group found"));
      }
      return updateGroupCurrency({ currency }, groupId);
    },
    onMutate: (currency) => {
      const currentGroup = queryClient.getQueryData<Group>([groupId]);
      if (currentGroup) {
        queryClient.setQueryData<Group>([groupId], {
          ...currentGroup,
          currency: currency,
        });
      }
    },

    onSuccess: () => {
      refetchQueries.value=true
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

const updateGroupCurrency = async (
  req: UpdateSelectedCurrencyRequest,
  groupId: string
): Promise<void> => {
  const response = await apiClient.put<void, AxiosResponse<void>>(
    `/groups/${groupId}/currency`,
    req
  );
  return response.data;
};
