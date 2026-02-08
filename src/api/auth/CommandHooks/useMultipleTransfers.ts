import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { CreateTransfersRequest } from "../../../types";
import { Signal } from "@preact/signals-react";


export const useMultipleTransfers = (menu: Signal<string | null>,) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateTransfersRequest>({
    mutationFn: (transfers) => submitMultipleTransfers(transfers),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["debts"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["groupTransfers"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["home"], exact: false });
      await queryClient.invalidateQueries({ queryKey: ["shared"], exact: false });
      menu.value = null;
    }
  });
};

const submitMultipleTransfers = async (req: CreateTransfersRequest): Promise<void> => {
  const response = await apiClient.post<void, AxiosResponse<void>>("/transfers/create-many", req);
  return response.data;
};

