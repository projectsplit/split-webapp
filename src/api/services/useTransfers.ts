import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { CreateTransferRequest } from "../../types";
import { Signal } from "@preact/signals-react";
import { NavigateFunction } from "react-router-dom";

export const useTransfer = (
  menu: Signal<string | null>,
  groupId: string | undefined,
  navigate: NavigateFunction,
  isSubmitting: Signal<boolean>,
  isNonGroupTransfer?: Signal<boolean>
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
        queryKey: ["groups"],
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
      isSubmitting.value=false
      menu.value = null;
      if (isNonGroupTransfer && isNonGroupTransfer.value) {
        navigate(`/groups/${groupId}/transfers`);
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
