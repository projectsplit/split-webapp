import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { CreateTransfersRequest } from "../../types";


export const useMultipleTransfers = () => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError, CreateTransfersRequest>({
    mutationFn: (transfers) => submitMultipleTransfers( transfers ),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["debts"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["groupTransfers"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["home"], exact: false });
      await queryClient.refetchQueries({ queryKey: ["groups"], exact: false });
    }
  });
};

const submitMultipleTransfers = async (req: CreateTransfersRequest): Promise<void> => {
  const response =  await apiClient.post<void, AxiosResponse<void>>("/transfers/create-many", req);
  return response.data;
};

