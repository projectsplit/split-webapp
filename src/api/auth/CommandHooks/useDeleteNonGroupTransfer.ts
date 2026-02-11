import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { DeleteTransferRequest, TransferResponseItem } from "../../../types";
import { Signal } from "@preact/signals-react";

export const useDeleteNonGroupTransfer = (
  menu: Signal<string | null>,
  errorMessage: Signal<string>,
  selectedTransfer: Signal<TransferResponseItem | null>
) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, string>({
    mutationFn: (transferId) => deleteTransfer({ transferId }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["nonGroupDebts"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["nonGroupTransfers"],
        exact: false,
      });
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["shared"], exact: false });
      await queryClient.invalidateQueries({
        queryKey: ["mostRecentGroup"],
        exact: false,
      });
      selectedTransfer.value = null;
      menu.value = null;
    },
    onError: (err) => {
      const error = err as AxiosError;
      errorMessage.value = String(error.response?.data);
      selectedTransfer.value = null;
    },
  });
};

const deleteTransfer = async (req: DeleteTransferRequest): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>(
    "/transfers/delete-non-group",
    req
  );
  return response.data;
};
