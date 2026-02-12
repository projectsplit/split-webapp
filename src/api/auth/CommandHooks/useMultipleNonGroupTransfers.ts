import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { CreateTransfersRequest } from "../../../types";
import { Signal } from "@preact/signals-react";


export const useMultipleNonGroupTransfers = (menu: Signal<string | null>,) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateTransfersRequest>({
    mutationFn: (transfers) => submitMultipleNonGroupTransfers(transfers),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["nonGroupDebts"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["nonGroupTransfers"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["shared"], exact: false });
      menu.value = null;
    }
  });
};

const submitMultipleNonGroupTransfers = async (req: CreateTransfersRequest): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>("/transfers/create-many-non-group", req);
  return response.data;
};

