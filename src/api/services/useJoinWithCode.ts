import { AxiosResponse } from "axios";
import { apiClient } from "../apiClients";
import { useMutation } from "@tanstack/react-query";

export const useJoinWithCode = () => {

  return useMutation<any, Error, { code: string; onSuccess: () => void }>({
    mutationFn: ({ code }) => joinWithCode({ code }),
    onSuccess: (_, variables) => {
      variables.onSuccess()
    },
    onError: (error) => {
      console.error(error);
    },
  });
};

const joinWithCode = async (req: JoinWithCodeRequest): Promise<void> => {
  await apiClient.post<void, AxiosResponse<void>>("/join", req);
};

type JoinWithCodeRequest = {
  code: string
};