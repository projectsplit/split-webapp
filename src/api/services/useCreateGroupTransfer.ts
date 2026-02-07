import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { CreateTransferRequest, Group } from "../../types";
import { Signal } from "@preact/signals-react";
import { NavigateFunction } from "react-router-dom";

export const useCreateGroupTransfer = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  navigate: NavigateFunction,
  isSubmitting: Signal<boolean>,
  nonGroupGroup?: Signal<Group | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateTransferRequest>({
    mutationFn: (transfer) => submitTransfer(transfer),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["debts"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["groupTransfers"],
        exact: false,
      });
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
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
      isSubmitting.value = false;
      menu.value = null;
      if (nonGroupGroup?.value) {
        navigate(`/shared/${groupId}/transfers`);
      }
    },
  });
};

const submitTransfer = async (req: CreateTransferRequest): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    "/transfers/create",
    req
  );
  return response.data;
};
