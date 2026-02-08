import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { CreateTransferRequest, Group } from "../../../types";
import { Signal } from "@preact/signals-react";
import { NavigateFunction } from "react-router-dom";

export const useCreateNonGroupTransfer = (
  menu: Signal<string | null>,
  navigate: NavigateFunction,
  isSubmitting: Signal<boolean>,
) => {
  const queryClient = useQueryClient();
  return useMutation<any, AxiosError, CreateTransferRequest>({
    mutationFn: (transfer) => submitTransfer(transfer),
    onSuccess: async () => {
      menu.value = null;
      navigate(`/shared/nongroup/transfers`);
      await queryClient.invalidateQueries({
        queryKey: ["debts"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["nonGroupTransfers"],
        exact: false,
      });
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["shared"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["home"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: ["non-group-transfer-users"],
        exact: false,
      });
      isSubmitting.value = false;
    },
  });
};

const submitTransfer = async (req: CreateTransferRequest): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    "/transfers/create-non-group",
    req
  );
  return response.data;
};
