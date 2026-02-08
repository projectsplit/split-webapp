import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "../../apiClients";
import { useMutation } from "@tanstack/react-query";
import { Signal } from "@preact/signals-react";

export const useJoinWithCode = (errorMessage: Signal<string>) => {
  return useMutation<any, Error, { code: string; onSuccess: () => void }>({
    mutationFn: ({ code }) => joinWithCode({ code }),
    onSuccess: (_, variables) => {
      variables.onSuccess();
    },

    onError: (err) => {
      const error = err as AxiosError;
      errorMessage.value = String(error.response?.data);
    },
  });
};

const joinWithCode = async (req: JoinWithCodeRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/join", req);
};

type JoinWithCodeRequest = {
  code: string;
};
