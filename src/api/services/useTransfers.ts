import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { CreateTransferRequest } from "../../types";
import { Signal } from "@preact/signals-react";


export const useTransfer = ( menu:Signal<string|null>) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateTransferRequest>({
    mutationFn: (transfer) => submitTransfer( transfer ),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["debts"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["groupTransfers"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["home"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["groups"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["mostRecentGroup"], exact: false });
      menu.value=null
    }
  });
};

const submitTransfer = async (req: CreateTransferRequest): Promise<void> => {
  const response =  await apiClient.post<void, AxiosResponse<void>>("/transfers/create", req);
  return response.data;
};

